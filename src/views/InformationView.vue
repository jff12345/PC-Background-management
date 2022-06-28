<template>
  <div class="home">
    <el-main class="main">
      <div class="main1">
        <div class="title">
          <h4>基本信息</h4>
        </div>
        <div class="forms">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号昵称">
              <el-input v-model="form.avatarName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="form.sex" label="1">男</el-radio>
              <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-form-item>

            <el-form-item label="所在地">
              <!-- 省 -->
              <el-select v-model="form.provinceNo" placeholder="请选则地址">
                <el-option
                  v-for="item in bigdata"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <!-- 市 -->
              <el-select
                class="address"
                v-model="form.cityNo"
                placeholder="请选则地址"
              >
                <el-option
                  v-for="item in city"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <!-- 区 -->
              <el-select
                class="address"
                v-model="form.areaNo"
                placeholder="请选则地址"
              >
                <el-option
                  v-for="item in distric"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="简介">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </div>
</template>
      



<script>
import { getUserInfoApi, userupdateApi } from "../api/api.js";
import { bigdata1 } from "../components/static/citydata.js";
export default {
  components: {},
  data() {
    return {
      xx: [],
      form: {
        phone: "",
        email: "",
        sex: "",
        avatarName: "",
        name: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        desc: "",
      },
      bigdata: [],
      city: [],
      distric: [],
    };
  },

  watch: {
    "form.provinceNo": function (val) {
      this.bigdata.find((item) => {
        if (val == item.code) {
          this.city = item.children;
          this.form.cityNo = "";
          this.form.areaNo = "";
          console.log(this.city);
        }
      });
    },
    "form.cityNo": function (val) {
      console.log(val);
      this.city.find((item) => {
        if (val == item.code) {
          this.distric = item.children || [];
          this.form.areaNo = "";
          console.log(this.distric);
        }
      });
    },
  },
  created() {
    getUserInfoApi({}).then((res) => {
      console.log(res.data.data);
      this.form.phone = res.data.data.phone;
      this.form.email = res.data.data.email;
      this.form.sex = res.data.data.sex + "";
      this.form.avatarName = res.data.data.avatarName;
      this.form.name = res.data.data.name;
      this.form.desc = res.data.data.desc;
      this.form.provinceNo = res.data.data.provinceNo;
      this.form.cityNo = res.data.data.cityNo;
      this.form.areaNo = res.data.data.areaNo;
    });
    this.bigdata = bigdata1();
    console.log(this.form);
  },

  methods: {
    // 检验完提交
    onSubmit() {
      if (this.form.avatarName == "") {
        this.$message("账号不能为空");
        return false;
      } else if (this.form.name == "") {
        this.$message("姓名不能为空");
        return false;
      } else if (this.form.cityNo == "") {
        this.$message("(市/区)级单位不能为空");
        return false;
      } else if (this.form.desc == "") {
        this.$message("简介不能为空");
        return false;
      } else {
        userupdateApi(this.form).then((res) => {});
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.main {
  width: 100%;
  height: 100%;
  padding: 10px;
  min-width: 900px;
}
.title {
  height: 60px;
  background-color: #ffffff;
}
.main1 {
  padding: 15px;
}
</style>


