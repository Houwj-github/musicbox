<!-- 我的音乐二级导航栏 -->
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="border:none" >
            <!-- <el-menu-item index="1" style="border:none;margin-left:330px;">全部歌曲</el-menu-item> -->
            <el-menu-item index="1" style="border:none;margin-left:450px;">创建的歌单</el-menu-item>
            <el-menu-item index="2" style="border:none">收藏的歌单</el-menu-item>
            <el-menu-item index="3" style="border:none">收藏的专辑</el-menu-item>
            <el-menu-item index="4" style="border:none">历史记录</el-menu-item>
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
        //  if(key==1)
        //     this.$router.push('/main/mymusic/allmusic') ;
          if(key==1)
            this.$router.push('/main/mymusic/createdplaylists');
          else if(key==2)
            this.$router.push('/main/mymusic/favoriteplaylists');
          else if(key==3)
            this.$router.push('/main/mymusic/collectedalbums');
          else if(key==4)
            this.$router.push('/main/mymusic/historicalrecord');
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
  
