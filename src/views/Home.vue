<template>
  <el-container>
    <el-aside width="230px">
      <Navleft></Navleft>
    </el-aside>
    <el-container>
      <el-header>
        <Headers></Headers>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { getToken } from '../utils/auth';
import Navleft from "../components/navLeft";
import Headers from "../components/header";
export default {
  //   beforeRouteLeave(to, from, next) {
  //     if (to.path == "/login") {
  //         if(getToken()){
  //             next(false);
  //         }else{
  //             next()
  //         }
  //       }else{
  //           next()
  //       }
  //   }
  components: {
    Navleft,
    Headers
  }
};
</script>

<style  scoped>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: right;
  line-height: 60px;
  border-bottom: 1px solid #e9eef3;
}

.el-aside {
  background-color: #001529;
  color: #333;
  text-align: left;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
}
.el-aside::-webkit-scrollbar {
  width: 0px; 
}
.el-main::-webkit-scrollbar {
  width: 0px; 
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: calc(100vh - 60px);
}
</style>