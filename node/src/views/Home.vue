<!-- 主界面 -->
<template>
  <div>
    <!-- 轮播图 -->
    <home-swiper/>
    
    <!-- 推荐歌单 -->
    <span class="txt">推荐歌单</span>

    <div class="play-list-constainer">
      <li class="play-list" v-for="(item,index) in playLists" v-bind:key="index" @click="checkPlayList">
        <img :src="item.imgPath"/>
        <!-- <el-avatar shape="square"  :src="item.imgPath" style="height:100px;width: 150px;background-color: white;"></el-avatar> -->
        <span style="flex-grow: 1;line-height: 50px;">{{item.name}}</span>
      </li>
    </div>

    <!-- 推荐歌曲 -->
    <span class="txt">推荐歌曲</span>
    <div class="song-constainer">
      <div class="song-layout" v-for="(item,index) in songLists" v-bind:key="index">
        <img :src="item.imgPath"/>
        <div class="song-msg">
          <span style="flex-grow: 1;font-size: 20px;">{{item.name}}</span>
          <span style="flex-grow: 1;color:#808080;font-size: 15px;">{{item.author}}</span>
        </div>
        <i class="el-icon-video-play" style="font-size: 25px;"></i>
      </div>
    </div>

  </div>

  
</template>

<script>
import HomeSwiper from '../components/HomeSwiper.vue'
export default{
    data(){
        return{
          //歌单数据
          playLists:[
            {
              name: "playList1",                                          //歌单名
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
            {
              name: "playList2",                                          //歌单名
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
            {
              name: "playList3",                                          //歌单名
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
            {
              name: "playList2",                                          //歌单名
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
            {
              name: "playList3",                                          //歌单名
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            }
          ],
          songLists:[
          {
              name: "song1",                                          //歌单名
              author:"author1",
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
            {
              name: "song1",                                          //歌单名
              author:"author1",
              imgPath: require("../assets/images/swiper-images.jpg"),  //封面图片
              num: "num",                                                 //播放数量（可选）
            },
          ],


        }
    },
    components:{
      HomeSwiper
  },
  methods:{
    checkPlayList(){

    }
  }
}
</script>

<style lang="less" scoped>

.txt{
  color:rgba(54, 148, 255, 1);
  line-height:50px;
}
.play-list-constainer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  flex-flow: row wrap;
}
.play-list{
  display: flex;
  flex-direction: column;
  text-align: center;
  width:15%;
  height:180px;
  margin: auto 20px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: auto;
    height:130px;
  }
}
.song-constainer{
  margin:0 20px;
  display:flex;
  flex-direction:row;
  height:auto;
  flex-flow: row wrap;
  justify-content: space-between;
}
.song-layout{
  display: flex;
  flex-direction:row;
  align-items: center;
  width:auto;
  height:100px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: 150px;
    height:93px;
  }
}
.song-msg{
  display: flex;
  flex-direction: column;
  line-height: 35px;
  width:150px;
  margin-right: 50px;
  margin-left:20px;
}

</style>