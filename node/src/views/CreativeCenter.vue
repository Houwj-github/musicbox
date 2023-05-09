<!-- 创作中心 -->
<template>
    <div>
        <CreativeCenterHeader/>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
    </div>
</template>

<script>
import CreativeCenterHeader from '@/components/CreativeCenterHeader.vue';
export default{
  data(){
      return{}
  },
  components:{
    CreativeCenterHeader
  }
}
</script>