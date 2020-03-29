<template>
  <div class="hello">
    <div style="width:100%;text-align: end;">
      <el-button type="success" @click="addList('add')">添加</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="content" label="自我介绍"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="addList('update',scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="450px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="ruleForm.age" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍">
          <el-input type="textarea" :rows="4" v-model="ruleForm.content" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: Number
  },
  data() {
    return {
      submitType: "",
      title: "",
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        age: "",
        content: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 查询列表数据
    getData() {
      this.$axios.get("/list").then(res => {
        this.tableData = res.data.data;
      });
    },

    // 删除列表数据
    deleteList(row) {
      this.$axios
        .post("/list", {
          params: {
            id: row.id
          }
        })
        .then(res => {
          this.tableData = res.data.data;
        });
    },

    // 增加列表数据
    addList(type, row) {
      console.log(type, row);
      this.submitType = type;
      if (type == "add") {
        this.title = "添加";
        this.ruleForm = {
          name: "",
          age: "",
          content: ""
        };
        this.$nextTick(() => {
          this.$refs["ruleForm"].resetFields();
        });
      } else {
        this.title = "修改";
        this.ruleForm = JSON.parse(JSON.stringify(row));
        this.$nextTick(() => {
          this.$refs["ruleForm"].clearValidate();
        });
      }
      this.dialogVisible = true;
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = "";
          if (this.submitType == "add") {
            url = "/listAdd";
          } else {
            url = "/listUpdate";
          }
          this.$axios
            .post(url, {
              params: {
                obj: this.ruleForm
              }
            })
            .then(res => {
              this.tableData = res.data.data;
              this.dialogVisible = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
