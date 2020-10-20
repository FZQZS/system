<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" class="personal">
        <el-card>
          <div>
            <div class="personal_head">
              <el-avatar :src="personal.src" :size="100" fit="fill"></el-avatar>
              <h3>{{personal.name}}</h3>
              <p>{{personal.motto}}</p>
            </div>
            <div class="personal_mess">
              <p>
                <i class="el-icon-s-platform"></i>
                {{personal.job}}
              </p>
              <p>
                <i class="el-icon-s-cooperation"></i>
                {{personal.company}}
              </p>
              <p>
                <i class="el-icon-s-home"></i>
                {{personal.address}}
              </p>
            </div>
          </div>
          <div class="label">
            <p>标签</p>
            <div class="tag-group">
              <el-tag
                v-for="(item,index) in personal.label"
                :key="index"
                type="info"
                effect="plain"
                size="small"
              >{{ item }}</el-tag>
            </div>
          </div>
          <div class="temp">
            <el-row>
              <p>团队</p>
              <el-col
                :span="12"
                v-for="(item,index) in personal.team"
                :key="index"
                class="temp_col"
              >
                <el-avatar :src="item.src" :size="30" fit="fill" style="vertical-align:middle;"></el-avatar>
                <span style="vertical-align:middle;margin-left:10px">{{item.text}}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="文章" name="first">
                <Article :art="article"></Article>
            </el-tab-pane>
            <el-tab-pane label="应用" name="second">应用</el-tab-pane>
            <el-tab-pane label="项目" name="third">项目</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Article from '@/views/my/article'
import {get} from '@/utils/http'
export default {
  data() {
    return {
      activeName: "first",
        article:{},
      personal: {
        src:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        name: "风再起",
        motto: "风声再起",
        job: "前端",
        company: "风起巴拉巴拉巴拉哔哩吧啦哔哩哔哩金融",
        address: "广东省",
        label: ["很有想法", "擅长学习", "风再起", "Giao"],
        team: [
          {
            src:
              "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
            text: "科学搬砖组"
          },
          {
            src:
              "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
            text: "随便写一个"
          },
          {
            src:
              "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
            text: "中二少年团"
          }
        ]
      }
    };
  },
  components:{
      Article,

  },
  methods: {
      getArticle(){
          get('/article').then((res)=>{
            this.article = res.data.data
            console.log(this.article)
          })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
  },mounted() {
      this.getArticle()
  },
};
</script>

<style  scoped>
.personal {
  font-size: 14px;
}
.personal_head {
  text-align: center;
}
.personal_head > h3 {
  margin: 15px 0px;
}
.personal_mess {
  padding: 15px 50px;
}
.label {
  padding: 30px 0;
  border-top: 1px dashed grey;
  border-bottom: 1px dashed grey;
}
.temp_col {
  margin-top: 15px;
}
</style>