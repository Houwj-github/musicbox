<template>
    <div style="margin:20px 100px">
        <el-row >
        <el-col :span="18">
            <el-card class="box-card" v-for="post in post_page.records" :key="post.id" style="width:100%;margin:20px">
            <div slot="header" class="clearfix">
                <span>{{ post.subject }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="goPostCenter(post.id)">查看</el-button>
            </div>
            <div  class="text item">{{ post.content }}</div>
            <small  class="text item">{{ "发布:    "+post.createTime+"  " }}</small>
            <small  class="text item">{{ "更新:    "+post.updateTime }}</small> 
        </el-card>
        </el-col>
        <el-col :span="6" style="margin-top: 20px;">
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
        </el-col>
        </el-row>
    </div> 
</template>
<script>
import {getPostAPI} from '@/request/api'

export default{
    data(){
        return{
        post_page: {
        records: [
            /*
            id
            userId
            content
            status
            subject 主题
            createTime
            updaeTime
            */
        ]
        },
        }
    },
    methods:{
        getPost(){
            getPostAPI().then(res=>{
                console.log(res)
                if(res.success){
                    this.post_page=res.data.post_page
                }

            })
        },
        goPostCenter(post_id){
            console.log(post_id)
            this.$router.push({path: '/main/postcenter?post_id='+post_id});
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
        this.getPost()
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
    background-color:rgba(201,221,245, 0.4);
}
.card-subject {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}
.card-body {
    height: 70px; /* 设置高度 */
    overflow: hidden; /* 设置溢出隐藏 */
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}
.card-content{
    color: gray;
    font-weight: 550;
    text-overflow: ellipsis; /* 文字超出显示省略号 */
}
.card small{
    margin-left:500px;
    color:gray;
}
.post_1{
    margin-left: 50px;
    // width:1300px;
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
    background-color:rgba(201,221,245, 1);
}
.text {
    font-size: 14px;
    color:rgb(177, 176, 176);
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    font-size: 18px;
  }
  .box-card:hover{
    color:#409EFF
  }
</style>
  
  