<template>
  <div class="block">
    <div class="flex-between bidd">
      <div><p>权限管理</p></div>
      <div>
        <el-button type="primary" size="mini" @click="() => createroot(data)">
          添加
        </el-button>
      </div>
    </div>
    <!-- 树状开始 -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>

        <span class="custom-tree-btn">
          <el-button type="text" size="mini" @click="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
            v-if="!data.children.length"
          >
            删除
          </el-button>
          <el-button type="text" size="mini" @click="() => revise(data)">
            修改
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- 树状结束 -->
    <!-- 添加弹窗开始 -->
    <el-dialog title="权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="左侧栏" value="1"></el-option>
            <el-option label="页面" value="2"></el-option>
            <el-option label="功能" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="directory"
          label="所在目录"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <template v-for="item in pigdata" :key="item.id"
              ><el-option :label="item.title" :value="item.id"></el-option
            ></template>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="flag" @click="add">添加</el-button>
        <el-button type="primary" v-if="flag1" @click="bdd">修改</el-button>
        <el-button type="primary" v-if="flag2" @click="AddDirectory"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加弹窗结束 -->
  </div>
</template>



<script>
import {
  PermissionApi,
  AddApi,
  EliminateApi,
  ModifyPermissionsApi,
} from "../api/api";

export default {
  data() {
    return {
      data: [],
      arr: [],
      pigdata: [],
      dialogFormVisible: false,
      form: {
        title: "",
        pid: "",
        type: "",
      },
      id: "",
      flag: false,
      flag1: false,
      flag2: false,
      directory: false,
      formLabelWidth: "80px",
    };
  },

  methods: {
    // 添加根目录弹窗展开
    createroot() {
      this.dialogFormVisible = true;
      this.directory = false;
      this.flag2 = true;
      this.flag = false;
      this.flag1 = false;
    },
    //  添加弹窗展开
    append(data) {
      this.directory = true;
      this.form.pid = data.id;
      this.dialogFormVisible = true;

      this.flag = true;
      this.flag1 = false;
      this.flag2 = false;
      this.directory = false;
    },
    // 修改弹窗展开
    revise(data) {
      this.flag1 = true;
      this.flag = false;
      this.flag2 = false;
      this.directory = true;
      this.dialogFormVisible = true;

      this.form.title = data.title;
      this.id = data.id;
      this.form.pid = data.pid;
      this.form.type =
        data.type == 1 ? "左侧栏" : data.type == 2 ? "页面" : "功能";
    },
    // 根目录按钮
    AddDirectory() {
      if (this.form.title == "") {
        this.$message({
          type: "",
          message: "名称不能为空",
        });
      } else if (this.form.type == "") {
        this.$message({
          type: "",
          message: "权限类型不能为空",
        });
      } else {
        AddApi({
          title: this.form.title,
          type: Number(this.form.type),
        }).then((res) => {
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.form = {};
            this.getData();
          }
        });

        this.dialogFormVisible = false;
      }
    },
    // 添加按钮
    add() {
      if (this.form.title == "") {
        this.$message({
          type: "",
          message: "名称不能为空",
        });
      } else if (this.form.type == "") {
        this.$message({
          type: "",
          message: "权限类型不能为空",
        });
      } else {
        AddApi({
          title: this.form.title,
          type: Number(this.form.type),
          pid: this.form.pid,
        }).then((res) => {
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.form = {};
            this.getData();
          }
        });

        this.dialogFormVisible = false;
      }
    },
    // 编辑按钮
    bdd() {
      if (this.form.title == "") {
        this.$message({
          type: "",
          message: "名称不能为空",
        });
      } else if (this.form.type == "") {
        this.$message({
          type: "",
          message: "权限类型不能为空",
        });
      } else {
        ModifyPermissionsApi({
          title: this.form.title,
          type:
            this.form.type == "左侧栏" ? 1 : this.form.type == "页面" ? 2 : 3,
          pid: this.form.pid,
          id: this.id,
        }).then((res) => {
          if (res.data.status == 1) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            this.getData();
          }
        });

        this.dialogFormVisible = false;
      }
    },

    digui(x) {
      this.arr.push(x.id);
      if (x.children.length) {
        x.children.forEach((e) => {
          this.digui(e);
        });
      }
    },
    //  删除
    remove(node, data) {
      //  点击删除获取id开始

      this.digui(data);
      console.log(this.arr);

      // 点击删除获取id结束
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除具体开始
          EliminateApi({ id: this.arr }).then((res) => {
            if (res.data.status == 1) {
              this.arr = [];
              this.getData();
            }
          });
          // 删除具体结束
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.arr = [];
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      //
    },

    // 取消
    cancel() {
      this.dialogFormVisible = false;

      this.form = { title: "", pid: "", type: "" };
    },
    // 获取数据  并处理
    async getData() {
      let res = await PermissionApi({ pagination: false });
      if (res.data.status == 1) {
        this.pigdata = res.data.data.rows;

        let sidebar = res.data.data.rows;

        //  filter 方法
        sidebar.forEach((x) => {
          x.children = sidebar.filter((e) => e.pid == x.id);
        });
        this.data = sidebar.filter((i) => !i.pid);

        // find方法找父级
        // sidebar.forEach((x) => {
        //   let parent = sidebar.find((e) => e.id == x.pid);
        //   if (!x.pid) return;
        //   parent.children = parent.children || [];
        //   parent.children.push(x);
        // });
        // this.data = sidebar.filter((i) => !i.pid);
      }
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style  scoped lang='scss'>
.block {
  padding: 10px 20px 20px 20px;
  & .bidd {
    padding: 0 100px 0 20px;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-left: 10px;
}
.custom-tree-btn {
  font-size: 15px;
  padding-right: 100px;
}
</style>