<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
      <el-radio-group v-model="radio1" @change="change">
        <el-radio-button :label="1">待审核</el-radio-button>
        <el-radio-button :label="2">审核中</el-radio-button>
        <el-radio-button :label="3">审核通过</el-radio-button>
        <el-radio-button :label="4">审核拒绝</el-radio-button>
        <el-radio-button :label="5">已放送</el-radio-button>
      </el-radio-group>
      <keep-alive>
         <component :is="currentTabComponent"></component>
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
import myTabs1 from './tabs1';
import myTabs2 from './tabs2';
export default {
  mixins: [breadCrumb],
  data() {
      return {
          radio1:"1",
      }
  },
  computed: {
      currentTabComponent(){
          return "myTabs"+this.radio1
      }
  },
   methods: {
       change(val){
           console.log(val)
       }
   },
   components:{
       myTabs1,myTabs2
   }
};
</script>

<style  scoped>
</style>