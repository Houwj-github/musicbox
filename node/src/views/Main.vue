<!-- 主路由 -->
<template>
  <div>
    <!-- 顶部导航栏 -->
    <the-header />
    <div style="margin:0 100px;">
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
// 顶部导航栏
import TheHeader from '../components/TheHeader.vue'
export default{
  data(){
      return{}
  },
  components:{
      TheHeader
  }
}
</script>

