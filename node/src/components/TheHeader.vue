<!-- 顶部导航栏 -->
<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="display: flex;flex-direction: row;top:0;">
      <el-menu-item index="1" style="font-size: 30px;font-weight:600;color: rgba(54, 148, 255, 1);border: none;background-color: #fff;margin-left: 80px;">MusicBox</el-menu-item>
      <el-menu-item index="2" style="border: none;">首页</el-menu-item >
      <el-menu-item index="3" style="border: none;">我的音乐</el-menu-item>
      <el-menu-item index="4" style="border: none;">创作中心</el-menu-item>

      <el-menu-item index="5" style="border: none;background-color: #fff;">
        <!-- <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:90px">
            <el-option label="歌名" value="1"></el-option>
            <el-option label="歌单" value="2"></el-option>
            <el-option label="专辑" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input> -->
          <div class="search-container" style="width:350px">
            <i class="el-icon-search" @click="search"></i>
            <input type="text" v-model="input" style="border:none;width:90%;outline:none;background-color: rgba(201,221,245, 0);"/>
        </div>
      </el-menu-item>
      

      <el-menu-item index="6" style="border: none;background-color: #fff;color: rgba(54, 148, 255, 1);" >
        <span v-if="loginFlag">登录</span>

       <!-- 登录后的头像显示 -->
       <el-dropdown v-else  @command="clickLogout">
        <el-avatar :size="40" :src="avatar"></el-avatar>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="chat">私信</el-dropdown-item>
                <el-dropdown-item command="follow">我的关注</el-dropdown-item>
                <el-dropdown-item command="fan">我的粉丝</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>

      </el-menu-item>
    </el-menu>
    <!-- <div class="line"></div> -->

    
  </div>
</template>


<script>
import {tokenAPI,getUserInfoAPI} from '@/request/api'

export default {
  data() {
    return {
      avatar:'',
      loginFlag:null,
      input:'',
      activeIndex: '2',
      activeIndex2: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex=key;
       if(key==1)
          this.$router.push('/main/post') ;
        else if(key==2)
          this.$router.push('/main/home');
        else if(key==3)
          this.$router.push('/main/mymusic/createdplaylists');
        else if(key==4)
          this.$router.push('/main/creativecenter/uploadsong');
        else if(key==6)
        {
          var token=sessionStorage.getItem('token');
          if(token===null)
            this.$router.push('/login');
          else
          {
              this.$router.push('/main/mycenter')
          }
        }
          
      console.log(key, keyPath);
      console.log(this.activeIndex);
    },
    //退出登录函数
    clickLogout(command){
      // 退出登录
      if(command=='logout')
      {
        this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        this.$store.commit('logout');
        this.loginFlag=true;
        this.$router.push('/main/home');
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
      }
      else if(command=='follow')
        this.$router.push('/main/follower')
      else if(command=='fan')
        this.$router.push('/main/fan')
      else
        this.$router.push('/main/chat')

    },
    //判断是否登录
    isLogin(){
      var token=sessionStorage.getItem('token');
      if(token==null)
        this.loginFlag=true;
      else 
      this.loginFlag=false;
    },
    //搜索
    search(e){        
      if(this.input!=='' & e.keyCode === 13)
      {
        this.$router.push({path: '/main/search?input='+this.input});
      }
    },
    getAwatar(){
      var token=sessionStorage.getItem('token');
      if(token)
        getUserInfoAPI().then(res =>{
            console.log(res)
            if(res.success)
            {                
              const spliceLength2 = res.data.detailed_info.avatar.lastIndexOf("/");
              this.avatar="http://124.70.195.38:8000/avatar/"+res.data.detailed_info.avatar.slice(spliceLength2 + 1);
              console.log(this.avatar)
            }
            else
            this.$message({
              message: res.message,
              type: 'warning'
              });
        })
    }
  },
  created(){
    window.addEventListener('keydown', this.search, true)
    this.isLogin()
    this.getAwatar()
  },
  watch: {
      "$localStorage.getItem('token')":{
          deep:true,//深度监听设置为 true
              handler:function(newVal,oldVal){
              if(newVal===null)
              {
                this.$store.commit('logout')
                this.loginFlag=false;
                this.getAwatar()
              }
              else
              {
                this.loginFlag=true;
                this.getAwatar()
              }
          }
      },
    }
}
</script>

<style lang="less" scoped>

// 导航栏点击后
.el-menu--horizontal>.el-menu-item.is-active{
color: #fff;
background-color: #409EFF;
}
// 导航栏点击前
.el-menu--horizontal>.el-menu-item {
border-radius: 20px;
height:40px;
line-height: 40px;
margin:15px 40px;
border-radius: 20px;
}
.el-select .el-input {
  width: 200px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-button:hover {
color:#409EFF
}
.el-icon-search:hover{
color:#409EFF
}
/* 搜索栏样式 */
.search-container{
  display: flex;
  flex-direction: row;
  justify-items: center;
  background-color: rgba(201,221,245, 0.4);
  border-radius: 20px;
  padding:10px;
  width:500px;
  justify-content: space-between;
}

</style>
