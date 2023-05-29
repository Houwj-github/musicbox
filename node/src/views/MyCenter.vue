<!-- 个人中心 -->
<template>
    <div>
        <div class="container">
            <div class="background-image">
                <!-- 头像 -->
                <div style="display: flex;flex-direction: row;align-items: baseline;margin-top: 15%;justify-content: center;">
                    <el-avatar :size="80" :src="user.avatar" ></el-avatar>
                    <i class="el-icon-edit" @click="dialogVisible = true" style="margin-left: 5px;"></i>
                </div>

                <!-- 用户昵称 性别 vip 创作者 -->
                <div style="margin-left: 46%;display: flex;flex-direction: row;align-items: center;">
                    <span style="margin-right: 30px;color:#409EFF;width:100px;display: flex;justify-content: center;">{{user.nickname}}</span>
                    <i :class="this.user.gender=='f'?'el-icon-female':'el-icon-male'"  style="margin-right: 30px;"></i>
                    <div class="vip-layout" :class="{bg:user.isVip}" @click="upgradeVip">VIP</div>

                    <div class="creator-layout" :class="{creator:user.isCreator}">
                        <i class="el-icon-headset" style="font-weight: 800;"></i>
                        <span style="margin-left: 5px;" @click="upgradeCreator">创作者</span>
                    </div>  
                </div>

                <!-- 地区 生日 职业 -->
                <div style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
                    <i class="el-icon-location"></i>
                    <span style="margin-right: 30px;width:80px">{{ user.region }}</span>
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-right: 30px;width:100px">{{ user.birthday }}</span>
                    <i class="el-icon-s-custom"></i>
                    <span style="margin-right: 30px;width:50px">{{ user.profession }}</span>

                    <el-tooltip class="item" effect="dark" content=user.downloadFile placement="right" slot="content">
                        
                    </el-tooltip>

                    <el-popover placement="right" trigger="hover">
                        <span >{{ user.localDownloadingDirectory }}</span>
                        <el-button style="background-color: rgba(255, 255, 255, 0);border: none;" slot="reference" >
                            <i class="el-icon-folder-opened"></i>下载目录
                        </el-button>  
                    </el-popover>
                </div>

                <!-- 个性签名 -->
                <div style="display: flex;justify-content: center;"> {{ user.signature }} </div>
            </div>
        </div>

        <!-- 修改个人信息的弹窗 -->
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="50%" >

            <el-form ref="form" :model="form" label-width="80px">
                <div style="display:flex;flex-direction: row;align-items: center;">
                    <div class='b' >
                        <el-form-item label="用户昵称">
                            <el-input v-model="form.nickname" style="width:100%" :placeholder="user.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="所在地区">
                            <el-input v-model="form.region" style="width:100%" :placeholder="user.region"></el-input>
                        </el-form-item>
                        <el-form-item label="性别选择">
                            <el-radio-group v-model="form.gender">
                                <el-radio label="m">男</el-radio>
                                <el-radio label="f">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="职业选择">
                            <el-select v-model="form.profession" :placeholder="user.profession" style="width: 50%;">
                                <el-option v-for="item in professionOptions" :key="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期">
                            <el-date-picker type="date"  v-model="form.birthday" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="display:flex;flex-direction: column;align-items: center;margin: auto;">
                            <!-- <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
                            <div class="uploadcover-container" @click="handleClick">
                                <span v-if="!form.avatar" style="font-size:50px;color:rgba(54, 148, 255,0.8)">+</span>
                                <img :src="form.avatar" v-else>
                            </div> -->
                            <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                action="http://124.70.195.38:8000/user/avatar"
                                :headers="uploadHeaders"
                                name="avatarFile"
                                :auto-upload="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                        <div class="coverfont">
                            <label>上传头像</label>
                        </div>
                    </div>
                </div>
            <el-form-item label="下载目录">
                <label for="folder-selector" class="file_upload" >
                    <i class="el-icon-folder-opened"></i>
                </label>
                
                <input type="file" id="folder-selector"  style="display: none" @change="handleFolderSelect" webkitdirectory>
                <span>{{ form.localDownloadingDirectory }}</span>

            </el-form-item>
            <el-form-item label="个性签名">
                <el-input type="textarea" v-model="form.signature" :placeholder="user.signature"></el-input>
            </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>  
        </el-dialog>
        
        <!-- <div style="margin:100px 200px;">数据统计</div> -->
        <!-- <el-image :src="src" style="margin:auto -100px;z-index: -1;"></el-image> -->

        
    </div>
    

    
