<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input v-model.trim="searchValue" placeholder="产品名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="selectVlue" placeholder="利率" style="width:100%">
            <el-option label="3.8%" value="1"></el-option>
            <el-option label="3.9%" value="2"></el-option>
            <el-option label="4.8%" value="3"></el-option>
            <el-option label="5.8%" value="4"></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:100%"
          ></el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="primary" @click="sear_reset">重置</el-button>
          <span class="el-dropdown-link" @click="extend()" v-show="!advanced">
            展开
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span class="el-dropdown-link" @click="extend()" v-show="advanced">
            收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16" style="margin-top:20px" v-show="advanced">
        <el-col :span="6">
          <el-input placeholder="产品类别" v-model.trim="classes"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="最高分期数" v-model.trim="stages"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="状态" v-model.trim="status"></el-input>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div style="text-align:left;margin-bottom:20px">
        <el-button type="primary" icon="el-icon-plus" @click="issue">产品发布</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="产品类别"></el-table-column>
        <el-table-column prop="rate" label="利率"></el-table-column>
        <el-table-column prop="date" label="开放时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1" effect="dark">已启用</el-tag>
            <el-tag type="danger" v-else effect="dark">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="highest" label="最高分期数(月)"></el-table-column>
        <el-table-column prop="number" label="申请客户数量"></el-table-column>
        <el-table-column prop="total" label="累计签约金额"></el-table-column>
        <el-table-column prop="average" label="件均"></el-table-column>
        <el-table-column prop="remark" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.status==2" type="primary" @click="scope.row.status=1">启用</el-button>
            <el-button size="mini" v-else type="danger" @click="scope.row.status=2">停用</el-button>
            <el-button size="mini" type="primary" @click="detail(scope.row.name)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="float: right;padding:20px"
      ></el-pagination>
    </el-card>
    <!-- ============================= 对话框 =================================-->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请选择产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择产品类型">
            <el-option label="房产消费" value="1"></el-option>
            <el-option label="抵押贷款" value="2"></el-option>
            <el-option label="汽车消费" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="利率" prop="rate">
          <el-checkbox-group v-model="ruleForm.rate">
            <el-checkbox label="3.9%" name="rate"></el-checkbox>
            <el-checkbox label="4.3%" name="rate"></el-checkbox>
            <el-checkbox label="3%" name="rate"></el-checkbox>
            <el-checkbox label="5%" name="rate"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布对象" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="企业"></el-radio>
            <el-radio label="个人"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="set" size="small">立 即 创 建</el-button>
        <el-button @click="reset" size="small">重 置</el-button>
      </span>
    </el-dialog>
    <!-- ============================= 对话框 =================================-->
  </div>
</template>

<script>
import { get } from "@/utils/http.js";
import breadCrumb from "@/mixins/breadCrumb.js";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      searchValue: "",
      selectVlue: "",
      date: "",
      classes: "",
      stages: "",
      status: "",
      advanced: false,
      tableData: [],
      centerDialogVisible: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        rate: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        rate: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择发布对象", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    extend() {
      this.advanced = !this.advanced;
    },
    search() {
      console.log(
        this.$moment(this.date[0]).format("YYYY-MM-DD"),
        this.$moment(this.date[1]).format("YYYY-MM-DD")
      );
    },
    list() {
      get("/productList").then(res => {
        //console.log(res.data.data.list)
        this.tableData = res.data.data.list;
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    detail(name) {
      sessionStorage.setItem("name", name);
      this.$router.push("/product/detail");
    },
    issue() {
      this.centerDialogVisible = true;
      this.$refs["ruleForm"].resetFields()
    },
    set(){
      this.$refs["ruleForm"].validate((vaild)=>{
        if(vaild){
          this.$message.success("创建成功")
          this.$refs["ruleForm"].resetFields()
          this.centerDialogVisible=false
        }
      })
    },
    reset(){
      this.$refs["ruleForm"].resetFields()
    },
    sear_reset(){
      this.searchValue= "",
      this.selectVlue= "",
      this.date= "",
      this.classes= "",
      this.stages= "",
      this.status= ""
    }
  },
  mounted() {
    this.list();
    console.log("我渲染了");
  }
};
</script>

<style  scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 10px;
}
</style>