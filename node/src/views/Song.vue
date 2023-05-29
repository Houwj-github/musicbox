<!-- 歌曲显示界面 -->
<template>
    <div class="song-detail">
        <div>
            <div class="song-info">
            <el-image style="width: 242px; height: 200px;border-radius: 20px;margin:30px 20px" :src="songinfo.coverPicture" fit="cover"></el-image>

                <div class="song-infodetail">
                    <div class="song-name">
                        <p style="color:#409EFF;font-size:18px;font-weight: bold;">歌曲名：</p>
                        <p>{{ songinfo.songName}} </p>
                    </div>
                    <div class="song-name">
                        <p style="color:#409EFF;font-size:18px;font-weight: bold;">歌手：</p>
                        <p>{{ songinfo.singerName}} </p>
                    </div>
                    <div class="song-name">
                        <p style="color:#409EFF;font-size:18px;font-weight: bold;">分类：</p>
                        <p>{{ songinfo.classification}} </p>
                    </div>
                    <div class="song-name">
                        <p style="color:#409EFF;font-size:18px;font-weight: bold;">状态：</p>
                        <p>{{ songinfo.status===0 ? '公开(所有人可见)' : '私有(仅自己可见)'}}</p>
                    </div>
                    <div class="song-name">
                        <p style="color:#409EFF;font-size:18px;font-weight: bold;">发行时间：</p>
                        <p>{{ songinfo.issueTime}} </p>
                    </div>
                    <p style="margin-left:300px;">创建：{{ songinfo.createTime }} </p>
                    <p style="margin-left:300px;"> 更新：{{ songinfo.updateTime }}</p>
                </div>
            </div>
            <div class="song-comments">
                <p style="font-size:20px;font-weight:bold;">全部评论</p>
                <div v-for="(comment,index) in pages.records" :key="index" >
                    <div v-if="comment.status===0" class="song-incomment">
                        <h>{{ comment.userId+":" }}</h>
                          <div class="content">
                            <p>{{ comment.commentsContent }}</p>
                            <i class="el-icon-edit" @click="editComment(index)"></i>
                            <i class="el-icon-delete" @click="deleteComment(comment.id)"></i>
                        </div>
                        <small>{{ "发布:    "+comment.createTime+"  " }}{{ "更新:    "+comment.updateTime }}</small>     
                    </div>

                </div>
            </div>
        </div>
        <div class="commentarea" style="margin-top:60px;">
            <!-- 发表评论表单 -->
            <textarea v-model="newComment" placeholder="发表评论"></textarea>
            <button @click="submitComment">提交</button>
        </div>
        <el-dialog title="修改评论" :visible.sync="dialogVisible" width="50%" >
            <el-input v-model="form.commentsContent" :placeholder="tcomment" style="width:100%;"></el-input>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>  
        </el-dialog>
    </div>    
</template>

<script>
import {getSongInfoAPI} from '@/request/api'
import {getSongCommentAPI} from '@/request/api'
import {setSongCommentAPI} from '@/request/api'
import {editSongCommentAPI} from '@/request/api'
import {delSongCommentAPI} from '@/request/api'

