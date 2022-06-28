<template>
  <div class="chat">
    <div class="main">
      <div class="middle">
        <div class="middle-content" ref="record">
          <template v-for="(item, index) in textArr">
            <div v-if="typeof item == 'object'">
              <div
                class="mine1 align-center"
                v-if="item.avatarName !== obj.avatarName"
              >
                <div class="mine1-name">
                  <div class="tx1 align-center">
                    <div class="tx1-name">
                      {{ item.avatarName.slice(0, 1) }}
                    </div>
                  </div>
                </div>
                <div class="mine1-msg">
                  <span>{{ item.msg }} </span>
                </div>
                <div>
                  <span
                    class="time1"
                    v-if="(new Date() - new Date(item.date)) / 1000 <= 60"
                    >刚刚</span
                  >
                  <span
                    class="time1"
                    v-else-if="
                      60 < (new Date() - new Date(item.date)) / 1000 < 600
                    "
                    >{{
                      parseInt((new Date() - new Date(item.date)) / 1000 / 60)
                    }}分钟前</span
                  >
                  <span
                    class="time1"
                    v-else-if="
                      600 < (new Date() - new Date(item.date)) / 1000 < 3600
                    "
                    >{{
                      (new Date() - new Date(item.date)) / 1000 / 60
                    }}分钟前</span
                  >
                  <span class="time1" v-else
                    >{{
                      (new Date() - new Date(item.date)) / 1000 / 60 / 60
                    }}小时前</span
                  >
                </div>
              </div>
              <div v-else class="mine align-center">
                <div>
                  <span
                    class="time"
                    v-if="(new Date() - new Date(item.date)) / 1000 < 60"
                    >刚刚</span
                  >
                  <span
                    class="time"
                    v-else-if="
                      60 <= (new Date() - new Date(item.date)) / 1000 < 600
                    "
                    >{{
                      parseInt((new Date() - new Date(item.date)) / 1000 / 60)
                    }}分钟前</span
                  >
                  <span
                    class="time"
                    v-else-if="
                      600 <= (new Date() - new Date(item.date)) / 1000 < 3600
                    "
                    >{{
                      parseInt((new Date() - new Date(item.date)) / 1000 / 60)
                    }}分钟前</span
                  >
                  <span class="time" v-else
                    >{{
                      parseInt(
                        (new Date() - new Date(item.date)) / 1000 / 60 / 60
                      )
                    }}小时前</span
                  >
                </div>

                <div class="mine-msg">
                  <span>{{ item.msg }} </span>
                </div>
                <div class="mine-name">
                  <div class="tx align-center">
                    <div class="tx-name">
                      {{ item.avatarName.slice(0, 1) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="send">
          <el-input placeholder="请输入内容" v-model="obj.msg">
            <template slot="append">
              <span @click="sendSocketMsg">
                <i class="el-icon-s-promotion">发送</i>
              </span>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { getUserInfoApi } from "../api/api.js";
export default {
  data() {
    return {
      form: {
        userId: "",
        avatarName: "",
      },
      textArr: [],
      obj: {
        userId: "",
        type: 1,
        avatarName: "",
        msg: "",
      },
    };
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      // console.log("socket connected...");
      // 进入
      this.$socket.emit("addUser", this.form);
      // 发送消息
      this.$socket.emit("sendMsg", this.obj);
    },
    // 获取总人数

    userCount(message) {
      console.log(message);
    },

    receiveMsg: function (message) {
      // console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    disconnect: function () {
      // console.log("disconnect!");
      this.$socket.emit("removeUser", this.form);
    },
  },
  methods: {
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit("sendMsg", this.obj);
      //接收服务端相对应的webdata数据
      this.obj.msg = null;
    },
    // 判断时间
  },
  created() {
    getUserInfoApi({}).then((res) => {
      this.form.id = res.data.data.id + "";
      this.obj.userId = res.data.data.id + "";
      this.form.avatarName = res.data.data.avatarName;
      this.obj.avatarName = res.data.data.avatarName;
    });
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.record.scrollTop = this.$refs.record.scrollHeight;
    });
  },
};
</script>

<style scoped lang="scss">
.chat {
  display: flex;

  height: 100%;
  width: 100%;

  & .main {
    display: flex;

    height: 100%;
    width: 100%;

    background: rgb(255, 255, 255);

    & .middle {
      height: 100%;
      width: 100%;
      background-color: #f5f5f7;

      & .middle-content {
        height: calc(100vh - 440px);
        min-height: 100px;

        border-radius: 10px;
        overflow-y: scroll;
        & .mine {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          margin-right: 15px;
          & .time {
            font-size: 10px;
            color: #dadada;
          }

          & .mine-msg {
            margin-left: 15px;
            background-color: #95ec69;
            max-width: 250px;
            word-wrap: break-word;
            white-space: pre-wrap;
            padding: 10px 15px 10px 15px;
          }
          & .mine-name {
            & .tx {
              width: 50px;
              height: 50px;
              background-color: #d7d7d7;
              margin-left: 10px;
              border-radius: 100%;
              & .tx-name {
                margin-left: 33%;
              }
            }
          }
        }
        & .mine1 {
          margin-top: 20px;
          margin-right: 20px;
          display: flex;
          justify-content: flex-start;

          & .time1 {
            font-size: 10px;
            color: #dadada;
            margin-left: 10px;
          }

          & .mine1-name {
            margin-right: 15px;
            & .tx1 {
              width: 50px;
              height: 50px;
              background-color: #d7d7d7;
              margin-left: 10px;
              border-radius: 100%;
              & .tx1-name {
                margin-left: 33%;
              }
            }
          }
          & .mine1-msg {
            background-color: #ffffff;
            max-width: 250px;
            word-wrap: break-word;
            white-space: pre-wrap;
            padding: 10px 15px 10px 15px;
          }
        }
      }

      & .send {
        height: 10%;
      }
    }
  }
}

::v-deep .el-input__inner {
  height: 55.5px;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>