<template>
  <div class="home">
    <h2 style="margin-left: 20px">任务详情</h2>
    <div class="main1">
      <div class="principal">
        <div class="btn">
          <el-button size="mini">超小按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
          <el-button size="mini">超小按钮</el-button>
        </div>
        <div class="principal-main align-center">
          <el-descriptions title="" :column="1">
            <el-descriptions-item label="任务名称">{{
              form.taskName
            }}</el-descriptions-item>

            <el-descriptions-item label="创建任务人的名称">{{
              form.userName
            }}</el-descriptions-item>

            <el-descriptions-item label="创建任务时间">{{
              new Date(form.createdAt).toLocaleString()
            }}</el-descriptions-item>

            <el-descriptions-item label="领取过任务的人">
              <template v-for="item in this.form.receivedData"
                >{{ item.userName }},
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="principal-under">
          <h4>活动日志</h4>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first">
                <!-- 时间线开始 -->
                <div class="block">
                  <el-timeline :reverse="reverse">
                    <el-timeline-item
                      v-for="(activity, index) in newData"
                      :key="activity.id"
                    >
                      {{ activity.userName }}
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <!-- 时间线结束 -->
              </el-tab-pane>
              <el-tab-pane label="只看日志" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="只看评论" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="side">1</div>
    </div>
  </div>
</template>
      



<script>
import { taskDetailsApi } from "../api/api";

export default {
  components: {},
  data() {
    return {
      q: [],
      form: {},
      taskId: "", //任务id
      userId: "", // 创建任务的人Id
      userName: "", //创建任务人的真实姓名;
      taskName: "", // 任务名称
      level: "", // 紧急程度 1：紧急 0：普通
      desc: "", //任务描述
      duration: "", // 任务时长范围
      createdAt: "", // 创建时间
      updatedAt: "", // 更新时间
      receivedData: [], // 已领取任务人列表信息
      activeName: "first",
      newData: [],
      reverse: false,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
  created() {
    this.getTaskId();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 获取任务id 并调取任务详情接口
    async getTaskId() {
      const taskId = sessionStorage.getItem("taskId");

      let res = await taskDetailsApi({ taskId });
      this.form = res.data.data;
      console.log(this.form);
      this.personTask();
      this.newData.push(
        {
          userName:
            this.form.userName +
            "创建了任务" +
            new Date(this.form.createdAt).toLocaleString(),
          id: 1,
        },
        {
          userName: this.form.userName + "把任务发布给了" + this.q,

          id: 2,
        },
        {
          userName: "创建成功",
          id: 3,
        }
      );
      console.log(this.newData);
    },
    // 领取过任务的人
    personTask() {
      this.form.receivedData.filter((e) => {
        this.q.push(e.userName);
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  padding: 10px;
  & .main1 {
    display: grid;
    min-width: 800px;
    grid-template-columns: 2fr 1fr;

    & .principal {
      display: grid;
      grid-template-rows: 1.3fr 4fr 10fr;
      & ::v-deep .btn {
        padding: 0;
        margin-left: 20px;
        margin-top: 10px;
      }
      & .principal-main {
        margin-left: 20px;
        margin-top: 10px;
      }
      & .principal-under {
        margin-left: 20px;
        & .block {
          & ::v-deep .el-timeline {
            padding-left: 10px;
            padding-top: 15px;
          }
        }
      }
    }
    & .side {
      background-color: #ffffff;
    }
  }
}
</style>


