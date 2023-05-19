<template>
  <div>
    <el-descriptions title="用户信息" border>
      <el-descriptions-item label="id">{{userTableData.id}}</el-descriptions-item>
      <el-descriptions-item label="用户">{{userTableData.nickname}} </el-descriptions-item>
      <el-descriptions-item label="性别">{{userTableData.gender}} </el-descriptions-item>
      <el-descriptions-item label="地区">{{userTableData.region}} </el-descriptions-item>
      <el-descriptions-item label="职业">{{userTableData.profession}} </el-descriptions-item>
      <el-descriptions-item label="创作者">{{userTableData.isCreator}} </el-descriptions-item>
      <el-descriptions-item label="vip"> {{userTableData.isVip}}</el-descriptions-item>
      <el-descriptions-item label="个性签名">{{userTableData.signature}} </el-descriptions-item>
    </el-descriptions>
    <br/>
    <el-button type="primary" icon="el-icon-delete" @click="$router.back()">返回上一页面</el-button>
    <el-button type="success" icon="el-icon-refresh" @click="refresh()">刷新</el-button>
    <el-button type="warn" icon="el-icon-s-promotion" @click="openReplyDialog()">回复</el-button>

    <div id="table" style="margin-top: 10px;">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column type="index" width="60" align="center"> </el-table-column>
        <el-table-column label="发送/接收" width="120">
          <template slot-scope="scope">
            <el-button size="small" type="success" v-if="scope.row.receiverId === userId" plain>发送</el-button>
            <el-button size="small" type="warning" v-if="scope.row.receiverId !== userId" plain>接收</el-button>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="id" label="编号" width="60" align="center"> </el-table-column>-->

        <el-table-column prop="chatContent" label="内容" width=700> </el-table-column>
        <el-table-column prop="createTime" label="发送时间" width="180"> </el-table-column>
        <el-table-column prop="isAdministratorInvolved" label="来自管理员" width="100"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="removeHistory(scope.row.id)"> 删除记录 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 关注框 -->
    <div id="followDialog">
      <el-dialog title="发送信息" :visible.sync="chatDialogVisible" width="50%">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="消息内容"> <el-input v-model="formData.content"> </el-input> </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="chatDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reply()">确 定</el-button>
        </span>
      </el-dialog>
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
import {getUserInfoById, getChatByUser, delOneChatMessage, postOneChatMessage} from '@/request/api'

export default {
  data() {
    return {
      userTableData: [],
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 5,

      userId: 0,
      chatDialogVisible: false,

      formData: {} // 表单数据
    }
  },
  created() {
    this.fetchUserData()
    this.fetchData()

  },
  methods: {
    // 改变每页大小
    handleSizeChange(val) {
      this.pageNumber = val
      this.fetchData()
    },

    // 改变当前页号
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },

    fetchUserData() {
      this.userId = this.$route.query.userId
      const params = {
        currentPage: this.pageNumber,
        pageSize: this.pageSize,
      }
      getUserInfoById(params, this.$route.query.userId).then(response => {
        if (response.success === true) {
          this.userTableData = response.data.public_info
        }
        else {
          this.$message.error(response.message)
          this.editDialogVisible = false
        }
      })
    },

    // 获取全部数据
    fetchData() {
      const params = {
        currentPage: this.pageNumber,
        pageSize: this.pageSize,
      }
      getChatByUser(params, this.userId).then(response => {
        if (response.success === true) {
          this.tableData = response.data.page.records
          this.total = response.data.page.total
        }
        else
          this.$message.error(response.message)
      })
    },

    // 刷新
    refresh() {
      this.fetchData()
      this.fetchUserData()
      this.$message.success('刷新成功')
    },

    // 移除聊天记录
    removeHistory(id) {
      this.$confirm('是否永久删除这条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOneChatMessage(id).then(response => {
          if (response.data.success === true)
            this.$message.success(response.data.message)
          else
            this.$message.error(response.data.message)
          this.fetchData()
          this.fetchUserData()
        })
      }).catch(() => {
        this.$message.info('取消删除记录');
      });
    },

    openReplyDialog() {
      this.formData = {}
      this.chatDialogVisible = true;
    },

    reply() {
      const params = {
        receiverId: this.userId,
        chatContent: this.formData.content,
      }
      postOneChatMessage(params).then(response => {
        if (response.data.success === true) {
          this.$message.success(response.data.message);
        }
        else
          this.$message.error(response.data.message)
      }).finally(()=>{
            this.fetchData()
            this.fetchUserData()
            this.chatDialogVisible = false;
      })
    }

  }
}
</script>