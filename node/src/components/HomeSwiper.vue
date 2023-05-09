<!-- 轮播图 -->
<template>
    <!-- 轮播图 -->
    <div class="swiper">
        <el-carousel :interval="4000" type="card" height="280px">
            <el-carousel-item v-for="item,index in swiperList" :key="index">
                <img :src="item.imgPath" />
            </el-carousel-item>
        </el-carousel>
    </div>
  </template>
  
  <script>
  export default{
    name:"HomeSwiper",
      data(){
          return{
            //轮播图数据
            swiperList:[
                {
                    imgPath: require("../assets/images/swiper-images.jpg")
                },
                {
                    imgPath: require("../assets/images/swiper-images.jpg")
                },
                {
                    imgPath: require("../assets/images/swiper-images.jpg")
                },
                {
                    imgPath: require("../assets/images/swiper-images.jpg")
                },
                {
                    imgPath: require("../assets/images/swiper-images.jpg")
                }
            ]
          }
      },


  }
  </script>
  
  <style lang="less" scoped>
  .swiper{
    width: 100%;
    margin: 20px 0 0 0;
    img{
        width:100%;
    }
  }

  </style>