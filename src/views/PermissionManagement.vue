<template>
  <div class="home">
    <div class="inside">
      <div class="inside-main-title">
        <span class="inside-main-text1">所有者</span>
        <span class="inside-main-text2"
          >系统默认角色,默认具有企业所有功能功能和全部数据可见范围</span
        >
      </div>
      <div class="inside-main-label">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色成员" class="role" name="first">
          </el-tab-pane>
          <el-tab-pane label="功能权限" name="second"
            ><div class="inside-main-label-text flex-between">
              <div><p>设置角色对应的操作功能，应用管理后台权限</p></div>
              <div>
                <el-checkbox v-model="checked">消息</el-checkbox>
              </div>
            </div>
            <div class="inside-content">
              <div class="item1">
                <div class="left-item1 align-center">
                  <el-checkbox v-model="checked">题库管理</el-checkbox>
                </div>
                <div class="left-item2 align-center">
                  <el-checkbox v-model="checked">角色管理</el-checkbox>
                </div>
                <div class="left-item3 align-center">
                  <el-checkbox v-model="checked">我的任务</el-checkbox>
                </div>
                <div class="left-item4 align-center">
                  <el-checkbox v-model="checked">其他</el-checkbox>
                </div>
              </div>
              <div class="item2">
                <div class="right-item1">
                  <div class="right-item1-item1 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">js练习题</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item1-item2 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">html练习题</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item1-item3 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">vue练习题</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right-item2">
                  <div class="right-item2-item1 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item2-item2 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item2-item3 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right-item3">
                  <div class="right-item3-item1 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item3-item2 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item3-item3 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right-item4">
                  <div class="right-item4-item1 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item4-item2 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                  <div class="right-item4-item3 align-center">
                    <div class="right-item">
                      <div>
                        <el-checkbox v-model="checked">消息</el-checkbox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据范围" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
      



<script>
import {} from "../api/api";

export default {
  components: {},
  data() {
    return {
      checked: false,
      count: 0,
      tableData: [],
      currentPage4: 4,

      activeName: "second",
      options: [],
      value: "",
    };
  },

  created() {},

  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  padding: 10px;

  & .title {
    margin-left: 20px;
    margin-right: 20px;

    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dfdede;

    & h2 {
      color: #606266;
    }
  }
  & .inside {
    & .inside-aside {
      border-right: 1px solid #dfdede;
      height: calc(100vh - 162px);
      & .inside-aside-btn {
        width: 100%;
        margin-top: 20px;
        padding: 0 0px 20px 0px;
      }
    }
    & .inside-main-title {
      height: 60px;

      & .inside-main-text1 {
        font-size: 25px;
        color: #303133;
        font-weight: 600;
        margin-right: 10px;
        margin-left: 10px;
      }
      & .inside-main-text2 {
        font-size: 15px;
        color: #909399;
        font-weight: 300;
      }
    }
    & .inside-main-label {
      & .inside-main-label-text {
        font-size: 15px;
        color: #909399;
        font-weight: 300;
        margin-right: 20px;
      }
      & .inside-content {
        width: 100%;
        height: 431px;
        background-color: #fafbfc;
        display: grid;
        grid-template-columns: 1fr 5fr;
        & .item1 {
          border: 1px solid #e4eeff;
          display: grid;
          grid-template-rows: 1fr 1fr 1fr 1fr;

          & .left-item1 {
            padding-left: 20px;
          }
          & .left-item2 {
            border-top: 1px solid #e4eeff;
            padding-left: 20px;
          }
          & .left-item3 {
            border-top: 1px solid #e4eeff;
            padding-left: 20px;
          }
          & .left-item4 {
            border-top: 1px solid #e4eeff;
            padding-left: 20px;
          }
        }
        & .item2 {
          border-top: 1px solid #e4eeff;
          border-right: 1px solid #e4eeff;
          border-bottom: 1px solid #e4eeff;
          display: grid;
          grid-template-rows: 1fr 1fr 1fr 1fr;

          & .right-item {
            padding-left: 20px;
          }

          & .right-item1 {
            display: grid;
            grid-template-columns: 1fr 1fr 1.4fr;
          }
          & .right-item2 {
            border-top: 1px solid #e4eeff;
            display: grid;
            grid-template-columns: 1fr 1fr 1.4fr;
          }
          & .right-item3 {
            border-top: 1px solid #e4eeff;
            display: grid;
            grid-template-columns: 1fr 1fr 1.4fr;
          }
          & .right-item4 {
            border-top: 1px solid #e4eeff;
            display: grid;
            grid-template-columns: 1fr 1fr 1.4fr;
          }
        }
      }
      & .table-header {
        padding: 5px;
      }
    }
  }
}
.main1 {
  overflow-y: scroll;
  width: 100%;

  height: 450px;

  & .pagination {
    margin-top: 10px;
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>


