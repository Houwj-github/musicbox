<template>
    <div class="app">
        <div class="post" v-if="myPost.pages !==0">
            <div v-for="item in myPost.records" :key="item.id">
                <div  v-if="item.status === 0">
                    <div class="card" @click="goPostCenter(item.id)">
                        <div class="card-body">
                            <div class="card-content">{{ item.commentsContent }}</div>
                        </div>
                        <small>{{ "发布:    "+item.createTime+"  " }}</small>
                        <small>{{ "更新:    "+item.updateTime }}</small> 
                    </div>
                    <i class="el-icon-delete" @click="deleteReply(item.id)"></i>
                </div>
            </div>
        </div>
        <div class="post_empty" v-else>
            <div>
                <div class="card_empty">
                    <div class="card-subject-empty">{{ "你还没有发表过评论!" }}</div>
                </div>
            </div>
        </div>
        <div class="post_1">
            <div class="my_card" @click="goMyComment">
                <i class="el-icon-s-comment"></i>
                <span class="my_comment">我的评论</span>
            </div>
            <div class="my_card" @click="goMyPost">
                <i class="el-icon-user-solid"></i>
                <span class="my_comment">我的帖子</span>
            </div>
            <div class="my_card" @click="submitPost">
                <i class="el-icon-circle-plus"></i>
                <span class="my_comment">发表帖子</span>
            </div>
        </div>
    </div>      
</template>
<script>
import {getMyCommentAPI} from '@/request/api'
import {delPostReplyAPI} from '@/request/api'
import {getPostByReplyAPI} from '@/request/api'

export default{
    data(){
        return{
        myPost: {
        records: [
            /*
            id
            postId
            replyUserId
            replyId
            commentsContent
            status
            createTime
            updateTime
            */
        ],
        total:'',
        size:'',
        current:'',
        orders:[],
        optimizeCountSql:'',
        searchCount:'',
        countId:'',
        maxLimit:'',
        pages:''
        },
        }
    },
    methods:{
        getMyComment(){
            getMyCommentAPI({}).then(res=>
            {
                console.log(res)
                if(res.success)
                {
                    this.myPost=res.data.myPost
                }
            })
        },
        deleteReply(id){
          var url='/'+id
          delPostReplyAPI(url).then(res=>{
            console.log(res)
            if(res.data.success)
            {
              this.$message({
                  message: '删除成功！',
                  type: 'success'
                  });
                  this.getMyComment()
            }
            else{
              this.$message({
                  message: res.data.message,
                  type: 'warning'
              });
            }
          })
        },
        goPostCenter(id){
            var url='/post/reply/'+id
            getPostByReplyAPI(url).then(res=>{
                console.log(res)
                if(res.success){
                    this.$router.push({path: '/main/postcenter?post_id='+res.data.poet.id});
                }
            })
        },
        goMyComment(){
            this.$router.push({path:'/main/mycomment'});
        },
        goMyPost(){
            this.$router.push({path:'/main/mypost'});
        },
        submitPost(){
            this.$router.push({path:'/main/createpost'});
        }
    },
    created(){
        this.getMyComment()
    }
}
</script>
<style lang="less" scoped>
.app{
    display: flex;
    flex-direction: row;
}
.post{
    margin:0 0 0 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
}
.card{
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 10px;
    background-color:rgba(255,255,255, 0.4);
}
.card-subject {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}
.card-body {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}
.card-content{
    color: black;
    font-weight: 550;
}
.card small{
    margin-left:500px;
    color:gray;
}
.post_1{
    margin-left: 50px;
    width:1300px;
    height:500px;
    border: 1px solid #ccc;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.my_card{
    width:100%;
    height:30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.el-icon-s-comment{
    margin-right:10px;
    color:rgba(0, 0, 0,0.6);
}
.my_comment{
    color:gray;
}
.el-icon-user-solid{
    margin-right:10px;
    color:rgba(0, 0, 0,0.6);
}
.el-icon-circle-plus{
    margin-right:10px;
    color:rgba(0, 0, 0,0.6);
}
.my_card:hover{
    background-color:rgba(14, 13, 13,0.2);
}
.card:hover{
    background-color:rgba(201,221,245, 0.4);
}
.post_empty{
    margin:0 0 0 200px;
}
.card_empty{
    width:800px;
    height:200px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 10px;
    background-color:rgba(201,221,245, 0.4);
}
.card-subject-empty{
    margin-top:70px;
    font-size: 30px;
    text-align: center;
}
.el-icon-delete{
    margin-bottom:30px;
    margin-left: 800px;
    color:#f36464;
}
.el-icon-delete:hover{
    color:red;
    font-weight:bolder;
}
</style>
  
  