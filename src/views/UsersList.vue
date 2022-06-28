<template>
  <div class="home">
    <div class="main1">
      <el-table :data="tableData" style="width: 100%" align="center">
        <el-table-column label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{
              new Date(scope.row.createdAt).toLocaleString()
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="性别" width="60" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px" v-if="scope.row.sex == 1">男</span>
            <span style="margin-left: 0px" v-else-if="scope.row.sex == 0"
              >女</span
            >
            <span style="margin-left: 0px" v-else>性别未知</span>
          </template>
        </el-table-column>

        <el-table-column label="昵称" width="120" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.avatarName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号" width="130" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮箱" width="180" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination middle">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[3, 5, 7, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
      



<script>
import { userListApi } from "../api/api";

export default {
  components: {},
  data() {
    return {
      count: 0,
      tableData: [],
      currentPage4: 10,
      pageSize: 5, //每页几条
      pageNum: 1, //第几页数据
      pagination: true, //true 分页
    };
  },

  created() {
    this.getInformation();
  },

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

    handleSizeChange(el) {
      this.pageSize = el;
      this.getInformation();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getInformation();
    },

    //   获取用户信息
    getInformation() {
      var pagination = this.pagination;
      var pageSize = this.pageSize;
      var pageNum = this.pageNum;
      userListApi({ pagination, pageSize, pageNum }).then((res) => {
        this.count = res.data.data.data.count;
        this.tableData = res.data.data.data.rows;
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.home {
  & .main-header {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px 0 10px 20px;
  }
  .pagination {
    margin-top: 20px;
  }
}

.inquire {
  margin: 10px 0 40px 0;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>


