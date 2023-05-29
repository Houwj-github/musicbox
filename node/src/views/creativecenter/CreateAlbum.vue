<template>
    <div style="margin:10px 200px;">

        <!-- 制作专辑 -->
        <el-button icon="el-icon-folder-add" style="margin-bottom: 20px;margin-left: 100px;" size="mini" round @click="createAlbum">制作专辑</el-button>

        
        
        <!-- 歌单 -->
        <div class="play-list-constainer"  v-if="this.total!==0">
            <li class="play-list" v-for="(item,index) in playLists" v-bind:key="index">
                <div v-if="item.authority!==-1">
                    <el-image style="width: 120px; height: 120px;border-radius: 50%;" :src="item.coverPicture" ></el-image>
                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <span style="flex-grow: 1;line-height: 50px;margin-left: 50px;">{{ item.menuName }}</span>
                        <i class="el-icon-edit-outline" style="margin-right: 20px;" @click="modifyPlayList(index)"></i>
                        <i class="el-icon-delete" style="margin-right: 20px;" @click="deletePlayList(index)"></i>
                    </div>
                </div>
            </li>
        </div>

        <!-- 空状态 -->
        <div style="display: flex;justify-content: center;" v-else>
            <el-image :src="nullImage" style="width: 400px; height: 400px" fit="contain"></el-image>
        </div>
        <!-- 分页组件 -->
        <div id="pagination" style="margin-left: 350px; bottom: 80px;position: fixed;" v-if="this.total!==0">
            <el-pagination  layout="total,  prev, pager, next, jumper" :total="total" :current-page.sync="pageNumber" 
            :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" background></el-pagination>
        </div>

        <!-- 创建和修改专辑信息弹窗 -->
        <el-dialog :title="titleData" :visible.sync="dialogVisible" width="50%">
            <el-tabs>
                <el-tab-pane label="专辑信息">
                    <el-form ref="form" :model="form" label-width="80px">
                    <el-row>
                        <el-col :span="12">
                            <div class='b' >
                                <el-form-item label="专辑名称">
                                    <el-input v-model="form.menuName" style="width:100%"></el-input>
                                </el-form-item>
                                <el-form-item label="专辑权限">
                                    <el-radio-group v-model="form.authority">
                                        <el-radio :label="0">公开</el-radio>
                                        <el-radio :label="1">私有</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="发行公司">
                                    <el-input v-model="form.issueCompany" style="width:100%"></el-input>
                                </el-form-item>
                                    <el-form-item label="专辑简介">
                                    <el-input type="textarea" v-model="form.albumIntroduction"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12"  v-if="titleData!=='制作专辑'">
                            <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                :action="url"
                                :limit="1"
                                :auto-upload="false"
                                name="songMenuCoverFile"
                                accept=".jpg,.png"
                                :headers="uploadHeaders"
                                style="width:50%;margin:auto">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            <div class="coverfont">
                                <label>上传封面</label>
                            </div>
                        </el-col>
                    </el-row>
                        
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="选择歌曲">
                    <el-checkbox-group v-model="form.songList" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="item in songCreatedList" :label="item" :key="item.id" style="width:100%;margin:10px;" >{{item.songName}}</el-checkbox>
                    </el-checkbox-group>
                    <el-pagination layout="prev, pager, next" :total="songCreatedSum" :current-page.sync="pageNumberDialog" 
                    :page-size="pageSizeDialog"  @current-change="handleCurrentChangeDialog" :hide-on-single-page='true'></el-pagination>
                </el-tab-pane>
               
            </el-tabs>
           
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false;">取 消</el-button>
                        <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {menuMyPageAlbumAPI,composeAlbum,delMyMenu,modifyComposeAlbum,getUploadSongAPI,composeAlbumDel} from '@/request/api'

