<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <div slot="header" class="title">
          <h2>蚂蚁金融后台管理系统</h2>
        </div>
        <div class="main">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="70px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="name">
              <el-input type="text" v-model="ruleForm.name" placeholder="请输入用户名" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" >
                 <el-input
                type="password"
                v-model="ruleForm.pass"
                placeholder="请输入密码"
                autocomplete="off"
                @change="login()"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login()" style="width:100%" >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { post } from "../utils/http";
import { setToken } from "../utils/auth";

export default {
  data() {
    var username = (rule, value, callback) => {
      let name = /^[0-9A-Za-z]{4,8}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!name.test(value)) {
        callback(new Error("请输入4到8位不含特殊字符的用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      let pass = /^(?![0-9]+$)[0-9A-Za-z]{4,8}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pass.test(value)) {
        callback(new Error("请输入含英文字母4到8位的密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ required: true, validator: username, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {//如果验证通过了  返回T和F
          post("/login", this.ruleForm).then(res => {
             console.log(3, res);
              setToken(res.data.token)
              sessionStorage.setItem('nickname',res.data.nickname)
              this.$router.push({ name: "Index" });
            // if (res.data.success) {
            //   setToken(res.data.token);
            //   this.$router.push({ name: "Home" });
            //   this.$message({
            //     message: "登录成功",
            //     type: "success"
            //   });
            // } else {
            //   this.$message.error("登录失败");
            // }
          }).catch((error)=>{
            console.log(error)  
          })
        }
      });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}
.box-card {
  width: 480px;
  margin-top: 200px;
}
.title {
  text-align: center;
  font-size: 20px;
}
</style>