export default{
    data(){
        return{
            dialogVisible:false,
            src:'http://124.70.195.38:8000/cover/',
            tcomment:'',
            songinfo:{
                id:"",
                userId:"",
                isVip:"",
                fileDirectory:"",
                coverPicture:"",
                singerName:"",
                songName:"",
                status:"",
                issueTime:"",
                language:"",
                classification:"",
                createTime:"",
                updateTime:""
            },
            pages:{
                records:[]
            },
            form:{
                id:'',
                userId:'',
                songId:'',
                commentsContent:'',
                status:'',
                createTime:'',
                updateTime:'',
            },
            newComment:'',

            song_id:'',

        }
    },
    // computed:{
    //     coverUrl(){
    //         return 'http://124.70.195.38:8000/${this.songinfo.coverPicture.split('/').pop()}';
    //     }

    // },
    computed:{
        imagePath(){
            let parts = this.songinfo.coverPicture.split("/");
            let path = parts[parts.length - 1]; // "no_picture_yet.jpg"
            console.log(path)
            return path;
        }
        },
    methods:{
        refresh() {
            this.getSongInfo()
        },
    
        getSongInfo(){
            // var id='1652692864723656706'
            var url_1='/song/'+this.song_id
            var url_2='/song/comment/'+this.song_id

            getSongInfoAPI(url_1).then(res=>
            {
                console.log(res)
                if(res.success)
                {
                    this.songinfo=res.data.song_info
                    let parts = this.songinfo.coverPicture.split("/");
                    this.songinfo.coverPicture = this.src+parts[parts.length - 1]; // "no_picture_yet.jpg"
                    console.log(this.songinfo.coverPicture)
                }
            }),
            getSongCommentAPI(url_2,{
                page_number:1,
                page_size:10
            }).then(res=>
            {
                console.log(res)
                if(res.success)
                {
                    this.pages=res.data.pages
                }

            })
        },
        submitComment(){
            var id=this.songinfo.id
            var url='/song/comment/'+id
            if(!this.newComment){
                return;
            }
            setSongCommentAPI(url,{
                content:this.newComment
            }).then(res=>
            {
                if(res.success)
                {
                    this.$message({
                    message: '评论成功！',
                    type: 'success'
                    })
                    this.getSongInfo();
                    console.log(res)
                }
                else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        editComment(index){
            this.dialogVisible=true,
            this.tcomment=this.pages.records[index].commentsContent,
            this.form.id=this.pages.records[index].id,
            this.form.userId=this.pages.records[index].userId,
            this.form.songId-this.pages.records[index].songId,
            this.form.status=this.pages.records[index].status,
            this.form.createTime=this.pages.records[index].createTime
        },
        handleClose(done) {
        this.$confirm('确认提交？')
          .then(_ => {
            editSongCommentAPI({                    
                commentsContent: this.form.commentsContent,
                createTime: this.form.createTime,
                id: this.form.id,
                songId: this.form.songId,
                status: this.form.status,
                userId: this.form.userId
            }).then(res => 
            {
                console.log(res)
                //修改成功
                if(res.data.success){
                    this.$message({
                    message: '修改成功！',
                    type: 'success'
                    })
                    this.getSongInfo()
                }
                else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                
            }) 
            done();
          })
          .catch(_ => {});
          this.dialogVisible = false;
        },
        onSubmit(){
            this.handleClose();
        },
        deleteComment(id){
            this.$confirm('确认删除？').then(_=>{
                var url='/'+id
                delSongCommentAPI(url).then(res=>{
                    console.log(res)
                    if(res.success){
                        this.$message({
                        message: '删除成功！',
                        type: 'success'
                        });
                    }
                    else{
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        });
                    }

                })
            })
            
        }

    },
    created(){
        this.song_id=this.$route.query.song_id
        this.getSongInfo()
    },
    // watch:{
    //     pages(){
    //         this.refresh()
    //     }
    // }
}
</script>

<style lang="less" scoped>
.song-detail{
    margin:0 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.song-info{
    display: flex;
    flex-direction: row;
    margin-left: 30px;
}
.song-info img{
    width:200px;
    height:150px;
    object-fit: cover;
    border-radius: 50%;
}
.song-infodetail{
    display: flex;
    flex-direction: column;
}
.song-name{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.song-comments{
    border-radius: 15px;
    border: 1px solid #409EFF;
    background: rgba(201, 221, 245,0.4);
    margin-bottom: 60px;
}
.song-incomment{
    position: relative;
}
.song-incomment h{
    margin-left:15px;
    font-size: 15px;
    font-weight: bolder;
}
.content{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.content p{
    margin-left:40px;
    width:85%;
    // height:50px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255,0.4);
}
.el-icon-edit{
    color: #65a1f4;
    margin-right:20px;
}
.el-icon-edit:hover{
    color: #122dde;
    font-weight:bolder;
}
.el-icon-delete{
    color:#f36464;
}
.el-icon-delete:hover{
    color:red;
    font-weight:bolder;
}
.song-incomment small{
    margin-left:560px;
    border-bottom: black;
}
.song-incomment::after{
    content: '';
    display: block;
    border-bottom: 1px solid rgba(0, 0, 0,0.5);
}
.commentarea{
    width:60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 60px; 
    background-color: rgba(255, 255, 255,1);
    box-shadow: 0 -2px 10px rgba(9, 63, 150, 0.1);
}
.commentarea textarea{
    width: 100%;
    min-height: 20px;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255,0.1);
}
.commentarea button{
    width:60px;
    height: 30px;
    margin-left:20px;
    border:1px solid rgb(49, 109, 212);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.1);
    color: #409EFF;
}
.commentarea button:hover{
    color:blue;
}
</style>