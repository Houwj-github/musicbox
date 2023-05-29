<!-- 轮播图 -->
<template>
    <!-- 轮播图 -->
    <div class="swiper">
        <el-carousel :interval="4000" type="card" height="280px">
            <el-carousel-item v-for="item,index in songPlayLists.records" :key="index">
                <!-- <img :src="item.coverPicture"  /> -->
                <el-image :src="item.coverPicture" fit="contain" @click="goSongInfo(item.id)" ></el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
  </template>
  
  <script>
import {ToplistSongCollectAPI} from '@/request/api'

  export default{
      data(){
          return{
            //轮播图数据
            songPlayLists:[]
          }
      },
      methods:{
        goSongInfo(id){
            console.log(id)
            this.$router.push({path: '/main/song?song_id='+id});
            },
        getSongPlayLists(){
            ToplistSongCollectAPI({
                days:7,
                minimumCollection:1,
                page_number:1,
                page_size:4
            }).then(res =>{
                console.log(res)
                if(res.success==true)
                {
                    this.songPlayLists=res.data.topSonglist;
                    console.log(this.songPlayLists)
                    this.songPlayLists.records=this.songCoverPictureHandler(this.songPlayLists.records);
                    
                }
                else
                {
                    this.$message({
                    message: res.message,
                    type: 'warning'
                    });
                }
            })
            },
        songCoverPictureHandler(item)
            {
            for(var i=0;i<item.length;i++)
                            {
                                const spliceLength2 = item[i].coverPicture.lastIndexOf("/");
                                item[i].coverPicture="http://124.70.195.38:8000/cover/"+item[i].coverPicture.slice(spliceLength2 + 1);
                                console.log(item[i].coverPicture)
                            }
                            console.log(item)
            return item;
            },
      },
      created(){
       this.getSongPlayLists()
      }


  }
  </script>
  
  <style lang="less" scoped>
  .swiper{
    width: 100%;
    margin: 20px 0 0 0;
    img{
        width:50%;
    }
  }

  </style>