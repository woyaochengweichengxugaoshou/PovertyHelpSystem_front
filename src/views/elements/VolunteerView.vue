<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-header style="font-size:40px;background-color: rgb(238, 241, 246)">精准扶贫管理系统</el-header>
    <el-container>
      <el-aside width="200px" style="border: 1px solid #eee">
        <el-menu :default-openeds="['1', '3']">
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
              <router-link to="/help_to_need" class="no-underline">帮扶情况</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 查询条件表单 -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="志愿者姓名">
            <el-input v-model="searchForm.name" placeholder="志愿者姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="searchForm.gender" placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="searchForm.age" placeholder="年龄"></el-input>
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="searchForm.volunteerId" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item label="入职日期">
            <el-date-picker v-model="searchForm.comeDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="openAddDialog">新增人员</el-button>
          </el-form-item>
        </el-form>

        <!-- 新增志愿者对话框 -->
        <el-dialog title="新增志愿者" :visible.sync="addDialogVisible">
          <el-form :model="newVolunteer">
            <el-form-item label="姓名">
              <el-input v-model="newVolunteer.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="newVolunteer.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="newVolunteer.age" placeholder="年龄"></el-input>
            </el-form-item>
            <el-form-item label="编号">
              <el-input v-model="newVolunteer.volunteerId" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="服务">
              <el-checkbox-group v-model="newVolunteer.help">
                <el-checkbox label="1">服务1</el-checkbox>
                <el-checkbox label="2">服务2</el-checkbox>
                <el-checkbox label="3">服务3</el-checkbox>
                <el-checkbox label="4">服务4</el-checkbox>
                <el-checkbox label="5">服务5</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addVolunteer">确认</el-button>
          </div>
        </el-dialog>

        <!-- 编辑志愿者对话框 -->
        <el-dialog title="编辑志愿者" :visible.sync="editDialogVisible">
          <el-form :model="editVolunteer">
            <el-form-item label="姓名">
              <el-input v-model="editVolunteer.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="editVolunteer.gender" placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="editVolunteer.age" placeholder="年龄"></el-input>
            </el-form-item>
            <el-form-item label="服务">
              <el-checkbox-group v-model="editVolunteer.help">
                <el-checkbox label="1">服务1</el-checkbox>
                <el-checkbox label="2">服务2</el-checkbox>
                <el-checkbox label="3">服务3</el-checkbox>
                <el-checkbox label="4">服务4</el-checkbox>
                <el-checkbox label="5">服务5</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="updateVolunteer">确认</el-button>
          </div>
        </el-dialog>

        <!-- 数据表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="志愿者姓名" width="200"></el-table-column>
          <el-table-column prop="age" label="年龄" width="150"></el-table-column>
          <el-table-column prop="gender" label="性别" width="150">
            <template v-slot="scope">
              {{ scope.row.gender == 1 ? "男" : "女" }}
            </template>
          </el-table-column>
          <el-table-column prop="volunteerId" label="编号" width="200"></el-table-column>
          <el-table-column prop="comeDate" label="入职日期" width="230"></el-table-column>
          <el-table-column prop="help" label="服务" width="230"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button type="primary" size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteVolunteer(scope.row.volunteerId)">删除</el-button>
            </template>
          </el-table-column>
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
        name: '',
        age: '',
        gender: '',
        volunteerId: '',
        comeDate: [],
      },
      addDialogVisible: false,
      editDialogVisible: false,
      newVolunteer: {
        name: '',
        gender: '',
        age: '',
        volunteerId: '',
        help: [],
      },
      editVolunteer: {
        id: null,
        name: '',
        gender: '',
        age: '',
        help: [],
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
      axios.get("http://localhost:8080/volunteer", {
        headers: { 'Accept': 'application/json' },
        params: {
          page: this.currentPage,
          pagesize: this.pageSize,
          name: this.searchForm.name,
          age: this.searchForm.age,
          gender: this.searchForm.gender,
          volunteerId: this.searchForm.volunteerId,
          begin: this.searchForm.comeDate[0] ? this.searchForm.comeDate[0].toISOString().split('T')[0] : null,
          end: this.searchForm.comeDate[1] ? this.searchForm.comeDate[1].toISOString().split('T')[0] : null,
        },
      }).then(resp => {
        this.tableData = resp.data.rows;
        this.total = resp.data.page;
      }).catch(error => {
        console.error("Error fetching data:", error);
      });
    },
    openAddDialog() {
      this.addDialogVisible = true;
    },
    addVolunteer() {
      const helpString = this.newVolunteer.help.join('');
      const payload = {
        ...this.newVolunteer,
        help: helpString,
      };

      axios.post("http://localhost:8080/volunteer", payload, {
        headers: { 'Content-Type': 'application/json' },
      }).then(() => {
        this.addDialogVisible = false;
        this.fetchData();
      }).catch(error => {
        console.error("Error adding volunteer:", error);
      });
    },
    openEditDialog(row) {
      this.editVolunteer = { ...row, help: row.help.split('') };
      this.editDialogVisible = true;
    },
    updateVolunteer() {
      const helpString = this.editVolunteer.help.join('');
      const payload = {
        ...this.editVolunteer,
        help: helpString,
      };

      axios.put(`http://localhost:8080/volunteer`, payload, {
        headers: { 'Content-Type': 'application/json' },
      }).then(() => {
        this.editDialogVisible = false;
        this.fetchData();
      }).catch(error => {
        console.error("Error updating volunteer:", error);
      });
    },
    deleteVolunteer(volunteerId) {
      this.$confirm('确认删除该志愿者信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        axios.delete(`http://localhost:8080/volunteer/${volunteerId}`, {
          headers: { 'Content-Type': 'application/json' },
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功',
          });
          this.fetchData();
        }).catch(error => {
          console.error("Error deleting volunteer:", error);
          this.$message({
            type: 'error',
            message: '删除失败',
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
  .no-underline {
      text-decoration: none;
      color: #000;
  }
</style>
