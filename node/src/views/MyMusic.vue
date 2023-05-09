<!-- 我的音乐 -->
<template>
    <div>
        <my-music-header />
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
import MyMusicHeader from '@/components/MyMusicHeader.vue';
export default{
  data(){
      return{}
  },
  components:{
    MyMusicHeader
  }
}
</script>