<template>
  <div class="enrollview align-center">
    <div class="enroll">
      <div class="login">
        <p class="text">注册</p>
      </div>
      <div class="container center">
        <div class="progress">
          <el-steps :active="2" align-center>
            <el-step title="Step 1" description="开始"></el-step>
            <el-step title="Final step" description="结束"></el-step>
          </el-steps>
        </div>
        <div class="kuang middle mt-8">
          <div class="mt-8">
            <el-input
              prefix-icon="el-icon-user-solid"
              class="put"
              placeholder="请输入账号"
              v-model="username"
              clearable
            ></el-input>
          </div>
          <div class="mt-8">
            <el-input
              prefix-icon="el-icon-view"
              class="put"
              placeholder="请输入密码"
              v-model="password"
              clearable
            ></el-input>
          </div>
          <div class="mt-8">
            <el-input
              prefix-icon="el-icon-view"
              class="put"
              placeholder="请再次输入密码"
              v-model="password"
              clearable
            ></el-input>
          </div>
          <div class="mt-8">
            <el-input
              prefix-icon="el-icon-message"
              class="put"
              placeholder="请输入邮箱"
              v-model="email"
              clearable
            ></el-input>
          </div>
          <div class="mt-8">
            <el-input
              prefix-icon="el-icon-phone"
              class="put"
              placeholder="请输入电话"
              v-model="phone"
              clearable
            ></el-input>
          </div>

          <div class="mt-8 align-center ml-30">
            <el-input
              prefix-icon="el-icon-key"
              class="last-put mr-5"
              placeholder="请输入验证码"
              v-model="captcha"
              clearable
            ></el-input>
            <img @click="getCaptcha" :src="captchaSrc" alt="" />
          </div>
          <div class="mt-8">
            <el-button @click="submit" class="an" type="warning"
              >注册</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div id="light" class="white_content">
      <p class="wenzi">恭喜注册成功!</p>
      <p class="wenzi">{{ time }}后自动登录</p>
      <div class="middle">
        <el-button type="info" @click="goLogin">返回登录界面</el-button>
        <el-button type="primary" @click="goHome">确定</el-button>
      </div>
    </div>
    <!-- 弹窗结束 -->
  </div>
</template>

<script>
import { enrollApi, getCaptchaApi } from "../api/api.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      email: "",
      phone: "",
      time: 3,
      captchaSrc: "/api/captcha",
    };
  },
  methods: {
    // 倒计时
    daojishi() {
      this.timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(this.timer);
          // 倒计时结束跳转home页
          this.$router.push("/");
        } else {
          this.time--;
        }
      }, 1000);
    },
    goLogin() {
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/");
    },

    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    // 判断input中的内容
    verify() {
      return true;
    },
    // 注册成功的弹窗
    getWindow() {
      // 弹窗打开
      document.getElementById("light").style.display = "block";
      // 倒计时开始
      this.daojishi();
    },
    // 跳转
    jump(x) {
      if (x == 1) {
        // 弹窗
        this.getWindow();
        // 弹窗结束
        //
      } else {
        this.$message.error("跳转失败");
        this.captchaSrc = getCaptchaApi();
      }
    },

    // 登录
    submit() {
      if (this.verify()) {
        var username = this.username;
        var password = this.password;
        var email = this.email;
        var phone = this.phone;
        var captcha = this.captcha;
        var name = "景冯峰";
        enrollApi({
          username,
          name,
          password,
          email,
          captcha,
          phone,
        })
          .then((res) => {
            this.jump(res.data.status);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>




<style  scoped lang='scss'>
.enrollview {
  width: 100%;
  height: 100vh;
}
.enroll {
  margin: 0 auto;
  border: 15px solid #313131;
  width: 800px;
  height: 600px;
  border-radius: 30px;
}
.login {
  height: 50px;
  width: 100%;
  .text {
    margin-left: 80px;
    padding-top: 20px;
    font-size: 20px;
    color: #303133;
  }
}
.center {
  width: 80%;
  margin: 0 auto;
  height: 500px;
  background-color: whitesmoke;
}
.progress {
  padding-top: 30px;
}

.put {
  width: 300px;
  height: 30px;
}
.last-put {
  width: 150px;
  height: 30px;
}
.an {
  padding: 15px 135px;
}
.wenzi {
  text-align: center;
  color: blue;
  font-size: 18px;
  padding-top: 20px;
  padding-bottom: 50px;
}
</style>