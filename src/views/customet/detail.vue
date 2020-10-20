<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
      <el-row >
        <el-page-header @back="goBack" content="基本信息" style="margin-bottom:10px"></el-page-header>
      </el-row >
      <h3>个人详细信息</h3>
      <el-row :gutter="16" class="row_wrap">
        <el-col :span="4">编号：{{message.number}}</el-col>
        <el-col :span="4">姓名：{{message.name}}</el-col>
        <el-col :span="8">手机号：{{message.mobile}}</el-col>
        <el-col :span="8">身份证号码：{{message.idnum}}</el-col>
      </el-row>
      <el-row :gutter="16" class="row_wrap">
        <el-col :span="4">学历：{{message.education|filtra}}</el-col>
        <el-col :span="4">职业：{{message.job}}</el-col>
        <el-col :span="8">住址：{{message.address}}</el-col>
        <el-col :span="8">婚否：{{message.marry==1?"已婚":"未婚"}}</el-col>
      </el-row>
    </el-card>
    <el-card>
      <h3>产品申请信息</h3>
      <div>
        <div style="text-align: center;" class="steps">
          <i class="el-icon-success" style="color:green;font-size:100px;"></i>
          <h2>完成</h2>
        </div>
      </div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="申请" :description="active==0?'':'已提交申请'"></el-step>
        <el-step title="审核" :description="active==1?'':'审核完毕'"></el-step>
        <el-step title="完成" :description="active==3?'已完成':''"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      message: {},
      active: 3
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.message = this.$route.query;
  },
  filters: {
    filtra: function(value) {
      let education = "";
      if (!value) return "";
      switch (value) {
        case "1":
          education = "小学及以下";
          break;
        case "2":
          education = "初中";
          break;
        case "3":
          education = "高中";
          break;
        case "4":
          education = "本科";
          break;
        case "5":
          education = "研究生";
          break;
      }
      return education;
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style  scoped>
.row_wrap {
  margin-top: 15px;
}
.steps {
  margin: 30px 0px;
}
</style>