</template>

<script>
import { modifyUserInfoAPI } from '@/request/api';       //导入API接口
import { getUserInfoAPI,upgradeVipAPI,upgradeCreatorAPI ,userAvaterAPI} from '@/request/api';       //导入API接口
import {songPlayAPI} from '@/request/api'

export default{

    data(){
        
        return{
            uploadHeaders:{"token":localStorage.getItem('token')},          //token
            imageUrl:'',
            dialogVisible: false,   //弹出框
            username:'',           //账号
            user:{
                id:'',
                avatar:'',              //头像
                nickname:'',
                gender:'',
                isVip: null,
                isCreator:null,
                region:"",
                birthday:"",
                profession:'',
                localDownloadingDirectory:'',
                signature:'',
                createTime:'',
                updateTime:'',
                status: 0,
            },
            form: {
                id:'',
                avatar:'',              //头像
                nickname:'',
                gender:'',
                isVip: null,
                isCreator:null,
                region:"",
                birthday:"",
                profession:'',
                localDownloadingDirectory:'',
                signature:'',
                createTime:'',
                updateTime:'',
                status: 0,
            },
            professionOptions: [{
                    value: '学生',
                    }, {
                    value: '教师',
                    }, {
                    value: '工人',
                    }, {
                    value: '军人',

                }],
            src: require("../assets/images/my-center-backgound.jpg"),
            birthdayFlag:'',
        }
    },
    
    methods:{
        handleClose(done) {
        this.$confirm('确认提交？')
          .then(_ => {
            // this.form.updateTime=new Date();
            // this.form.updateTime=this.dateToStr(this.form.updateTime,'yyyy-MM-dd hh:mm:ss');
            
            if(this.birthdayFlag!=this.form.birthday)
            {
                this.form.birthday=this.dateToStr(this.form.birthday,'yyyy-MM-dd hh:mm:ss');
                this.form.birthday=this.form.birthday.slice(0, 10);
            }
            console.log(this.user.birthday)
            console.log(this.form.birthday)
            console.log(this.form.gender);
            this.$refs.upload.submit();

            modifyUserInfoAPI({                    
                id:this.form.id,
                avatar:this.form.avatar,              //头像
                nickname:this.form.nickname,
                gender:this.form.gender,
                isVip: this.form.isVip,
                isCreator: this.form.isCreator,
                region:this.form.region,
                birthday:this.form.birthday,
                profession:this.form.profession,
                localDownloadingDirectory:this.form.localDownloadingDirectory,
                signature:this.form.signature,
                createTime:this.form.createTime,
                updateTime:this.form.updateTime,
                status:this.form.status,
            }).then(res => 
            {
                console.log(res)
                //修改成功
                if(res.data.success)
                {
                    this.user=this.form;
                    this.birthdayFlag=this.user.birthday;
                    this.$message({
                    message: '修改成功！',
                    type: 'success'
                    });
                }
                else
                {
                    this.form=this.user;
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            }) 
            done();
            })
          .catch(_ => {
            
          });
          this.dialogVisible = false;
      },
       // 导入头像
       handleClick() {
            // 模拟点击上传按钮
            this.$refs.fileInput.click()
        },
        handleFileChange(e) {
            const file = e.target.files[0]
            if (!file) {
                return
            }
            // 读取图片文件
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.avatar = reader.result
            }
        },
        onSubmit(){
            this.handleClose();
        },
        handleFolderSelect(e){
        const file = e.target.files[0]
        this.form.localDownloadingDirectory=file;
        },


         //获取用户信息
       getUserInfo(){
        //获取用户自己的信息
        getUserInfoAPI({}).then(res => 
            {
            console.log(res)
            if(res.success)
            {
                 this.user=res.data.detailed_info;
                 this.form=res.data.detailed_info;
                 this.username=res.data._username;
                 if( this.user.birthday!=null)
                    this.user.birthday=this.user.birthday.slice(0, 10);
                const spliceLength2 = this.user.avatar.lastIndexOf("/");
                this.user.avatar="http://124.70.195.38:8000/avatar/"+this.user.avatar.slice(spliceLength2 + 1);
                console.log(this.user.avatar)
                 this.birthdayFlag=this.user.birthday;
                 console.log(this.birthdayFlag)
                 console.log(this.form)
            }
            else
            {
                this.$message({
                message: res.data.message,
                type: 'warning'
                });
            }
        });
        
       },
    dateToStr(date,fmt){
        var o = { 
            "M+" : date.getMonth()+1,                 //月份 
            "d+" : date.getDate(),                    //日 
            "h+" : date.getHours(),                   //小时 
            "m+" : date.getMinutes(),                 //分 
            "s+" : date.getSeconds(),                 //秒 
            "q+" : Math.floor((date.getMonth()+3)/3), //季度 
            "S"  : date.getMilliseconds()             //毫秒 
        }; 
        //(y+)匹配多个y，比如yyyy
        if(/(y+)/.test(fmt)) {
            // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
    return fmt;
   },
   //成为创作者
   upgradeCreator(){
    this.$confirm('确认要升级成为创作者？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
        upgradeCreatorAPI({}).then(res => 
            {
                console.log(res)
                if(res.data.success)
                {
                    this.$message({
                        type: 'success',
                        message: '升级成功!'
                    });
                    this.user.isCreator=true;
                }
                else
                {
                    this.$message({
                    message: res.data.message,
                    type: 'warning'
                    });
                }
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });          
        });
   },
   //成为vip
   upgradeVip(){
    this.$confirm('确认要升级成为VIP？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
        upgradeVipAPI({}).then(res => 
            {
                console.log(res)
                if(res.data.success)
                {
                    this.$message({
                        type: 'success',
                        message: '升级成功!'
                    });
                    this.user.isVip=true;
                }
                else
                {
                    this.$message({
                    message: res.data.message,
                    type: 'warning'
                    });
                }
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });          
        });
     },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        return isJPG ;
        
      }
    },
    created(){
        this.getUserInfo();
    },
}



