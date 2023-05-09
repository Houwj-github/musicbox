<template>
  <div id="app">
     <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'Main',
  components: {
  }
}
</script>

<style>
body{
  height:100%;
  width:100%;
  margin:0;
}
</style>
