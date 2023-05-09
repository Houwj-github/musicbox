<!-- 创作中心二级导航栏 -->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="border:none" >
            <el-menu-item index="1" style="border:none;margin-left:600px;">上传歌曲</el-menu-item>
            <el-menu-item index="2" style="border:none">创建专辑</el-menu-item>
            <el-menu-item index="3" style="border:none">我的创作</el-menu-item>
        </el-menu>
    </div>
</template>

  
  <script>
    export default {
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
            this.activeIndex=key;
            if(key==1)
                this.$router.push('/main/creativecenter/uploadsong') ;
            else if(key==2)
                this.$router.push('/main/creativecenter/createalbum');
            else if(key==3)
                this.$router.push('/main/creativecenter/mycreation');
            console.log(key, keyPath);
        }
      }
    }
  </script>

<style lang="less" scoped>

.el-menu--horizontal>.el-menu-item.is-active{
  color: #409EFF;
}
</style>
  