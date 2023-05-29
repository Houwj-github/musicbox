<template>
    <div>
        <!-- 上传歌曲 -->
        <el-upload
            ref="upload"
            class="upload-demo"
            action="http://124.70.195.38:8000/compose/music"
            :on-change="handleChange"
            name="songFile"
            :on-success="successUpload"
            :headers="uploadHeaders" style="margin-left: 50px;">
            <el-button size="small" type="primary" round icon="el-icon-upload">上传歌曲</el-button>
        </el-upload>

      <!-- 表格 -->
      <div id="table" style="margin-top: 10px;">
        <el-table
            :data="tableData"
            style="width: 100%">
           <el-table-column type="index" width="60" align="center"> </el-table-column>
         <!-- <el-table-column prop="id" label="编号" width="60" align="center"> </el-table-column> -->
          <el-table-column prop="coverPicture" label="封面" width="180"> 
            <!-- <el-image :src="coverPicture" fit="contain"></el-image> -->
          </el-table-column>
          <el-table-column prop="songName" label="歌曲名" width="250"> </el-table-column>
          <el-table-column prop="singerName" label="歌手名" width="120"> </el-table-column>
          <el-table-column prop="classification" label="分类" width="120"> </el-table-column>
          <el-table-column prop="language" label="语言" width="120"> </el-table-column>
          <el-table-column prop="isVip" label="需要vip" width="80"> </el-table-column>
          <el-table-column prop="issueTime" label="发布时间"> </el-table-column>
          <el-table-column label="操作" width="200">
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
        <el-dialog title="编辑歌曲" :visible.sync="editDialogVisible" width="50%">
          <el-row>
            <el-col :span="12">
              <el-form label-position="right" label-width="80px">
                <el-form-item label="歌曲名"> <el-input v-model="formData.songName"> </el-input> </el-form-item>
                <el-form-item label="歌手名"> <el-input v-model="formData.singerName"> </el-input> </el-form-item>
                <el-form-item label="分类"> <el-input v-model="formData.classification"> </el-input> </el-form-item>
                <el-form-item label="语言"> <el-input v-model="formData.language"> </el-input> </el-form-item>
                <el-form-item label="需要vip"> <el-input v-model="formData.isVip"> </el-input> </el-form-item>
                <el-form-item label="发布时间"> <el-input v-model="formData.issueTime"> </el-input> </el-form-item>
              </el-form>
            </el-col>
              <el-col :span="12" >
                <el-upload
                      ref="upload"
                      class="avatar-uploader"
                      :action="url"
                      :limit="1"
                      :auto-upload="false"
                      name="songCoverFile"
                      :headers="uploadHeaders"  style="margin-left: 100px;">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div class="coverfont"  style="margin-left: 170px;">
                      <label>上传封面</label>
                  </div>
              </el-col>
            </el-row>
          
  
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
        imageUrl:'',
        url:"",
        uploadHeaders:{"token":localStorage.getItem('token')},          //token
        fileList:[],
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
        successUpload(){
            this.$message({
                    type: 'success',
                    message: '歌曲上传成功!'
                });
            this.fetchData();
        },
        handleRemove(file) {
        console.log(file);
      },
        beforeSongUpload(file){
            this.$confirm('确认要上传？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                return true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消!'
                });   
                this.handleRemove(file)
            return false;
        });
    },
        handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
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
            // this.tableData=this.coverPictureHandler(this.tableData)
          }
          else
            this.$message.error(response.message)
        })
      },
  
      // 打开修改框
      edit(id) {
        this.editDialogVisible = true
        this.formData.id = id;
        this.url="http://124.70.195.38:8000/compose/cover?songID="+this.formData.id
      },
  
      // 确认修改
      editConfirm() {
        console.log(this.url)
        this.$refs.upload.submit();
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
      coverPictureHandler(item)
        {
        for(var i=0;i<item.length;i++)
            {
                const spliceLength2 = item[i].coverPicture.lastIndexOf("/");
                item[i].coverPicture="http://124.70.195.38:8000/menu-cover/"+item[i].coverPicture.slice(spliceLength2 + 1);
                console.log(item[i].coverPicture)
            }
        return item;
        },
        uploadSong(){

        }
    }
  }
  </script>

  <style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>