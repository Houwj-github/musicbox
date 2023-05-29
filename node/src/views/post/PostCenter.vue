<template>
  <div class="post">
    <!-- 帖子主题和发布者 -->
    <div>
      <div class="header">
        <h2>{{ postDTO.subject }}</h2>
        <p>{{ postuserName }} 发布于 {{ postDTO.createTime }}</p>
        <p style="margin:auto 20px;margin-bottom: 20px;">{{ postDTO.content }}</p>
      </div>
    </div>
    <div class="post-comments">
        <p style="font-size:20px;font-weight:bold;">全部评论</p>
        <div v-for="(comment,index) in postDTO.postReplyList" :key="index" >
            <div class="post-incomment" v-if="comment.status===0">
                <div style="display: flex;flex-direction: row;align-items: center;">
                  <el-avatar :size="40" :src="User.find(item=>item.userid===comment.replyUserId)?.avatar"></el-avatar>
                  <span style="margin-left:15px;font-weight: bold;">{{ comment.replyUserId===postDTO.userId?'楼主':(User.find(item=>item.userid===comment.replyUserId)?.username)}}:</span>
                </div>
                <div class="content">
                  <p>{{ comment.commentsContent }}</p>
                  <el-button style="float: right;padding: 3px 0" type="text" @click="replyUser(comment.replyId)">回复</el-button>
                  <i v-if="my_Id===postDTO.userId||my_Id===comment.replyUserId" class="el-icon-delete" @click="deleteComment(comment.id)"></i>
                </div>
                <small>{{ "发布:    "+comment.createTime+"  " }}{{ "更新:    "+comment.updateTime }}</small>     
            </div>
        </div>
    </div>
    <div class="commentarea" style="margin-top:60px;">
      <textarea v-model="newComment" placeholder="发表评论"></textarea>
      <button @click="submitComment">提交</button>
    </div>
    <el-dialog title="回复" :visible.sync="dialogVisible" width="50%" >
        <el-input v-model="newComment" :placeholder="回复" style="width:100%;"></el-input>
        <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </span>  
    </el-dialog>
  </div>
</template>
  
<script>
import { getUserInfoAPI } from '@/request/api'
import {getPostCenterAPI} from '@/request/api'
import {delPostReplyAPI} from '@/request/api'
import {setPostCommentAPI} from '@/request/api'
import {getOtherUserInfoAPI} from '@/request/api'


  export default {
    data() {
      return {
        postDTO: {
          id:'',
          userId:'',
          content:'',
          status:'',
          subject:'',
          createTime:'',
          updateTime:'',
          postReplyList:[]
        },
        /* {
              id:'',
              postId:'',
              replyUserId:'',
              replyId:'',
              commentsContent:'',
              status:'',
              createTime:'',
              updateTime:'',
             }*/
        User:[],
        my_Id:'',
        post_id:'',
        postuserName:'',
        newComment:'',
        // tmpuserId:'',
        tmpreplyId:'',
        dialogVisible:false
      };
    },
    methods: {
        getUserInfo(){
          getUserInfoAPI({}).then(res=>{
            console.log(res)
            if(res.success){
              this.my_Id=res.data._user_id
            }
          })
        },
        getPostUserName(){
          var url='/user/visit/'+this.postDTO.userId
          getOtherUserInfoAPI(url).then(res=>{
            console.log(res)
            this.postuserName=res.data.public_info.nickname
          })
        },
        getUserName(){
          var userId=''
          var url=''
          this.postDTO.postReplyList.sort((a, b) => a.time - b.time);
          for (let i = 0; i < this.postDTO.postReplyList.length; i++) {
              userId = this.postDTO.postReplyList[i].replyUserId;
              url='/user/visit/'+userId
              getOtherUserInfoAPI(url).then(res=>{
                console.log(res)
                let id=res.data.public_info.id
                let name=res.data.public_info.nickname
                let avatar=res.data.public_info.avatar
                const spliceLength2 = avatar.lastIndexOf("/");
                let a="http://124.70.195.38:8000/avatar/"+avatar.slice(spliceLength2 + 1);
                this.User.push({
                  userid: id,
                  username: name,
                  avatar: a
                });
              })
            }
            console.log(this.User)
        },
        getPostCenter(){
            var url='/post/topic/'+this.post_id
            getPostCenterAPI(url).then(res=>{
                console.log(res)
                if(res.success){
                  this.postDTO=res.data.postDTO
                  this.getUserName()
                  this.getPostUserName()
                }
            })
        },
        deleteComment(id){
          var url='/'+id
          delPostReplyAPI(url).then(res=>{
            console.log(res)
            if(res.data.success)
            {
              this.$message({
                  message: '删除成功！',
                  type: 'success'
                  });
                  this.getUserInfo()
                  this.getPostCenter()
            }
            else{
              this.$message({
                  message: res.data.message,
                  type: 'warning'
              });
            }

          })
        },
        submitComment(){
          if(this.newComment.trim()===''){
              alert('评论不能为空！')
              // type: 'warning'
            return;
          }
          setPostCommentAPI({
            commentsContent:this.newComment,
            postId:this.post_id,
            replyId:0,
            status:0
          }).then(res=>{
            console.log(res)
            if(res.data.success)
            {
              this.$message({
                message: '评论成功！',
                type: 'success'
                });
                this.getUserInfo()
                this.getPostCenter()
            }
            else{
              this.$message({
                message: res.data.message,
                type: 'warning'
              });
            }
          })
        },
        replyUser(id){
          this.dialogVisible=true;
          // this.tmpuserId=userid;
          this.tmpreplyId=id
        },
        handleClose(done) {
        this.$confirm('确认回复？')
          .then(_ => {
            setPostCommentAPI({
            commentsContent:this.newComment,
            postId:this.post_id,
            replyId:this.tmpreplyId,
            status:0
          }).then(res=>{
            console.log(res)
            if(res.data.success)
            {
              this.$message({
                message: '评论成功！',
                type: 'success'
                });
                this.getUserInfo()
                this.getPostCenter()
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
        // goMycenter(){
        //   this.$router.push({path: '/main/mycenter'});
        // }
    },
    created(){
        this.post_id=this.$route.query.post_id
        console.log(this.post_id)
        this.getUserInfo()
        this.getPostCenter()
        // this.getUserName()
    },
  };
</script>
  
<style lang="less" scoped>
.post{
    margin:0 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.post-comments{
    border-radius: 15px;
    border: 1px solid #409EFF;
    background: rgba(201, 221, 245,0.4);
    margin-bottom: 60px;
}
.post-incomment{
    position: relative;
}
.post-incomment h{
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
    border-radius: 15px;
    background-color: rgba(255, 255, 255,0.4);
}
.reply{
    font-family: 思源黑体;
    font-size: 10px;
    color: #65a1f4;
    margin-right:20px;
}
.reply:hover{
    color: #122dde;
    font-weight:bolder;
}
.el-icon-delete{
  margin-left: 10px;
    color:#f36464;
}
.el-icon-delete:hover{
    color:red;
    font-weight:bolder;
}
.post-incomment small{
    margin-left:560px;
    border-bottom: black;
}
.post-incomment::after{
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