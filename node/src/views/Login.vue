<!-- 登录界面 -->
<template>
    <div class='building' style="margin:0 100px;" >

        <div class="music-box">MusicBox</div>
        <div style="flex-grow: 1;" v-if = "login">
            <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">MusicBox 账户登录</h3>

            <el-form-item prop="username" >
                <el-input type="text" v-model="loginForm.username" placeholder="电子邮箱" ></el-input>
            </el-form-item>


            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="密码" ></el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;height:50px;border-radius: 20px;" @click="submitLogin">
                <span style="font-size: 2.5ch;">登录</span>
            </el-button>
            
            </el-form>

            <el-form class="registerContainer">
                <h3 class="registerTitle">没有 MusicBox 账户？</h3>
                
                <el-button type="primary" class="registerButton" @click="userRegister">
                    <span style="font-size: 2.5ch;">创建账户</span>
                </el-button>
            </el-form>
        </div>

        <div style="flex-grow: 1;" v-else>
            <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer" style="height:auto">
            <h3 class="loginTitle">MusicBox 账户注册</h3>

            <el-form-item prop="username" >
                <el-input type="text" v-model="registerAccount.username" placeholder="电子邮箱" ></el-input>
            </el-form-item>


            <el-form-item prop="password">
                <el-input type="password" v-model="registerAccount.password" placeholder="密码" ></el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword">
                <el-input type="password2" v-model="registerAccount.confirmPassword" placeholder="确认密码" ></el-input>
            </el-form-item>


            <el-button type="primary" style="width:100%;height:50px;border-radius: 20px;" @click="submitRegister">
                <span style="font-size: 2.5ch;">注册</span>
            </el-button>
            
            </el-form>
        </div>
       
    </div>
</template>
    

<script>
import { loginAPI } from '@/request/api';       //导入登录API接口
import { registerAPI } from '@/request/api';       //导入登录API接口


export default {
  name: "Login",
    data(){
        
        let checkEmail=(rule,value,callback)=>
        {
            const regEmail=/^[a-zA-Z]|[0-9]+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(!regEmail.test(this.loginForm.username))
            {
                callback(new Error("邮箱格式错误！"));
            }
        }
      return{
        login:true,
          //用户输入的账户信息
          loginForm:{
              username:"",
              password:"",
          },

          //账户密码组成规则
          rules:{
              username:[{required:true,message:"请输入电子邮箱",trigger:"blur"},{validator: checkEmail,trigger:"blur"}
              ],
          },

          //保存的用户账户信息
          userAccount:{
            username:"123456@163.com",
            password:"123456",
          },
          registerAccount:{
            username:'',
            password:'',
            confirmPassword:'',
          }
      }
  },
    methods:{
      submitLogin(){

          this.$refs.loginForm.validate((valid) => 
          {
            if(!valid)
            {
                    this.$message.error('邮箱格式错误，请重新输入！');
                    this.loginForm.username="";
                    this.loginForm.password="";
                    return false;     
            }
          });
          
            //向后端请求数据
            loginAPI({                    
                username: this.loginForm.username,                    
                password: this.loginForm.password,                
                }).then(res => 
                {
                    console.log(res)
                    //登录成功
                    if(res.data.success)
                    {
                        this.$message({
                            message: '恭喜你，登录成功！',
                            type: 'success'
                        });
                        this.$store.commit('login',res.data.data.token);
                        this.$router.push('/main/home')   //跳转到主页面
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
      userRegister()
      {
        this.login=false;
      },
      submitRegister(){
        if(this.registerAccount.password!==this.registerAccount.confirmPassword)
        {
            this.$message.error('密码不一致，请重新输入！');
                    this.registerAccount.confirmPassword="";
                    this.registerAccount.password="";
                    return false; 
        }
        registerAPI({
            username: this.registerAccount.username,                    
            password: this.registerAccount.password,                
            }).then(res => 
            {
                    //注册成功
                    if(res.data.success)
                    {
                        this.$message({
                            message: '恭喜你，注册成功！',
                            type: 'success'
                        });
                        this.$store.commit('login',res.data.data.token);
                        this.$router.push('/main/home')   //跳转到主页面
                    }
                    else
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
        })
      }
    }
};
</script>

<style lang="less" scoped>
.loginContainer{
    border-radius: 15px;
    margin: 150px auto auto 0;
    width: 400px;
    padding: 15px 35px 15px 35px;
    height:300px;
    background-color:rgba(255,255,255,0.5);
    border: 1px solid #409EFF;
}
.loginTitle{
    margin: 0px auto 48px auto;
    text-align: center;
    font-size: 35px;
}
.registerTitle{
    margin: 0px auto 20px auto;
    text-align: center;
    font-size: 25px;
}
.registerButton{
    width:100%;
    height:50px;
    background-color: white;
    border-color: #409EFF;
    color:black;
    border-radius: 20px;
}

body{
  margin:0;
  padding:0;
  border:0
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.building{
  //background:url("../assets/images/login-background.png");
  //background-color: rgb(197, 222, 248);
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  display: flex;
  flex-direction: row;
}
.registerContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 30px auto;
    margin: 30px auto auto 0;
    width: 400px;
    padding: 15px 35px 15px 35px;
    //background: white;
    //border:1px solid black;
    height:120px;
    //box-shadow: 0 0 25px #f885ff;
    background-color:rgba(255,255,255,0.5);
}
.music-box{
    flex-grow: 1;
    color: #409EFF;
    font-size: 140px;
    font-weight: bold; 
    margin-top: auto;
    margin-bottom: auto;
    margin-right:-150px;
    margin-left: 50px;
    font-family:sans-serif;
}

</style>
