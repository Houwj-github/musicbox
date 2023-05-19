<template>
  <div>

    <div id="table" style="margin-top: 10px;">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column type="index" width="60" align="center"> </el-table-column>
        <!--        <el-table-column prop="id" label="编号" width="60" align="center"> </el-table-column>-->
        <el-table-column prop="nickname" label="用户" width="180"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="80"> </el-table-column>
        <el-table-column prop="region" label="地区" width="150"> </el-table-column>
        <el-table-column prop="signature" label="个性签名" width="320"> </el-table-column>
        <el-table-column prop="profession" label="职业" width="150"> </el-table-column>
        <el-table-column prop="isCreator" label="创作者" width="80"> </el-table-column>
        <el-table-column prop="isVip" label="vip" width="80"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="openFollowDialog(scope.row.id)"> 互相关注 </el-button>
            <el-button type="warning" size="medium" @click="chat(scope.row.id)"> 聊天 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 关注框 -->
    <div id="followDialog">
      <el-dialog title="关注用户" :visible.sync="followDialogVisible" width="30%">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="用户id"> <el-input v-model="formData.id"> </el-input> </el-form-item>
          <el-form-item label="用户名"> <el-input v-model="formData.nickname"> </el-input> </el-form-item>
          <el-form-item label="个性签名"> <el-input v-model="formData.signature"> </el-input> </el-form-item>
          <el-row>
            <el-col :span="24"><i>* 此表单仅展示用户信息，内容修改无效</i><div class="grid-content bg-purple-dark"></div></el-col>
          </el-row>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="followDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="followConfirm(id)">确 定</el-button>
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
import { getFans, followById, getUserInfoById } from '@/request/api'

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageNumber: 1,
      pageSize: 5,

      followDialogVisible: false, // 修改表单可见度

      formData: {
        id: 0,
        signature: 'default signature here',
      } // 表单数据
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
      getFans(params).then(response => {
        if (response.success === true) {
          this.tableData = response.data.pages.records
          this.total = response.data.pages.total
        }
        else
          this.$message.error(response.message)
      })
    },

    // 打开关注框
    openFollowDialog(id) {
      this.formData = {}  // 清除表单
      this.followDialogVisible = true
      getUserInfoById(null, id).then(response => {
        if (response.success === true) {
          this.formData = response.data.public_info
        }
        else {
          this.$message.error(response.message)
          this.editDialogVisible = false
        }
      })
    },

    // 确认关注
    followConfirm() {
      this.$confirm('是否关注该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        followById(null, this.formData.id).then(response => {
          if (response.data.success === true)
            this.$message.success(response.data.message)
          else
            this.$message.error(response.data.message)
          this.fetchData()
        })
      }).catch(() => {
        this.$message.info('关注取消');
      });
    },

    // 进入私信界面
    chat(id) {
      this.$router.push({
        path: '/main/chat',
        query: {
          userId: id
        }
      })
    },

  }
}
</script>