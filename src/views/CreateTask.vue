<template>
  <div class="home">
    <el-main class="main">
      <div class="middle">
        <edit-task @func="revise" ref="form"></edit-task>
      </div>
    </el-main>

    <!-- 弹窗开始 -->
    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="300px"
      :before-close="handleClose"
    >
      <span>创建成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="xx">继续</el-button>
        <el-button type="success" @click="listView">查看任务列表</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗结束 -->
  </div>
</template>
      



<script>
import { createtaskApi, sendTaskApi, userListApi } from "../api/api";
import editTask from "../components/EditTask.vue";
export default {
  components: { editTask },
  data() {
    return {
      dialogVisible: false,

      delivery: false,
      executor: [],
      tableData: [],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    judgment() {
      if (this.form.name == "") {
        this.$message("任务名称不能为空");
        return false;
      } else if (this.form.duration == "") {
        this.$message("任务时常不能为空");
        return false;
      } else if (this.executor == "") {
        this.$message("执行人不能为空");
        return false;
      } else {
        return true;
      }
    },
    revise(res) {
      console.log(res);
      let name = res.name;
      let desc = res.desc;
      let duration = Number(res.duration);
      let level = res.level == false ? 0 : 1;

      console.log(res.value1);
      createtaskApi({ name, desc, duration, level }).then((e) => {
        if (e.data.status == 1) {
          sendTaskApi({
            userIds: res.value1,
            taskId: e.data.data[0].id,
          }).then((el) => {
            if (el.data.status == 1) {
              this.dialogVisible = true;
            }
          });
        }
      });
    },

    // 查看任务列表
    listView() {
      this.$router.push("/listView");
    },

    //   获取用户信息
    getInformation() {
      var pagination = false;
      userListApi({ pagination }).then((res) => {
        this.tableData = res.data.data.data.rows;
      });
    },
    // 发送任务
    xx() {
      this.dialogVisible = false;
      this.$refs.form.initform();
    },
  },
  created() {
    this.getInformation();
  },
};
</script>

<style scoped lang='scss'>
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
}
</style>


