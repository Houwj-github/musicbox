<template>
  <div>
    <!-- 表格 -->
    <div id="table" style="margin-top: 10px;">
      <el-table
          :data="tableData"
          style="width: 100%">
         <el-table-column type="index" width="60" align="center"> </el-table-column>
<!--        <el-table-column prop="id" label="编号" width="60" align="center"> </el-table-column>-->
        <el-table-column prop="coverPicture" label="封面" width="180"> </el-table-column>
        <el-table-column prop="songName" label="歌曲名" width="250"> </el-table-column>
        <el-table-column prop="singerName" label="歌手名" width="120"> </el-table-column>
        <el-table-column prop="classification" label="分类" width="120"> </el-table-column>
        <el-table-column prop="language" label="语言" width="120"> </el-table-column>
        <el-table-column prop="isVip" label="需要vip" width="80"> </el-table-column>
        <el-table-column prop="issueTime" label="发布时间"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="edit(scope.row.id)"> 修改 </el-button>
            <el-button type="warning" size="medium" @click="remove(scope.row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
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

    <!-- 编辑框 -->
    <div id="editDialog">
      <el-dialog title="编辑书本" :visible.sync="editDialogVisible" width="30%">
        <el-form label-position="right" label-width="80px">
          <el-form-item label="歌曲名"> <el-input v-model="formData.songName"> </el-input> </el-form-item>
          <el-form-item label="歌手名"> <el-input v-model="formData.singerName"> </el-input> </el-form-item>
          <el-form-item label="分类"> <el-input v-model="formData.classification"> </el-input> </el-form-item>
          <el-form-item label="语言"> <el-input v-model="formData.language"> </el-input> </el-form-item>
          <el-form-item label="需要vip"> <el-input v-model="formData.isVip"> </el-input> </el-form-item>
          <el-form-item label="发布时间"> <el-input v-model="formData.issueTime"> </el-input> </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { getMyComposed, editMyComposed, delMyComposed} from '@/request/api'

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
        pageNum: this.pageNumber,
        pageSize: this.pageSize,
      }
      getMyComposed(params).then(response => {
        if (response.success === true) {
          this.tableData = response.data.song_page.records
          this.total = response.data.song_page.total
        }
        else
          this.$message.error(response.message)
      })
    },

    // 打开修改框
    edit(id) {
      this.editDialogVisible = true
      this.formData.id = id;
    },

    // 确认修改
    editConfirm() {
      editMyComposed(this.formData).then(response => {
        if (response.data.success === true)
          this.$message.success(response.data.message)
        else
          this.$message.error(response.data.message)
        this.fetchData()
      }).finally(
          this.editDialogVisible = false
      )
    },

    // 删除
    remove(id) {
      this.$confirm('此操作将永久删除该文件(id: ' + id + '), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMyComposed(id).then(response => {
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



<!--&lt;!&ndash; 我的创作 &ndash;&gt;-->
<!--<template>-->
<!--    <div class='a'>-->
<!--        <table class="table_0">-->
<!--            <tr style="height:50px;">-->
<!--                <td style="font-size:20px;width:110px;">歌曲名</td>-->
<!--                <td style="font-size:20px;width:110px;">歌手</td>-->
<!--                <td style="font-size:20px;width:110px;">类别</td>-->
<!--                <td style="font-size:20px;width:110px;">语言</td>-->
<!--                <td style="font-size:20px;width:110px;">时长</td>-->
<!--                <td style="font-size:20px;width:110px;">审核状态</td>-->
<!--            </tr> -->
<!--            <tr v-for="(song, index) in displayedSongs" :key="index" class="col_td">-->
<!--                <td>{{ song.name }}</td>-->
<!--                <td>{{ song.singer }}</td>-->
<!--                <td>{{ song.category }}</td>-->
<!--                <td>{{ song.language }}</td>-->
<!--                <td>{{ song.time }}</td>-->
<!--                <td :class="{ 'red': song.status === '审核中', 'blue': song.status === '已发布' }">{{ song.status }}</td>-->
<!--            </tr>-->
<!--        </table>-->
<!--        <div class="pagechoice">-->
<!--            <button @click="previousPage">上一页</button>-->
<!--            <span>{{currentPage  }}/{{ pageCount }}</span>-->
<!--            <button @click="nextPage"> 下一页</button>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--export default{-->
<!--    data(){-->
<!--        return{-->
<!--            songs: [-->
<!--            { id: 1, name: '歌曲1', singer: '歌手1', category: '流行', language: '中文',time:'3:30', status: '审核中' },-->
<!--            { id: 2, name: '歌曲2', singer: '歌手2', category: '摇滚', language: '英文',time:'3:30',  status: '已发布' },-->
<!--            { id: 3, name: '歌曲3', singer: '歌手3', category: '电子', language: '日语',time:'3:30',  status: '审核中' },-->
<!--            { id: 4, name: '歌曲4', singer: '歌手4', category: '民谣', language: '中文',time:'3:30',  status: '审核中' },-->
<!--            { id: 5, name: '歌曲5', singer: '歌手5', category: '流行', language: '英文',time:'3:30',  status: '审核中' },-->
<!--            { id: 6, name: '歌曲6', singer: '歌手6', category: '摇滚', language: '中文',time:'3:30',  status: '审核中' },-->
<!--            { id: 7, name: '歌曲7', singer: '歌手7', category: '电子', language: '英文',time:'3:30',  status: '审核中' },-->
<!--            { id: 8, name: '歌曲8', singer: '歌手8', category: '民谣', language: '中文',time:'3:30',  status: '审核中' },-->
<!--            { id: 9, name: '歌曲9', singer: '歌手9', category: '流行', language: '日语',time:'3:30',  status: '审核中' },-->
<!--            { id: 10, name: '歌曲10', singer: '歌手10', category: '摇滚', language: '英文',time:'3:30',  status: '审核中' }-->
<!--        ],-->
<!--        pageSize:10,-->
<!--        currentPage:1-->
<!--        }-->
<!--    },-->
<!--    computed:{-->
<!--        pageCount(){-->
<!--            return Math.ceil(this.songs.length/this.pageSize)-->
<!--        },-->
<!--        displayedSongs(){-->
<!--            const startIndex=(this.currentPage-1)*this.pageSize-->
<!--            const endIndex=startIndex+this.pageSize-->
<!--            return this.songs.slice(startIndex,endIndex)-->
<!--        }-->
<!--    },-->
<!--    methods:{-->
<!--        previousPage(){-->
<!--            if(this.currentPage>1){-->
<!--                this.currentPage&#45;&#45;-->
<!--            }-->
<!--        },-->
<!--        nextPage(){-->
<!--            if(this.currentPage<this.pageCount){-->
<!--                this.currentPage++-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--.a{-->
<!--    margin:0 200px;-->
<!--    padding:30px 100px;-->
<!--    height:500px;-->
<!--    border-radius: 15px;-->
<!--    // border: 1px solid #409EFF;-->
<!--    background: rgba(201, 221, 245,0.4);-->
<!--    text-align: center;-->
<!--}-->
<!--.table_0{-->
<!--    margin: auto;-->
<!--    width:90%;-->
<!--}-->
<!--.table_0 td{-->
<!--    text-align:center;-->
<!--}-->
<!--.col_td{-->
<!--    height:38px;-->
<!--}-->
<!--.col_td td{-->
<!--    width:110px;-->
<!--    font-size:15px;-->
<!--    font-family: 思源黑体;-->
<!--}-->
<!--.red{-->
<!--    color:red;-->
<!--}-->
<!--.blue{-->
<!--    color:blue;-->
<!--}-->
<!--.pagechoice{-->
<!--    position: absolute;-->
<!--    bottom: 0;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, -50%);-->
<!--}-->
<!--</style>-->