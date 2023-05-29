<!-- 创建的歌单 -->
<template>
    <div style="margin:10px 200px;">

        <!-- 新建歌单 -->
        <el-button icon="el-icon-folder-add" style="margin-bottom: 20px;margin-left: 100px;" size="mini" round @click="inserPlayList">新建</el-button>

        
        
        <!-- 歌单 -->
        <div class="play-list-constainer"  v-if="this.total!==0">
            <li class="play-list" v-for="(item,index) in playLists" v-bind:key="index">
                <div v-if="item.authority!==-1">
                    <!-- <img :src="item.coverPicture" @click="goMenuInfo(item.id)"/> -->
                    <el-image style="width: 153px; height: 100px;border-radius: 20px;" :src="item.coverPicture" fit="cover" @click="goMenuInfo(item.id)"></el-image>
                    
                    <!-- <el-avatar shape="square" :size="100" :src="item.coverPicture"></el-avatar> -->
                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <span style="flex-grow: 1;line-height: 50px;">{{ item.menuName }}</span>
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

        <!-- 修改个人信息的弹窗 -->
        <el-dialog :title="titleData" :visible.sync="dialogVisible" width="50%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <div class='b' >
                            <el-form-item label="歌单名称">
                                <el-input v-model="form.menuName" style="width:100%"></el-input>
                            </el-form-item>
                            <el-form-item label="歌单权限">
                                <el-radio-group v-model="form.authority">
                                <el-radio :label="0">公开</el-radio>
                                <el-radio :label="1">私有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                                <el-form-item label="歌单简介">
                                <el-input type="textarea" v-model="form.menuIntroduction"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12" v-if="titleData==='修改歌单'">
                        <el-upload
                            ref="upload"
                            class="avatar-uploader"
                            :action="url"
                            :limit="1"
                            :auto-upload="false"
                            name="songMenuCoverFile"
                            accept=".jpg,.png"
                            :headers="uploadHeaders"
                            style=" border: 1px dashed #ccc;width:50%;margin:auto">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        <div class="coverfont">
                            <label>上传封面</label>
                        </div>
                    </el-col>
                </el-row>
                    
            </el-form>
            <span slot="footer" class="dialog-footer">
         
                <el-button @click="dialogVisible = false;">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>  
        </el-dialog>
    </div>
</template>

<script>
import {modifyMenuAPI,menuMyPageAPI,insertMenuAPI,delMyMenu,menuMyCoverAPI} from '@/request/api'

export default{
    data(){
        return{
            imageUrl: '',
            songMenuCoverFile:[],
            upload:false,
            uploadHeaders:{"token":localStorage.getItem('token')},          //token
            playLists:[],
            total: 0,
            pageNumber: 1,
            pageSize: 6,

            titleData:'',
            dialogVisible: false,                                       //弹出框
            imagePath:require("@/assets/images/playList-Image.png"),
            nullImage:require("@/assets/images/null-image.png"),           //空状态图片

          form:{
            authority: 0,
            id: "",
            menuIntroduction: "",
            menuName: "",
            },
        }
    },
    methods:{
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
            this.$confirm('确认要删除此歌单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delMyMenu(this.playLists[index].id).then(res =>{
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
            this.url="http://124.70.195.38:8000/menu/my/cover?songMenuId="+this.playLists[index].id
            console.log(index)
            this.titleData="修改歌单";
            this.form.authority=this.playLists[index].authority
            this.form.id=this.playLists[index].id
            this.form.menuName=this.playLists[index].menuName
            this.form.menuIntroduction=this.playLists[index].menuIntroduction
            this.dialogVisible=true;
        },
        // 新建歌单
        inserPlayList(){
            this.dialogVisible=true;
            //清空表单信息
            this.form.authority=0;
            this.form.menuIntroduction='';
            this.form.menuName='';
            this.titleData="新建歌单";
        },

        onSubmit(){
            this.handleClose();
        },
        handleClose(done) {
        this.$confirm('确认提交？').then(_ => {
            if(this.titleData=='新建歌单'){
                insertMenuAPI({
                    authority: this.form.authority,
                    isAlbum: false,
                    menuIntroduction: this.form.menuIntroduction,
                    menuName: this.form.menuName,
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
                modifyMenuAPI({
                    id: this.form.id,
                    authority: this.form.authority,
                    menuIntroduction: this.form.menuIntroduction,
                    menuName: this.form.menuName,
                }).then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getMyMenu()
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
      async getMyMenu(){
        menuMyPageAPI({
                currentPage:this.pageNumber,
                pageSize:this.pageSize
            }).then(res =>{
                if(res.success==true)
                {
                    this.total = res.data.song_menu_page.total
                    this.playLists=res.data.song_menu_page.records
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
        for(var i=0;i<item.length;i++)
                        {
                            const spliceLength2 = item[i].coverPicture.lastIndexOf("/");
                            item[i].coverPicture="http://124.70.195.38:8000/menu-cover/"+item[i].coverPicture.slice(spliceLength2 + 1);
                            console.log(item[i].coverPicture)
                        }
        return item;
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