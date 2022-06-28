<template>
  <div class="login">
    <div class="ml-20 head align-center">
      <img class="icon mr-15" src="../assets/logo3.png" alt="" />
      <span class="mr-15">1234</span>
      <span class="mr-15">|</span>
      <span class="mr-5">登录</span>
      <span @click="goEnroll">注册</span>
    </div>
    <div class="content">
      <div class="left"></div>
      <div class="right align-center">
        <div class="interface">
          <div class="account mt-10">
            <p class="text">账号</p>
            <el-input
              v-model="username"
              class="inp"
              placeholder="请输入账号"
            ></el-input>
          </div>

          <div class="password mt-10">
            <p class="text">密码</p>
            <el-input
              v-model="password"
              class="inp"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </div>

          <div class="align-center mt-10">
            <el-input
              class="yzm"
              v-model="captcha"
              placeholder="请输入验证码"
            ></el-input>
            <img @click="getCaptcha" :src="captchaSrc" alt="" />
          </div>

          <el-button class="btn" @click="submit" type="primary">登录</el-button>
        </div>
      </div>
    </div>
    <div class="tail"></div>
  </div>
</template>

<script>
import { loginApi, getCaptchaApi } from "../api/api.js";
import { encrypt } from "../assets/utils/index.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      captcha: "",
      captchaSrc: "/api/captcha",
    };
  },
  methods: {
    // 点击图片刷新验证码
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
    created() {
      window.addEventListener(
        "keydown",
        (event) => {
          if (event.code == "Enter") {
            console.log("sb");
            // this.submit();
            //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
            event.preventDefault();
          }
        },
        true
      );
    },

    // 判断账号与密码
    verify() {
      if (this.username == "") {
        this.$message.error("用户名不能为空");
        return false;
      } else if (this.username.length < 6 || this.username.length > 15) {
        this.$message.error("用户名长度应该在6-15位之间");
        return false;
      } else if (this.password == "") {
        this.$message.error("密码不能为空");
        return false;
      } else if (this.password.length < 6 || this.password.length > 15) {
        this.$message.error("密码长度应该在6-15位之间");
        return false;
      } else if (this.captcha == "") {
        this.$message.error("验证码不能为空");
        return false;
      } else if (this.captcha.length !== 4) {
        this.$message.error("验证码输入不正确");
        return false;
      } else {
        return true;
      }
    },
    // 跳转
    jump(x) {
      if (x.data.status == 1) {
        sessionStorage.setItem("token", x.data.data);
        console.log("123");
        this.$message.error("跳转成功");
        this.$router.push("/task");
      } else {
        this.$message.error("跳转失败");
        this.captchaSrc = "/api/captcha?" + Math.random();
      }
    },
    goEnroll() {
      this.$router.push("/enroll");
    },

    // 登录
    submit() {
      if (this.verify()) {
        var username = this.username;
        var password = encrypt(this.password);
        var captcha = this.captcha;
        loginApi({ username, password, captcha })
          .then((res) => {
            this.jump(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.head {
  height: 80px;
  background-color: #f9f9fb;
}
.content {
  height: calc(100vh - 140px);

  background-image: url("../assets/q.png");
  background-repeat: no-repeat;
  background-size: 100% 100%; /*宽高都100%*/
  display: flex;
}
.left {
  flex: 3;
}
.right {
  flex: 2;
}
.interface {
  width: 315px;
  height: 428px;
  background-color: #fff;
  border-radius: 30px;
  padding-top: 50px;
  opacity: 0.9;
}
.tail {
  height: 60px;
}

.text {
  color: blue;
  margin-left: 23px;
}
.yzm {
  width: 132px;
  height: 12px;
  margin-left: 20px;
}
</style>


