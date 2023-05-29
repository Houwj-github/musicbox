<template>
    <div class="app">
        <label for="subject" class="post-subject">帖子主题：</label>
        <textarea class="subject-text" id="subject" v-model="form.subject" @input="limitSubject" placeholder="请输入帖子主题"/>
        <p class="limit">至少输入10个字, 还可以输入{{ subjectLimit }}个字</p>
        <label for="content" class="post-content">帖子内容：</label>
        <textarea class="content-text" id="content" v-model="form.content"  placeholder="请输入帖子内容"></textarea>
        <!-- <div class="status">
            <label for="status">状态：</label>
            <select id="status" v-model="form.status" style="border-radius: 10px;">
                <option value="0">公开(所有人可见)</option>
                <option value="2">私有(仅自己可见)</option>
            </select>
        </div> -->
        <div class="button-form">
            <button @click="submitPost">发布</button>
        </div>
    </div>
  </template>
  
  <script>
  import {setMyPostAPI} from '@/request/api'

  export default {
    data() {
      return {
        form:{
            subject: '',
            content: '',
            status: ''
        },
        subjectLimit: 50,
      }
    },
    methods: {
      limitSubject() {
        this.subjectLimit = 50 - this.form.subject.length
        if (this.subjectLimit < 0) {
          this.subjectLimit = 0
        }
      },
      submitPost() {
        setMyPostAPI({
            content:this.form.content,
            status:this.form.status,
            subject:this.form.subject
        }).then(res=>{
            console.log(res)
            if(res.data.success){
                this.$message({
                    message: '发布成功！',
                    type: 'success'
                });
                this.$router.push({path: '/main/post'})
            }
            else{
                this.$message({
                  message: res.data.message,
                  type: 'warning'
                });
            }

        })
        
      }
    }
  }
  </script>
<style lang="less" scoped>
.app{
    margin:0 200px;
}
.post-subject{
    font-size: 30px;
    color:rgba(54, 148, 255, 1);
}
.post-content{
    font-size: 30px;
    color:rgba(54, 148, 255, 1);
}
textarea {
    display: block;
    width: 100%;
    height: 150px;
    resize: none;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    outline: none;
}
.subject-text{
    margin-top:20px;
    font-size: 15px;
    height: 80px;
}
.content-text{
    margin-top:20px;
    font-size: 15px;
    height: 280px;
}
.status{
    margin-top:10px;
    margin-left: 700px;
}
.limit{
    margin-left: 700px;
    font-size: 10px;
}
.button-form{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
button {
    width:100px;
    display: block;
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
}
button:hover {
    opacity: 0.6;
}
button:active {
    background-color: #3e8e41;
}
</style>