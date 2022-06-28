<template>
  <div class="home">
    <el-main class="main">
      <!-- 内容头开始 -->
      <div class="overview public">
        <div class="nav">
          <span class="subheading">所属题型:</span>
          <el-button size="mini" round>全部考</el-button
          ><el-button size="mini" round>单选题</el-button
          ><el-button size="mini" round>多选题</el-button
          ><el-button size="mini" round>判断题</el-button>
          <el-button size="mini" round>其他</el-button>
        </div>
        <div class="nav">
          <span class="subheading">难易程度:</span>
          <el-button size="mini" round>全部</el-button
          ><el-button size="mini" round>简单</el-button
          ><el-button size="mini" round>基本</el-button>
          <el-button size="mini" round>困难</el-button>
        </div>
        <div class="nav flex-between align-center">
          <div>
            <el-button size="mini" @click="addQuestions" type="primary"
              >添加习题</el-button
            >
            <el-button size="mini" type="primary">批量导入</el-button>
            <el-button size="mini" type="primary">加入公共习题</el-button>
          </div>
          <div>
            <el-input
              suffix-icon="el-icon-search"
              class="inp"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 内容头结束 -->
      <!-- 渲染开始 -->
      <div v-for="item in QuestionBank" class="content public">
        <div class="loop-on flex-between">
          <div class="createdTime">
            <span class="item">创建时间:</span
            ><span class="item">{{
              new Date(item.createdAt).toLocaleString()
            }}</span>
            <span class="item">
              <el-button size="mini" type="danger" disabled>单</el-button>
              <el-button size="mini" type="success" disabled
                >简单</el-button
              ></span
            >
            <span class="item">满分:100</span>
            <span class="item">使用次数:18</span>
          </div>
          <div class="operate">
            <div
              class="control el-icon-edit-outline"
              @click="specificActions(item)"
            ></div>
            <div class="el-icon-delete" @click="open(item)"></div>
          </div>
        </div>

        <div class="cycle-down">
          <div class="titlt mt-8">
            <el-checkbox>{{ item.title }}</el-checkbox>
          </div>
          <div class="options mt-8">
            <el-radio label="1">A:{{ item.questionA }}</el-radio>
            <el-radio label="2">B:{{ item.questionB }}</el-radio>
            <el-radio v-if="item.questionC" label="3"
              >C:{{ item.questionC }}</el-radio
            >
            <el-radio v-if="item.questionD" label="4"
              >D:{{ item.questionD }}</el-radio
            >
          </div>

          <div class="answer mt-8">
            <p>
              答案：<span>{{ item.answer }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 渲染结束 -->
      <!-- 分页开始 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 分页结束 -->
    </el-main>

    <!-- 添加题弹窗开始 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="550px">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        class="layer"
      >
        <el-form-item label="题目">
          <el-input class="inp" v-model="formLabelAlign.title"></el-input>
        </el-form-item>

        <div class="align-center" v-for="(item, index) in questionzhenshi">
          <div>
            <el-form-item :label="item.lable">
              <el-input class="inp" v-model="item.value"></el-input>
            </el-form-item>
          </div>
          <div class="qwe">
            <span
              v-if="index == questionzhenshi.length - 1 && index < 3"
              class="item el-icon-circle-plus"
              @click="add"
            ></span>
            <span
              v-if="index > 1 && index == questionzhenshi.length - 1"
              class="item el-icon-remove"
              @click="odd(index)"
            ></span>
          </div>
        </div>

        <el-form-item label="答案">
          <el-select
            v-model="formLabelAlign.answer"
            placeholder="请选择正确答案"
            class="weq"
          >
            <el-option
              v-for="item in questionzhenshi"
              :label="item.lable"
              :value="item.key"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度系数">
          <el-select
            v-model="formLabelAlign.level"
            placeholder="请选择难度"
            class="weq"
          >
            <el-option
              v-for="item in nandu"
              :label="item.lable"
              :value="item.value"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="qq" @click="create">创建</el-button>
        <el-button type="primary" v-if="ww" @click="xiugai">修改</el-button>
      </span>
    </el-dialog>
    <!-- 添加题弹窗结束 -->
  </div>
</template>
      

<script>
import { titleApi, deleteApi, createApi, updateApi } from "../api/api";

export default {
  components: {},
  data() {
    return {
      qq: false,
      ww: false,

      type: 1,
      pageSize: 1,
      pageNum: 1,
      currentPage: 1,
      total: 0,
      QuestionBank: [],
      centerDialogVisible: false,
      id: "",
      labelPosition: "right",
      formLabelAlign: {
        type: 1,
        title: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: "",
        answer: "",
        level: "",
      },
      nandu: [
        { id: 1, lable: "普通", value: "1" },
        { id: 2, lable: "一般", value: "2" },
        { id: 3, lable: "困难", value: "3" },
      ],
      questionzhenshi: [],
      question: [
        { id: 1, lable: "选项A", key: "A", value: "" },
        { id: 2, lable: "选项B", key: "B", value: "" },
        { id: 3, lable: "选项C", key: "C", value: "" },
        { id: 4, lable: "选项D", key: "D", value: "" },
      ],
    };
  },
  created() {
    this.getTitleApi();
  },
  methods: {
    // 初始化
    xx() {
      this.formLabelAlign = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      this.questionzhenshi = JSON.parse(JSON.stringify(this.question)).slice(
        0,
        2
      );
      console.log(this.questionzhenshi);
      this.answer = "";
      this.questionzhenshi.forEach((options) => {
        options.value = "";
      });
    },
    // 创建入参添加习题
    formatCreateParams() {
      let res = {};
      res.type = Number(this.formLabelAlign.type);
      res.title = this.formLabelAlign.title;

      this.questionzhenshi.forEach((item) => {
        console.log(item);
        res["question" + item.key] = item.value;
      });
      res.answer = this.formLabelAlign.answer;
      res.level = Number(this.formLabelAlign.level);
      if (res.title == "") {
        this.$message("标题不能为空");
        return false;
      } else if (
        res.questionA == "" ||
        res.questionB == "" ||
        res.questionC == "" ||
        res.questionD == ""
      ) {
        this.$message("选项不能为空");
        return false;
      } else if (res.answer == "") {
        this.$message("答案不能为空");
        return false;
      } else if (res.level == "") {
        this.$message("难度不能为空");
        return false;
      } else {
        return res;
      }
    },
    // 修改

    formatCreateParams1() {
      let res = {};
      res.id = this.id;
      res.type = 1;
      res.title = this.formLabelAlign.title;

      this.questionzhenshi.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.formLabelAlign.answer;
      res.level = Number(this.formLabelAlign.level);
      if (res.title == "") {
        this.$message("标题不能为空");
        return false;
      } else if (
        res.questionA == "" ||
        res.questionB == "" ||
        res.questionC == "" ||
        res.questionD == ""
      ) {
        this.$message("选项不能为空");
        return false;
      } else if (res.answer == "") {
        this.$message("答案不能为空");
        return false;
      } else if (res.level == "") {
        this.$message("难度不能为空");
        return false;
      } else {
        return res;
      }
    },

    // 删除框
    odd() {
      this.questionzhenshi.pop();
      console.log(this.questionzhenshi.length);
      this.formLabelAlign.answer = "";
    },
    // 添加框
    add() {
      if (this.questionzhenshi.length === 4) return;
      var question1 = [
        { id: 1, lable: "选项A", key: "A", value: "" },
        { id: 2, lable: "选项B", key: "B", value: "" },
        { id: 3, lable: "选项C", key: "C", value: "" },
        { id: 4, lable: "选项D", key: "D", value: "" },
      ];

      this.questionzhenshi.push(question1[this.questionzhenshi.length]);
    },
    // 获取用户信息
    getTitleApi() {
      var type = this.type;
      var pageSize = this.pageSize;
      titleApi({ type, pageSize })
        .then((res) => {
          console.log(res.data.data.rows);
          this.total = res.data.data.count;

          this.QuestionBank = res.data.data.rows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取用户信息结束

    // 获取用户信息结束
    // 删除开始
    open(item) {
      this.$confirm("您是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //  删除开始
          var id = item.id;
          var type = item.type;
          deleteApi({ type, id }).then((res) => {
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getTitleApi();
            } else {
              alert("失败");
            }
          });
          //  删除结束
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 删除开始
    // 添加习题事件开始
    addQuestions() {
      this.qq = true;
      this.ww = false;
      this.xx();
      this.centerDialogVisible = true;
    },
    // 添加习题事件结束
    create() {
      if (this.formatCreateParams()) {
        var params = this.formatCreateParams();
        console.log(params);

        createApi(params).then((res) => {
          console.log(res.data.status);
          this.centerDialogVisible = false;
        });
      }
    },
    // 添加接口结束
    // 调用修改接口开始

    xiugai() {
      if (this.formatCreateParams1()) {
        var params = this.formatCreateParams1();
        console.log(params);

        updateApi(params).then((res) => {
          console.log(res.data.status);
        });
        this.centerDialogVisible = false;
        this.getTitleApi();
      }
    },
    // 调用修改接口结束
    // 修改开始
    specificActions(item) {
      this.qq = false;
      this.ww = true;
      this.centerDialogVisible = true;
      var isCreayeEvent = item instanceof PointerEvent;
      if (isCreayeEvent) {
        console.log("创建路线");
      } else {
        console.log("编辑路线");
        this.id = item.id;
        this.formLabelAlign.title = item.title;
        this.formLabelAlign.level = item.level;
        this.formLabelAlign.answer = item.answer;
        this.formLabelAlign.level = item.level;
        if (!item.questionC) {
          this.questionzhenshi = this.question.slice(0, 2);
          this.questionzhenshi[0].value = item.questionA;
          this.questionzhenshi[1].value = item.questionB;
        } else {
          this.questionzhenshi = this.question.slice(0, 3);
          this.questionzhenshi[0].value = item.questionA;
          this.questionzhenshi[1].value = item.questionB;
          this.questionzhenshi[2].value = item.questionC;
        }
        if (item.questionD) {
          this.questionzhenshi = this.question.slice(0, 4);
          this.questionzhenshi[0].value = item.questionA;
          this.questionzhenshi[1].value = item.questionB;
          this.questionzhenshi[2].value = item.questionC;
          this.questionzhenshi[3].value = item.questionD;
        }

        console.log(this.formLabelAlign);
      }
    },
    // 修改结束

    // 一页几条
    handleSizeChange(val) {
      this.pageSize = val;
      var pageSize = Number(val);
      var type = Number(this.type);
      var pageNum = Number(this.pageNum);
      titleApi({ type, pageSize, pageNum })
        .then((res) => {
          this.QuestionBank = res.data.data.rows;
          this.total = res.data.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 第几页
    handleCurrentChange(val) {
      this.pageNum = val;
      var type = Number(this.type);
      var pageNum = Number(val);
      var pageSize = Number(this.pageSize);
      titleApi({ type, pageNum, pageSize })
        .then((res) => {
          this.QuestionBank = res.data.data.rows;
          this.total = res.data.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.main {
  width: 100%;
  height: 100%;
}
.overview {
  padding: 20px 20px;
  border: 1px solid #b6b5b5;
  border-radius: 10px;
  min-width: 600px;

  & .subheading {
    padding-right: 20px;
  }
  & .nav {
    padding: 10px 0;
  }
}
.content {
  padding: 20px 20px;
  margin-top: 20px;
  border: 1px solid #b6b5b5;
  border-radius: 10px;
  min-width: 600px;
}
.loop-on {
  padding: 4px;
  & .createdTime {
    font-size: 12px;
    color: #b9b9b9;

    & .item {
      margin-right: 20px;
    }
  }
  & .control {
    margin-right: 20px;
  }
}
.cycle-down {
  padding: 4px 4px 0 4px;

  & .options {
    padding-left: 20px;
  }
  & .answer {
    padding-left: 20px;
  }
}
.block {
  padding: 20px 0;
  margin: 0 auto;
}
.qwe {
  padding-bottom: 20px;
  padding-left: 10px;
  & .item {
    padding-left: 10px;
  }
}
.weq {
  margin-left: 20px;
}
.layer {
  margin-left: 40px;
}
</style>


