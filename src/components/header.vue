<template>
  <div>
    <div class="head">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您，{{info}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">
            <i class="el-icon-user"></i> 个人中心
          </el-dropdown-item>
          <el-dropdown-item command="b">
            <i class="el-icon-setting"></i>修改密码
          </el-dropdown-item>
          <el-dropdown-item command="c">
            <i class="el-icon-switch-button"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <p class="data">
      今天是你在风起的第
      <span class="part">{{days}}</span>天
    </p>
    <div class="clear"></div>
  </div>
</template>

<script>
import { get } from "../utils/http";
import { removeToken } from "../utils/auth";
export default {
  data() {
    return {
      time: "",
      info: sessionStorage.getItem("nickname")
    };
  },
  methods: {
    handleCommand(com) {
      if (com == "c") {
        removeToken();
        sessionStorage.removeItem("nickname");
        this.$router.push("/login");
      } else if (com == "a") {
        this.$router.push("/my");
      }
    }
  },
  computed: {
    days() {
      let target = new Date(this.time);
      let now = new Date();
      return Math.floor((now - target) / 1000 / 60 / 60 / 24);
    }
  },
  mounted() {
    get("/in").then(res => {
      this.time = res.data.time;
    });
  }
};
</script>

<style  scoped>
.clear {
  clear: both;
}
.head,
.data {
  float: right;
  line-height: 60px;
}
.head {
  margin-left: 30px;
}
.part {
  color: blue;
  font-size: 26px;
}
</style>