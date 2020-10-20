<template>
  <div>
    <h1 class="title">风起金融后台管理系统</h1>
    <el-menu background-color="#001529" text-color="#fff" :router="true" @select="index" :default-active="active">
      <menus v-for="(item,index) in menuData" :menu="item" :key="index"></menus>
      <!-- :menu 将menuData中的data数组每一项传递给子组件 -->
      <!-- 父遍历一级导航的包装 子组件中利用递归的方式渲染两级三级四级导航 -->
    </el-menu>
  </div>
</template>

<script>
import { get } from "../utils/http";
import menus from "./menu";
export default {
  data() {
    return {
      menuData: [],
      active:""
      // 方便向子组件传递数据
    };
  },
  mounted() {
    get("/menu").then(res => {
      this.menuData = res.data.data;
      //console.log(11, this.menuData);
    });
   this.active= sessionStorage.getItem("index")
  },
  methods: {
    index(key){
      sessionStorage.setItem("index",key)
    }
  },
  components: {
    menus
  }
};
</script>

<style  scoped>
.title{color: white;text-align: center;line-height: 50px;}
.el-menu{border: none;}
</style>