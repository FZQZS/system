<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" style="background: #4f88ff;">
          <div class="article left">
            <p>本周进件</p>
            <p class="cost">6588</p>
            <p>
              +20.12%
              <span class="small">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-tickets right hidden-md-and-down"></i>
          <div style="clear:both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="background: #f26075;">
          <div class="article left">
            <p>本月放款</p>
            <p class="cost">1210000000</p>
            <p>
              +1.25%
              <span class="small">与上月同比</span>
            </p>
          </div>
          <i class="el-icon-money right hidden-md-and-down"></i>
          <div style="clear:both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="background: #5050ff;">
          <div class="article left">
            <p>累计进件</p>
            <p class="cost">128700</p>
            <p>
              +11.48%
              <span class="small">与去年同比</span>
            </p>
          </div>
          <i class="el-icon-date right hidden-md-and-down"></i>
          <div style="clear:both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="background: #f49b3b;">
          <div class="article left">
            <p>累计放款</p>
            <p class="cost">965465867</p>
            <p>
              -2.06%
              <span class="small">与去年同比</span>
            </p>
          </div>
          <i class="el-icon-coin right hidden-md-and-down"></i>
          <div style="clear:both"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <div slot="header" class="card_title">
            <span style="color:black">进件统计分析</span>
          </div>
          <div style="height:240px" ref="analysis"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="card_title">
            <span style="color:black">进件产品占比</span>
          </div>
          <div style="height:240px" ref="percent"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card body-style="height:600px">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card body-style="height:600px;" class="date">
          <el-calendar v-model="value"></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  },
  mounted() {
    this.drawline();
    this.drawPie();
  },
  methods: {
    drawline() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs["analysis"]);
      console.log(1111,this.$refs)
      //初始化图标配置
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["20-01", "20-02", "20-03", "20-04", "20-05", "20-06", "20-07"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [30, 84, 56, 47, 84, 61, 90],
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "white" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              color: "#4f88ff"
            }
          }
        ]
      };

      //设置成功
      myChart.setOption(option);
    },
    drawPie() {
      let myChart = this.$echarts.init(this.$refs["percent"]);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style  scoped>
.article {
  width: 50%;
  text-align: center;
  color: white;
  
}
.article .cost {
  font-weight: 900;
  line-height: 30px;
}
.article .small {
  font-size: 14px;
}

.el-card {
  padding: 0;
}
.card_title {
  text-align: center;
}
.el-card i {
  width: 30%;
  font-size: 80px;
  color: white;
}
.date{overflow: auto;}
.date::-webkit-scrollbar {
  width: 0px; 
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>