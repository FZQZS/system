<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin:10px 0px;padding:20px" body-style="padding:0px;">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input v-model="input" placeholder="请输入姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择学历" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="search_reset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <el-row>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addClient">新增客户</el-button>
      </el-row>
      <el-row>
        <el-table :data="originData" stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="number" label="客户编号" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column prop="idnum" label="身份证号码"></el-table-column>
          <el-table-column prop="education" label="学历" width="80">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.education==1">小学及以下</span>
                <span v-else-if="scope.row.education==2">初中</span>
                <span v-else-if="scope.row.education==3">高中</span>
                <span v-else-if="scope.row.education==4">本科</span>
                <span v-else-if="scope.row.education==5">研究生</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="职业" width="80"></el-table-column>
          <el-table-column prop="address" label="住址"></el-table-column>
          <el-table-column prop="marry" label="婚姻状况" width="80">
            <template slot-scope="scope">{{scope.row.marry==1?"已婚":"未婚"}}</template>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" >删除</el-button>
                <el-button size="mini" @click="handleDetail(scope.row)">详细</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- =====================================================对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identity">
          <el-input v-model="ruleForm.identity"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="ruleForm.education" placeholder="请选择学历">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-input v-model="ruleForm.job"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="ruleForm.address" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="married">
          <el-switch v-model="ruleForm.married"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="set" size="small">立 即 创 建</el-button>
        <el-button @click="reset" size="small">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
export default {
  mixins: [breadCrumb],
  data() {
    var verifyPhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var verifyIndentity = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (value === "") {
        callback(new Error("请输入身份证号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    return {
      input: "",
      value: "",
      phone: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        phone: "",
        identity: "",
        education: "",
        job: "",
        address: "",
        married: false
      },
      rules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        phone: [{ required: true, validator: verifyPhone, trigger: "blur" }],
        identity: [
          { required: true, validator: verifyIndentity, trigger: "blur" }
        ],
        education: [
          { required: true, message: "请选择学历水平", trigger: "blur" }
        ],
        job: [{ required: true, message: "请输入职业", trigger: "blur" }],
        address: [{ required: true, message: "请输入住址", trigger: "blur" }]
      },
      options: [
        {
          value: "1",
          label: "小学及以下"
        },
        {
          value: "2",
          label: "初中"
        },
        {
          value: "3",
          label: "高中"
        },
        {
          value: "4",
          label: "本科"
        },
        {
          value: "5",
          label: "研究生"
        }
      ],
      originData: [
        {
          number: 1001,
          name: "赵铁柱",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 2,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1001,
          name: "詹姆斯",
          mobile: "13533387675",
          idnum: "378489998776546578",
          education: 3,
          job: "球员",
          address: "广东省东莞市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1003,
          name: "李狗盛",
          mobile: "15533325375",
          idnum: "378489990876546578",
          education: 2,
          job: "厨师",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2
        },
        {
          number: 1004,
          name: "张大彪",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 4,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        }
      ],
      copyData:[
        {
          number: 1001,
          name: "赵铁柱",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 2,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1001,
          name: "詹姆斯",
          mobile: "13533387675",
          idnum: "378489998776546578",
          education: 3,
          job: "球员",
          address: "广东省东莞市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1003,
          name: "李狗盛",
          mobile: "15533325375",
          idnum: "378489990876546578",
          education: 2,
          job: "厨师",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2
        },
        {
          number: 1004,
          name: "张大彪",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 4,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1
        }
      ]
    };
  },
  methods: {
    //搜索功能方法
    search(){
      this.originData = this.copyData.filter(item => {//假设copyData为后台数据库
      //filter相当于搜索接口 将过滤搜索出来的数据return给前端页面中展示数据的originData
        return (
          item.name ==
            (this.input == "" ? item.name : this.input) &&
          item.mobile ==
            (this.phone == "" ? item.mobile :this.phone) &&
          item.education ==
            (this.value == ""
              ? item.education
              : this.value)
              //当搜索项中有空项，则空项设置为已经填写正确的数据 
        );
      });
    },
    search_reset(){
      this.input=""
      this.phone=""
      this.value=""
    },
    //对话框方法
    addClient() {
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.ruleForm= {
        name: "",
        phone: "",
        identity: "",
        education: "",
        job: "",
        address: "",
        married: false
      }
      })
    },
    set() {
      this.$refs["ruleForm"].validate(vaild => {
        if (vaild) {
          this.$message.success("创建成功");
          this.$refs["ruleForm"].resetFields();
          this.centerDialogVisible = false;
        }
      });
    },
    reset() {
      this.$refs["ruleForm"].resetFields();
    },
    //操作方法
    handleEdit(row){
      this.dialogVisible = true
      this.$nextTick(()=>{
        if(row.marry==1){
          row.marry=true
        }else{
          row.marry=false
        }
        
        this.ruleForm= {
        name: row.name,
        phone: row.mobile,
        identity: row.idnum,
        education: row.education,
        job: row.job,
        address: row.address,
        married: row.marry
      }
      })
    },
    handleDetail(row){
      this.$router.push({path:'/customer/detail', query:row})
    }
  }
};
</script>

<style  scoped>
</style>