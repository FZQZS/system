<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-positio="left"
    >
      <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
        <p class="border-title">新建订单信息</p>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="ruleForm.tel" placeholder="请输入电话号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="家庭住址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入家庭住址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="收入" prop="income">
              <el-input v-model="ruleForm.income" placeholder="请输入收入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历" prop="education">
              <el-select v-model="ruleForm.education" placeholder="请选择学历" style="width:100%">
                <el-option label="其他" value="0"></el-option>
                <el-option label="小学" value="1"></el-option>
                <el-option label="初中" value="2"></el-option>
                <el-option label="高中" value="3"></el-option>
                <el-option label="专科" value="4"></el-option>
                <el-option label="本科" value="5"></el-option>
                <el-option label="研究生" value="6"></el-option>
                <el-option label="博士" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工作单位" prop="workUnit">
              <el-input v-model="ruleForm.workUnit" placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="ruleForm.remarks" placeholder="请输入备注信息"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="产品类型" prop="proType">
              <el-select v-model="ruleForm.proType" placeholder="请选择产品类型" style="width:100%">
                <el-option label="汽车贷款" value="0"></el-option>
                <el-option label="房屋贷款" value="1"></el-option>
                <el-option label="抵押贷款" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品编号" prop="proId">
              <el-input v-model="ruleForm.proId" placeholder="请输入产品编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker
                v-model="ruleForm.applyDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请金额" prop="money">
              <el-input v-model="ruleForm.money" placeholder="请输入申请金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="分期数" prop="byStages">
              <el-input v-model="ruleForm.byStages" placeholder="请输入分期数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="利率" prop="interest">
              <el-select v-model="ruleForm.interest" placeholder="请选择利率" style="width:100%">
                <el-option label="0.2" value="0.2"></el-option>
                <el-option label="0.4" value="0.4"></el-option>
                <el-option label="0.6" value="0.6"></el-option>
                <el-option label="0.8" value="0.8"></el-option>
                <el-option label="1" value="1"></el-option>
                <el-option label="1.5" value="1.5"></el-option>
                <el-option label="1.7" value="1.7"></el-option>
                <el-option label="2.3" value="2.3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人" prop="createUser">
              <el-input v-model="ruleForm.createUser" placeholder="请输入创建人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建日期" prop="createDate">
              <el-date-picker
                v-model="ruleForm.createDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-alert title="订单一经创建立即生效，请仔细核对填写信息，如填写有误造成的损失，本公司概不负责" type="warning"></el-alert>
      <el-card class="btn_wrap">
        <el-button type="primary" @click="create">创建</el-button>
        <el-button @click="reset">重置</el-button>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      ruleForm: {
        name: "",
        age: "",
        tel: "",
        address: "",
        income: "",
        education: "",
        workUnit: "",
        remarks: "",
        proType: "",
        proId: "",
        applyDate: "",
        byStages: "",
        money: "",
        interest: "",
        createUser: "",
        createDate: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        address: [{ required: true, message: "请输入家庭住址", trigger: "blur" }],
        education: [{ required: true, message: "请选择学历", trigger: "change" }],
        workUnit: [{ required: true, message: "请填写工作单位", trigger: "blur" }],
        proType: [
          { required: true, message: "请选择产品类型", trigger: "change" }
        ],
        proId: [{ required: true, message: "请输入产品编号", trigger: "blur" }],
        applyDate: [
          { required: true, message: "请选择申请日期", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入申请金额", trigger: "blur" }],
        interest: [
          { required: true, message: "请选择利率", trigger: "change" }
        ],
        createDate: [
          { required: true, message: "请选择创建日期", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "请输入创建人", trigger: "blur" }
        ],
        byStages: [{ required: true, message: "请输入分期数", trigger: "blur" }]
      }
    };
  },
  methods: {
    reset() {
      this.$refs["ruleForm"].resetFields();
    },
    create() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$message("创建成功");
        }
      });
    }
  }
};
</script>

<style  scoped>
</style>