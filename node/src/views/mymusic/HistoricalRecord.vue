<template>
    <div>
      <!-- 表格 -->
      <el-button type="primary" icon="el-icon-delete" @click="delHistory">删除全部历史记录</el-button>
  
      <div id="table" style="margin-top: 10px;">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column type="index" width="60" align="center"> </el-table-column>
          <!--        <el-table-column prop="id" label="编号" width="60" align="center"> </el-table-column>-->
          <el-table-column prop="coverPicture" label="封面" width="180"> </el-table-column>
          <el-table-column prop="songName" label="歌曲名" width="180"> </el-table-column>
          <el-table-column prop="singerName" label="歌手名" width="180"> </el-table-column>
          <el-table-column prop="classification" label="分类" width="120"> </el-table-column>
          <el-table-column prop="language" label="语言" width="120"> </el-table-column>
          <el-table-column prop="issueTime" label="歌曲发布时间" width="250"> </el-table-column>
          <el-table-column prop="createTime" label="播放时间"> </el-table-column>
        </el-table>
      </div>
  
      <!-- 分页组件 -->
      <div id="pagination" style="margin-top: 15px; margin-left: 20px;">
        <el-pagination
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
        ></el-pagination>
      </div>
  
  
  
    </div>
  </template>
  
  <script>
  import { getHistory, delHistory} from '@/request/api'
  
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        pageNumber: 1,
        pageSize: 5,
  
        editDialogVisible: false, // 修改表单可见度
  
        formData: {} // 表单数据
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // 改变每页大小
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
  
      // 改变当前页号
      handleCurrentChange(val) {
        this.pageNumber = val
        this.fetchData()
      },
  
      // 获取全部数据
      fetchData() {
        const params = {
          currentPage: this.pageNumber,
          pageSize: this.pageSize,
        }
        getHistory(params).then(response => {
          if (response.success === true) {
            this.tableData = response.data.history.records
            this.total = response.data.history.total
          }
          else
            this.$message.error(response.message)
        })
      },
  
      // 删除全部日志
      delHistory() {
        this.$confirm('此操作将永久删除你的浏览记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delHistory(null).then(response => {
            if (response.data.success === true)
              this.$message.success(response.data.message)
            else
              this.$message.error(response.data.message)
            this.fetchData()
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
  
    }
  }
  </script>