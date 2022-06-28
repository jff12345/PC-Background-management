<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="flex-between header">
          <!-- 头左开始 -->
          <div class="logo align-center">
            <img class="icon-header mr-5" src="../assets/pretty.png" alt="" />
            <span>考试系统</span>
          </div>
          <!-- 头左结束 -->
          <!-- 头右开始 -->
          <div class="right align-center info">
            <div class="left">武汉市</div>
            <div class="center align-center">
              <img class="icon mr-5" src="../assets/logo3.png" alt="" />
              <span>{{ userInfo.avatarName || userInfo.phone }} 你好</span>
            </div>

            <div @click="goLogin" class="right align-center">
              <img class="icon mr-5" src="../assets/quit.png" alt="" />
              <span>退出</span>
            </div>
          </div>
          <!-- 头右结束 -->
        </div></el-header
      >
      <el-container>
        <el-aside width="200px">
          <div class="aside">
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              background-color="#0b1b34"
              text-color="#fff"
              active-text-color="red"
              unique-opened
              v-for="item in menu"
              :key="item.name"
            >
              <el-menu-item
                :index="item.name"
                v-if="!item.children"
                @click="navigator(item.name)"
              >
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{ item.label }}</span>
                </template>
              </el-menu-item>
              <el-submenu v-else :index="item.name">
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group
                  v-for="item in item.children"
                  :key="item.name"
                >
                  <el-menu-item
                    :index="item.name"
                    @click="navigator(item.name)"
                    >{{ item.label }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div></el-aside
        >

        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfoApi, logoutApi } from "../api/api.js";
import menu from "@/config/menu.config.js";

export default {
  components: {},

  data() {
    return {
      userInfo: {},
      menu,
    };
  },
  created() {
    getUserInfoApi().then((res) => {
      if (res.data.status == 401) {
        this.$router.push("/login");
      } else {
        this.userInfo = res.data.data;
      }
    });
  },
  computed: {
    defaultActive() {
      return this.$route.name;
    },
  },

  methods: {
    navigator(name) {
      //解决重复点击路由报错，加个判断返回就好了
      if (this.$route.name == name) return;
      this.$router.push({
        name,
      });
    },

    goLogin() {
      logoutApi().then((res) => {
        if (res.data.status == 1) {
          sessionStorage.setItem("token", "");
          this.$router.push("/login");
        } else {
          alert("失败");
        }
      });
    },
    goEnroll() {
      this.$router.push("/enroll");
    },
  },
};
</script>

<style scoped lang='scss'>
.el-header {
  background-color: #3983ee;
  color: #fff;
  font-size: 20px;
  height: 60px;
  min-width: 800px;
}
.header {
  background-color: #3983ee;
  color: #fff;
  font-size: 20px;
  height: 60px;
  min-width: 800px;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.el-aside {
  width: 200px;
  height: calc(100vh - 60px);
  background-color: #0b1b34;
}

.el-main {
  width: 100px;
  height: calc(100vh - 60px);
}

.icon-header {
  width: 50px;
  height: 30px;
  margin-left: 100px;
}
.info {
  display: flex;
  gap: 0 20px;
  font-size: 15px;
}
.right {
  margin-right: 30px;
}
</style>


