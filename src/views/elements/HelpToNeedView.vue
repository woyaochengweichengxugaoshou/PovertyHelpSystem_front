<template>
  <el-container style="height: 800px; border: 1px solid #eee">
      <el-header style="font-size:40px;background-color: rgb(238, 241, 246)">精准扶贫管理系统</el-header>
      <el-container>
          <el-aside width="200px" style="border: 1px solid #eee">
              <el-menu :default-openeds="['1', '2']">
                  <el-submenu index="1">
                      <template slot="title"><i class="el-icon-message"></i>人员信息管理</template>
                      <el-menu-item index="1-1">
                          <router-link to="/poverty" class="no-underline">贫困人员</router-link>
                      </el-menu-item>
                      <el-menu-item index="1-2">
                          <router-link to="/volunteer" class="no-underline">志愿者</router-link>
                      </el-menu-item>
                  </el-submenu>

                  <el-submenu index="2">
                      <template slot="title"><i class="el-icon-message"></i>帮扶信息管理</template>
                      <el-menu-item index="2-1">
                          <router-link to="/support" class="no-underline">
                              <router-link to="/help_to_need" class="no-underline">帮扶情况</router-link>
                          </router-link>
                      </el-menu-item>
                  </el-submenu>
              </el-menu>
          </el-aside>
          <el-main>
              <!-- 查询条件表单 -->
              <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                  <el-form-item label="贫困人员姓名">
                      <el-input v-model="searchForm.povertyName" placeholder="贫困人员姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="编号">
                      <el-input v-model="searchForm.povertyId" placeholder="编号"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                  <!-- 开始匹配按钮 -->
                  <el-form-item>
                      <el-button type="success" @click="assignHelp">开始匹配</el-button>
                  </el-form-item>
                  <!-- 清除匹配按钮 -->
                  <el-form-item>
                      <el-button type="clear" @click="clearHelp" class="clear-button">清除匹配</el-button>
                  </el-form-item>
              </el-form>
              
              <!-- 数据表格 -->
              <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="povertyName" label="贫困人员姓名" width="200"></el-table-column>
                  <el-table-column prop="povertyId" label="贫困人员编号" width="200"></el-table-column>
                  <el-table-column prop="need" label="需求" width="250"></el-table-column>
                  <el-table-column prop="volunteerName" label="志愿者姓名" width="200"></el-table-column>
                  <el-table-column prop="volunteerId" label="志愿者编号" width="200"></el-table-column>
                  <el-table-column prop="help" label="服务" width="300"></el-table-column>
              </el-table>

              <!-- 分页控件 -->
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  background
                  layout="sizes, prev, pager, next, jumper, total"
                  :total="total"
                  :page-sizes="[5, 10, 15, 20, 25]"
                  :page-size="pageSize"
                  :current-page="currentPage">
              </el-pagination>

          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
data() {
  return {
    total: 0,
    pageSize: 5,
    currentPage: 1,
    tableData: [],
    searchForm: {
      povertyName: '',
      povertyId: '',
    },
  };
},
methods: {
  onSubmit() {
    this.currentPage = 1;
    this.fetchData();
  },
  handleSizeChange(val) {
    this.pageSize = val;
    this.currentPage = 1;
    this.fetchData();
  },
  handleCurrentChange(val) {
    this.currentPage = val;
    this.fetchData();
  },
  fetchData() {
    axios.get("http://localhost:8080/help_to_need", {
      headers: { 'Accept': 'application/json' },
      params: {
        page: this.currentPage,
        pagesize: this.pageSize,
        povertyName: this.searchForm.povertyName,
        povertyId: this.searchForm.povertyId,
      },
    }).then(resp => {
      this.tableData = resp.data.rows;   // 更新表格数据
      this.total = resp.data.page;      // 更新总条数
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  },
  // 新增的assignHelp方法
  assignHelp() {
    axios.get("http://localhost:8080/help_to_need/assign", {
      headers: { 'Accept': 'application/json' },
      params: {
        page: this.currentPage,
        pagesize: this.pageSize,
        povertyName: this.searchForm.povertyName,
        povertyId: this.searchForm.povertyId,
      },
    }).then(resp => {
      this.tableData = resp.data.rows;   // 更新表格数据
      this.total = resp.data.page;      // 更新总条数
      this.$message.success("志愿者分配成功！");
    }).catch(error => {
      console.error("Error assigning help:", error);
      this.$message.error("分配失败，请稍后再试！");
    });
  },
  // 新增的clearHelp方法
  clearHelp() {
    axios.get("http://localhost:8080/help_to_need/clear", {
      headers: { 'Accept': 'application/json' },
      params: {
        page: this.currentPage,
        pagesize: this.pageSize,
        povertyName: this.searchForm.povertyName,
        povertyId: this.searchForm.povertyId,
      },
    }).then(resp => {
      this.tableData = resp.data.rows;   // 更新表格数据
      this.total = resp.data.page;      // 更新总条数
      this.$message.success("分配结果清除成功！");
    }).catch(error => {
      console.error("Error assigning help:", error);
      this.$message.error("清除失败，请稍后再试！");
    });
  },
},
mounted() {
  this.fetchData();
}
};
</script>

<style>
  .no-underline {
      text-decoration: none;
      color: #000;
  }

  .clear-button {
      background-color: red;
      color: white;
  }
  .clear-button:hover {
    background-color: #ff6666; /* 鼠标悬停时颜色变淡 */
    color: white;
}
</style>