</script>

<style lang="less" scoped>
.container{
  width:1519px;
  height:650px;
  margin-left: -100px;
  margin-right: -100px;
}
.background-image{
  background:url("../assets/images/background.jpg");
  width:100%;
  height:100%;;
  background-size:100% 100%;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 50px;
}

.el-icon-edit:hover {
    color: #409EFF;
}
.el-icon-folder-opened:hover{
    color: #409EFF;
}
.el-icon-female{
    color:#F274BA;
    font-weight: 800;
}
.el-icon-male{
    color:#409EFF;
    font-weight: 800;
}
.vip-layout{
    height:18px;
    width:50px;
    border-radius: 10px;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-small;
    background-color:gray;
    margin-right: 30px;
}
.bg{
    background-color:#FF5733;
}
.creator-layout{
    font-size:small;
    font-weight: 800;
    color:gray;
}

.creator{
    color:#FF5733;
}


.file_upload{
    border-radius: none;
}
.file_upload:hover{
    border-color:#333;
}
.uploadcover-container {
  margin:auto 50px;
  width: 200px;
  height: 250px;
  border: 1px dashed #ccc;
  border-radius: 15px;
  background:rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.uploadcover-container img {
  max-width: 100%;
  max-height: 100%;
}
.coverfont{
    margin:10px auto;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
}
.uploadbutton{
    width:150px;
    height:50px;
    margin:auto 300px;
    background-color: rgb(24, 144, 255);
    border: 1px solid #ccc;
    border-radius:20px;
    color:white;
    font-size:23px;
}
.uploadbutton:hover{
    border-color:#333;
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
</style>