export default{
    data(){
        return{
            url:'',
            imageUrl: '',
            songMenuCoverFile:[],
            upload:false,
            uploadHeaders:{"token":localStorage.getItem('token')},          //token
            playLists:[],
            total: 0,
            pageNumber: 1,
            pageSize: 6,

            checkList:'',
            titleData:'',
            dialogVisible: false,                                       //弹出框
            imagePath:require("@/assets/images/playList-Image.png"),
            nullImage:require("@/assets/images/null-image.png"),           //空状态图片

          form:{
                authority: 0,
                id: "",
                albumIntroduction: "",
                menuName: "",
                songList:[],
                issueCompany:'',
            },

            sellectCreatedList:[],
            songCreatedList:[],
          //弹出框所需数据
            songCreatedSum:0,                                            //收藏的歌单的数量
            pageSizeDialog:5,
            pageNumberDialog:1
        }
    },
    methods:{
        handleCurrentChangeDialog(val){
            this.pageNumberDialog = val
            this.getCollectPlayLsits();
        },
        // 改变每页大小
    handleSizeChange(val) {
      this.pageSize = val
      this.getMyMenu()
    },

    // 改变当前页号
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getMyMenu()
    },
        //删除收藏歌单
        deletePlayList(index){
            console.log(index)
            this.$confirm('确认要删除此专辑？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                composeAlbumDel(this.playLists[index].id).then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getMyMenu()
                    }
                    else
                        this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });          
        });
        },
        //去歌单展开界面
        goMenuInfo(id){
                console.log(id)
                this.$router.push({path: '/main/mymenu?song_menu_id='+id});
        },
        // 修改歌单界面
        modifyPlayList(index){
            console.log(index)
            this.url="http://124.70.195.38:8000/menu/my/cover?songMenuId="+this.playLists[index].id
            console.log(this.url)
            console.log(index)
            this.titleData="修改专辑信息";
            this.form.authority=this.playLists[index].authority
            this.form.id=this.playLists[index].id
            this.form.menuName=this.playLists[index].menuName
            this.form.albumIntroduction=this.playLists[index].albumIntroduction
            this.form.songList=this.playLists[index].songList
            this.dialogVisible=true;
            this.getUploadSong();
        },
        // 新建歌单
        createAlbum(){
            this.dialogVisible=true;
            //清空表单信息
            this.form.authority=0;
            this.form.albumIntroduction='';
            this.form.menuName='';
            this.form.issueCompany='',
            this.titleData="制作专辑";
            this.form.songList=[];
            this.getUploadSong();
        },

        onSubmit(){
            this.handleClose();
        },
        handleClose(done) {
        this.$confirm('确认提交？').then(_ => {
            if(this.titleData=='制作专辑'){
                console.log(this.form.songLists)
                composeAlbum({
                    authority: this.form.authority,
                    albumIntroduction: this.form.albumIntroduction,
                    menuName: this.form.menuName,
                    issueCompany:this.form.issueCompany,
                    songList:this.form.songList,
                }).then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getMyMenu()
                    }
                    else
                        this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                })
            }
            else{
            this.$refs.upload.submit();
                modifyComposeAlbum({
                    id: this.form.id,
                    authority: this.form.authority,
                    albumIntroduction: this.form.albumIntroduction,
                    menuName: this.form.menuName,
                    issueCompany:this.form.issueCompany,
                    songList:this.form.songList,
                }).then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getMyMenu();
                        this.url='';
                    }
                    else
                        this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                })
            }
        }).catch(_ => {});
          this.dialogVisible = false;
          this.imageUrl='';
      },
       //初始化收藏歌单界面
      getMyMenu(){
        menuMyPageAlbumAPI({
                currentPage:this.pageNumber,
                pageSize:this.pageSize
            }).then(res =>{
                if(res.success==true)
                {
                    this.total = res.data.album_page.total
                    this.playLists=res.data.album_page.records
                    console.log(this.playLists)
                    console.log(this.total)
                    this.playLists=this.coverPictureHandler(this.playLists)
                }
                else
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
            })
            
       },
       coverPictureHandler(item)
        {
            if(item!==null)
            {
                for(var i=0;i<item.length;i++)
                            {
                                const spliceLength2 = item[i].coverPicture.lastIndexOf("/");
                                item[i].coverPicture="http://124.70.195.38:8000/menu-cover/"+item[i].coverPicture.slice(spliceLength2 + 1);
                                console.log(item[i].coverPicture)
                            }
                return item;
            }
            
        },

        getUploadSong(){
            getUploadSongAPI({
                pageNum:this.pageNumberDialog,
                pageSize:this.pageSizeDialog,
            }).then(res =>{
                    if(res.success==true)
                    {
                        this.songCreatedSum=res.data.song_page.total;
                        this.songCreatedList=res.data.song_page.records
                        console.log(this.songCreatedList)
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
       },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        return isJPG;
      },
      handleCheckedCitiesChange(value){
        console.log(value)
      }
    },
   

    created(){
        this.getMyMenu()
    }
}
</script>

<style lang="less" scoped>

.play-list-constainer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  flex-flow: row wrap;
}
.play-list{
  display: flex;
  flex-direction: column;
  text-align: center;
  width:30%;
  height:150px;
  margin: 20px 10px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: 153px;
    height:100px;
    margin-left: 30px;
  }
  img:hover{
    opacity: 0.7;
  }
}
.el-icon-delete:hover{
    color: red;
}
.el-icon-edit-outline:hover {
    color: #409EFF;
}
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
  .coverfont{
    display: flex;
    justify-content: center;
    margin-top:10px;
  }
</style>