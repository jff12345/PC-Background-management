<template>
  <div class="home">
    <div class="main-header">
      <h2>任务列表</h2>
      <div>
        <el-form class="align-center" :model="form" label-width="80px">
          <div>
            <el-form-item label="任务名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div>
            <div>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="form.value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div>
            <el-form-item label="执行人">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in roleData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="butt">
            <el-form-item>
              <el-button type="primary" size="mini">搜索</el-button>
              <!-- <el-button size="mini">清空</el-button> -->
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="main1">
      <!-- 开始 -->
      <el-table :data="tableData" style="width: 100%" align="center">
        <!--  -->
        <el-table-column label="创建日期" width="160" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{
              new Date(scope.row.createdAt).toLocaleString()
            }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="任务ID" width="70" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="创建任务人的ID" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="任务等级" width="80" align="center">
          <template slot-scope="scope">
            <span style="color: red" v-if="scope.row.level == 1"
              ><el-tag type="danger">紧急</el-tag></span
            >
            <span style="color: blue" v-else>不紧急</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="任务名称" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <!--  -->

        <!--  -->
        <el-table-column label="所需时间" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.duration }}小时</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="描述" width="120" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <!--  -->
        <!--  -->
        <el-table-column label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span style="color: green" v-if="scope.row.isReceived == 1"
              >已领取</span
            >
            <span style="color: red" v-else>未领取</span>
          </template>
        </el-table-column>
        <!--  -->

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)" type="text"
              >发布任务</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color: green"
              v-if="scope.row.isReceived == 0"
              @click="receive(scope.row)"
              >领取任务</el-button
            >

            <el-button
              size="mini"
              type="text"
              style="color: brown"
              @click="viewDetails(scope.row)"
              >查看详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color: blue"
              @click="edit(scope.row)"
              >编辑任务</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 结束 -->
      <div class="pagination middle">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 发布任务弹窗开始 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <div class="inquire">
          <el-select v-model="value1" filterable multiple placeholder="请选择">
            <el-option
              v-for="item in newData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-button @click="shutDown">取 消</el-button>
        <el-button type="primary" @click="sendTask">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发布任务弹窗结束 -->
    <!-- 编辑任务弹窗开始 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span
        ><edit-task
          :id="this.id"
          :name="this.name"
          :desc="this.desc"
          :duration="this.duration"
          :level="this.level"
          :executors="this.newData"
          @func="revise"
          ref="form"
        ></edit-task
      ></span>
    </el-dialog>
    <!-- 编辑任务弹窗结束 -->
  </div>
</template>
      



<script>
import {
  listViewApi,
  userListApi,
  sendTaskApi,
  taskDetailsApi,
  taskUpdateApi,
} from "../api/api";
import editTask from "../components/EditTask.vue";

export default {
  components: { editTask },
  data() {
    return {
      form: {
        name: "",
        value1: "",
      },
      input: "",
      centerDialogVisible: false,
      dialogVisible: false,
      taskId: "",
      count: 0,
      tableData: [],
      roleData: [],
      repeatData: [],
      newData: [],
      currentPage4: 1,
      pageSize: 10, //每页几条
      pageNum: 1, //第几页数据
      pagination: true, //true 分页
      value1: [],
      taskName: "",
      id: 1,
      name: "", //任务名称
      desc: "", //任务描述
      duration: 0, //任务时长
      level: "", // 任务等级  1：紧急  0：普通任务
      executors: [],
      // editData: {
      //   id: 0, //任务id
      //   name: "", //任务名称
      //   desc: "", //任务描述
      //   duration: "", //任务时长
      //   level: 0, // 任务等级  1：紧急  0：普通任务
      // },
    };
  },

  created() {
    this.listView();
    this.getInformation();
  },

  methods: {
    async revise(params) {
      let id = params.id;
      let name = params.name;
      let desc = params.desc;
      let duration = params.duration;
      let level = params.level == true ? 1 : 0;
      console.log(params);
      let res = await taskUpdateApi({ id, name, desc, duration, level });
      if (res.data.status == 1) {
        this.dialogVisible = false;
        this.listView();
        // sendTaskApi({ userIds, taskId }).then((res) => {
        //   console.log(res.data.status);
        // });
        // this.$refs.form.clear();
      }
      this.dialogVisible = false;
    },
    // 判断并渲染名字列表渲染名字列表
    listNames() {
      let arr = [];
      this.roleData.forEach((item) => {
        if (!this.repeatData.find((i) => i.userId == item.id)) {
          arr.push(item);
        }
      });
      this.newData = arr;
      // console.log(this.newData);
    },
    // 编辑任务中处理执行人的名字
    processExecutors() {
      let arr = [];
      this.roleData.forEach((item) => {
        if (!this.executor.find((i) => i.userId == item.id)) {
          arr.push(item);
        }
      });
      this.newData = arr;
      // console.log(this.newData);
    },
    // 渲染任务列表
    listView() {
      var pagination = this.pagination;
      var pageSize = this.pageSize;
      var pageNum = this.pageNum;
      var taskName = this.taskName;
      listViewApi({ pagination, pageSize, pageNum, taskName }).then((res) => {
        this.tableData = res.data.data.rows;
        this.count = res.data.data.count;
      });
    },
    // 获取用户名字
    async getInformation() {
      const pagination = false;
      let res = await userListApi({ pagination });
      this.roleData = res.data.data.data.rows;
    },
    //确定
    sendTask() {
      if (this.value1 == "") {
        alert("不能为空");
      }
      {
        var userIds = this.value1;
        var taskId = this.taskId;
        sendTaskApi({ userIds, taskId }).then((res) => {
          console.log(res.data.status);
        });
        this.value1 = [];
        this.centerDialogVisible = false;
      }
    },
    // 关闭
    shutDown() {
      this.value1 = [];
      this.centerDialogVisible = false;
    },
    // 发布任务
    handleEdit(row) {
      this.centerDialogVisible = true;
      this.taskId = row.id;
      //  判断是否已经领取任务 如果领取了发布任务中不应该出现名字
      const taskId = row.id;
      taskDetailsApi({ taskId }).then((res) => {
        this.repeatData = res.data.data.receivedData;

        this.listNames();
      });
    },
    // 领取任务
    receive(row) {
      this.roleData.forEach((el) => {
        if (el.id == 842) {
          const userIds = [el.id];
          const taskId = row.id;
          sendTaskApi({ userIds, taskId }).then((res) => {
            if (res.data.status == 1) {
              this.listView();
            }
          });
        }
      });
    },
    // 查看详情
    viewDetails(row) {
      this.$router.push("/viewDetails");
      sessionStorage.setItem("taskId", row.id);
    },
    // 编辑任务
    async edit(row) {
      // 获取任务id
      console.log(row);
      this.id = row.id;
      let res = await taskDetailsApi({ taskId: row.id });
      this.executor = res.data.data.receivedData;
      this.name = row.taskName;
      this.desc = row.desc;
      this.duration = row.duration;
      this.level = row.level == 1 ? true : false;
      this.processExecutors();
      this.dialogVisible = true;
    },

    //  页
    handleSizeChange(el) {
      this.pageSize = el;
      this.listView();
    },
    //  页/条
    handleCurrentChange(val) {
      this.pageNum = val;
      this.listView();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.$refs.form.clear();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  & .main-header {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px 0 10px 10px;
  }

  & .main1 {
    min-width: 880px;
    overflow-y: scroll;
    height: 500px;
  }

  & .pagination {
    margin-top: 10px;
  }
}

.inquire {
  margin: 10px 0 40px 0;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>


