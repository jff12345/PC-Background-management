<template>
  <div class="home">
    <!-- 主体内容开始 -->
    <div class="left">
      <div class="shang">
        <!-- 日历开始 -->
        <div class="cale">
          <el-calendar v-model="value"> </el-calendar>
        </div>
        <!-- 日历结束 -->
      </div>
      <div class="xia">
        <div class="xia-title flex-between">
          <div><h2>Today task (3)</h2></div>
          <div>
            <h3 @click="createNotepad"><i class="el-icon-plus"></i></h3>
          </div>
        </div>
        <div class="xia-main">
          <div v-for="item in notepad" class="xia-item pa1 flex-between">
            <div class="align-center">
              <input class="xia-input" type="checkbox" name="" id="" />
              <p>{{ item.content }}</p>
            </div>
            <div>{{ new Date(item.createdAt).toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <h2 class="right-title">推送</h2>
      <div class="right-logo">
        <div class="right-logo-left">
          <div class="logo-icon">
            <div>
              <i class="el-icon el-icon-edit-outline"></i>
            </div>
          </div>
        </div>
        <div class="right-logo-right">
          <p class="right-push">XXX给你发送了一条消息</p>
          <p class="right-text">Don't walk in meekly</p>
          <el-button type="warning" size="mini">立即领取</el-button>
        </div>
      </div>
      <!-- 聊天开始 -->
      <div>
        <h2 class="right-title">团队聊天</h2>
        <chat-view></chat-view>
      </div>
      <!-- 聊天结束 -->
    </div>
  </div>
</template>
      



<script>
import ChatView from "../components/ChatView.vue";
import CreateView from "./CreateView.vue";
import { getNotepadApi } from "../api/api";

export default {
  components: {
    ChatView,
    CreateView,
  },
  data() {
    return {
      value: new Date(),
      checked: true,

      notepad: [],
    };
  },
  created() {
    this.getNotepad();
  },
  methods: {
    getNotepad() {
      getNotepadApi({}).then((res) => {
        // console.log(res.data.data.rows);
        // console.log(res);
        this.notepad = res.data.data.rows;
        // console.log(this.notepad);
      });
    },
    createNotepad() {
      this.$router.push("/createtask");
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  display: flex;
  & .left {
    flex: 1;
    height: 100%;
    min-height: 400px;
    & .shang {
      & .cale {
        & ::v-deep .el-calendar__header {
          padding: 10px;
        }
        & ::v-deep .el-calendar__body {
          padding: 10px 20px 10px;
        }
        & ::v-deep .el-calendar-table .el-calendar-day {
          height: 50px;
          padding: 5px;
        }
      }
    }
    & .xia {
      // height: 53vh;
      & .xia-title {
        padding: 5px 35px 10px 20px;
      }
      & .xia-main {
        padding: 10px 20px 10px 20px;
        min-width: 350px;
        font-size: 12px;
        & .xia-item {
          background-color: #ededed;
          & .xia-input {
            width: 30px;
            height: 30px;
            margin-right: 20px;
          }
        }
      }
    }
  }
  & .right {
    flex: 1;
    padding: 0 30px 10px 30px;
    min-width: 500px;
    height: 100%;
    & .right-title {
      margin-left: 15px;
      margin-top: 25px;
    }
    & .right-logo {
      margin-top: 20px;
      height: 130px;
      background-color: #58419b;
      border-radius: 14px;
      display: flex;
      & .right-logo-left {
        flex: 1;
        & .logo-icon {
          float: right;
          margin-top: 23px;
          width: 30px;
          height: 30px;
          background-color: #7c68b0;
          border-radius: 5px;
          padding: 8px 0 0 13px;
        }
      }
      & .right-logo-right {
        flex: 6;
        color: whitesmoke;
        padding-left: 15px;
        & .right-push {
          margin-top: 22px;
          font-size: 18px;
          font-weight: 900;
        }
        & .right-text {
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>


