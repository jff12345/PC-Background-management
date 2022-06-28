<template>
  <div class="home">
    <el-main class="main">
      <div class="middle">
        <el-form ref="form" :model="form" label-width="80px">
          <h1 class="">编辑任务</h1>
          <el-form-item label="任务名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="任务时常">
            <el-input v-model="form.duration"></el-input>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <!--  -->
          <el-form-item label="执行人">
            <el-select v-model="form.value1" multiple placeholder="请选择">
              <el-option
                v-for="item in form.executors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!--  -->

          <el-form-item label="是否紧急">
            <el-switch v-model="form.level"></el-switch>
          </el-form-item>
          <el-button @click="submit">确认</el-button>
        </el-form>
      </div>
    </el-main>
  </div>
</template>
      



<script>
import { userListApi } from "../api/api";

export default {
  components: {},
  props: {
    id: Number,
    name: String, //任务名称
    desc: String, //任务描述
    duration: Number, //任务时长
    level: Boolean, // 任务等级  1：紧急  0：普通任务
    executors: Array, //未领取任务的人
  },
  watch: {
    id: function () {
      // console.log(this.id);
      this.form.id = this.id;
    },
    name: function () {
      // console.log(this.name);
      this.form.name = this.name;
    },
    desc: function () {
      // console.log(this.desc);
      this.form.desc = this.desc;
    },
    duration: function () {
      // console.log(this.duration);
      this.form.duration = this.duration;
    },
    level: function () {
      // console.log(this.level);
      this.form.level = this.level;
    },
    executors: function () {
      // console.log(this.executors);
      this.form.executors = this.executors;
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        id: this.id, //任务id
        name: this.name, //任务名称
        desc: this.desc, //任务描述
        duration: this.duration, //任务时长
        level: this.level, // 任务等级  1：紧急  0：普通任务
        executors: this.executors,
        value1: [], //显示的东西
      },
      delivery: false,
    };
  },
  methods: {
    judgment() {
      if (this.form.name == "") {
        this.$message("任务名称不能为空");
        return false;
      } else if (this.form.duration == "") {
        this.$message("任务时常不能为空");
        return false;
      } else if (this.value1 == "") {
        this.$message("执行人不能为空");
        return false;
      } else {
        return true;
      }
    },

    //   获取用户信息
    getInformation() {
      var pagination = false;
      userListApi({ pagination }).then((res) => {
        this.form.executors = res.data.data.data.rows;
      });
    },
    initform() {
      this.form = {
        name: "",
        desc: "",
        duration: 1,
        level: false,
        value1: [],
        executors: this.form.executors,
      };
    },
    clear() {
      this.form = {
        id: this.id, //任务id
        name: this.name, //任务名称
        desc: this.desc, //任务描述
        duration: this.duration, //任务时长
        level: this.level, // 任务等级  1：紧急  0：普通任务
        executors: this.executors,
        value1: [], //显示的东西
      };
    },
    submit() {
      this.$emit("func", this.form);
    },
  },
  created() {
    this.getInformation();
  },
};
</script>

<style scoped lang='scss'>
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
}
</style>


