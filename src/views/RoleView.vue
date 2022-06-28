<template>
  <div class="home">
    <div class="title">
      <h2><i class="mr-15 el-icon-user-solid"></i>角色管理</h2>
    </div>
    <div class="inside">
      <el-container>
        <el-aside class="inside-aside" width="200px">
          <div class="header flex-between">
            <el-button size="mini" icon="el-icon-user" round @click="createrole"
              >创建角色</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-lollipop"
              round
              @click="createGroup"
              >创建分组</el-button
            >
          </div>
          <div>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-submenu :index="i + ''" v-for="(item, i) in parentGroup">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.groupName }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    @click="submit(user, index)"
                    v-for="(user, index) in item.add"
                    :index="index + '-' + i + 1"
                    >{{ user.roleName }}</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </div>
    <!-- 创建角色弹窗开始 -->
    <el-dialog title="创建角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          v-if="flag"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="列表名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-if="flag"
          label="所属分组"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.groupId" placeholder="请选择活动区域">
            <el-option
              v-for="item in parentGroup"
              :label="item.groupName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="success" v-if="flag" @click="sure">创建角色</el-button>
        <el-button type="danger" v-else @click="add">创建分组</el-button>
      </div>
    </el-dialog>
    <!-- 创建角色弹窗结束 -->
  </div>
</template>
      



<script>
import {
  roleListApi,
  listroleGroupApi,
  getUserInfoApi,
  createRoleApi,
  createroleGroupApi,
} from "../api/api";
export default {
  data() {
    return {
      parentGroup: [],
      subGroups: [],
      dialogFormVisible: false,
      form: {
        userId: "",
        roleName: "",
        groupId: "",
      },
      flag: true,
      formLabelWidth: "80px",
    };
  },
  methods: {
    // 角色提交
    sure() {
      this.dialogFormVisible = false;
      console.log(this.form);
      createRoleApi(this.form).then((res) => {
        this.form = {
          userId: "",
          roleName: "",
          groupId: "",
        };
        this.getData();
      });
    },
    // 分组提交
    add() {
      createroleGroupApi({
        groupName: this.form.roleName,
      }).then((res) => {
        console.log(res.data.status);
      });
    }, // 取消
    cancel() {
      this.dialogFormVisible = false;

      this.form = {
        userId: "",
        roleName: "",
        groupId: "",
      };
    },
    // 获取用户id
    getUserId() {
      getUserInfoApi().then((res) => {
        if (res.data.status == 401) {
          this.$router.push("/login");
        } else {
          this.form.userId = res.data.data.id;
        }
      });
    },

    // 创建角色
    createrole() {
      this.flag = true;
      this.getUserId();
      this.dialogFormVisible = true;
    },
    // 创建分组
    createGroup() {
      this.flag = false;
      this.dialogFormVisible = true;
    },
    submit(row, i) {
      this.$router.push("/permissionmanagement");
    },

    async getData() {
      let res = await Promise.all([
        roleListApi({ pagination: false }),
        listroleGroupApi({ pagination: false }),
      ]);

      this.subGroups = res[0].data.data.rows;
      this.parentGroup = res[1].data.data.rows;

      // console.log(this.subGroups);
      console.log(this.parentGroup);
      // console.log(this.subGroups[0].groupId);
      this.parentGroup.forEach((x) => {
        x.add = this.subGroups.filter((e) => e.groupId == x.id);
      });
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped lang='scss'>
.home {
  & .title {
    margin-left: 20px;
    margin-right: 20px;

    height: 50px;
    border-bottom: 1px solid #dfdede;

    & h2 {
      color: #606266;
    }
  }
  & .inside {
    & .inside-aside {
      border-right: 1px solid #dfdede;

      & .inside-aside-btn {
        width: 100%;
        margin-top: 20px;
        padding: 0 10px 20px 0px;
      }
    }
  }
  & .header {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 0px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>


