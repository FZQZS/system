<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="input">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="11">
        <el-button type="primary" @click="dialogVisible = true">新建角色</el-button>
        <el-button size="mini" :disabled="!selected.length" @click="operate('启动')">启动</el-button>
        <!-- selected没有长度的时候为true -->
        <el-button size="mini" :disabled="!selected.length" @click="operate('冻结')">冻结</el-button>
        <el-button size="mini" :disabled="!selected.length" @click="operate('删除')">删除</el-button>
      </el-col>
    </el-card>
    <el-card>
      <el-table
        :data="tableData2"
        stripe
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="account" label="账户" width="100"></el-table-column>
        <el-table-column prop="name" label="用户名" width="100"></el-table-column>
        <el-table-column prop="character" label="角色" width="180"></el-table-column>
        <el-table-column prop="reason" label="备注" width="250"></el-table-column>
        <el-table-column prop="remark" label="创建原因" width="250"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status==1?"已启用":"未启用"}}</template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <el-button size="mini" @click="scope.row.status==1?scope.row.status=2:scope.row.status=1">{{scope.row.status==1?"禁用":"启用"}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="新建角色"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :before-close="closeDialog"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色" style="width:100%">
            <el-option label="业务人员" value="1"></el-option>
            <el-option label="审核人员" value="2"></el-option>
            <el-option label="风控经理" value="3"></el-option>
            <el-option label="管理员" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="创建原因" prop="cause">
          <el-input v-model="ruleForm.cause" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="callOf('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="onOk()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
import { get } from "@/utils/http.js";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      input: "",
      tableData: [],
      tableData2:[],
      selected: [],
      dialogVisible: false,
      ruleForm: {
        role: "",
        remark: "",
        cause: ""
      },
      rules: {
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        cause: [{ required: true, message: "请输入创建原因", trigger: "blur" }]
        
      }
    };
  },
  methods: {
    list() {
      get("/all").then(res => {
        //console.log(res.data.data.list)
        this.tableData = res.data.data.list;
      });
    },
    handleSelectionChange(selection) {
      let arr = selection.map(item => {
        return item.account;
      });
      this.selected = arr;
      console.log(this.selected);
      //然后发送请求
    },
    operate(type) {
      this.$notify({
        title: "成功",
        message: "这是一条" + type + "的提示消息",
        type: "success"
      });
    },
    callOf(ruleForm) {
      this.dialogVisible = false;
      this.$refs[ruleForm].resetFields();
    },
    onOk() {
      this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
           // console.log(this.ruleForm)
            this.$message.success("创建成功")
            this.list();
            this.$refs["ruleForm"].resetFields()
            this.dialogVisible = false;
          }
        });
      
    },
    closeDialog(done) {
      done();
      this.$refs.ruleForm.resetFields()
    },
    handleEdit(row){
      this.dialogVisible = true;
      console.log(row)
      this.ruleForm={
        role: row.character,
        remark: row.reason,
        cause: row.remark
      }
    }
  },
  mounted() {
    // dialogVisible = false
    this.list();
    console.log("我渲染了")
  },
  watch: {
    tableData(){
      this.tableData2= this.tableData.filter((item)=>{
        if(item.character=="业务人员"){
          return item
        }
      })
    }
  },
};
</script>

<style  scoped>
</style>