<!-- 主界面 -->
<template>
  <div>
    <!-- 轮播图 -->
    <home-swiper/>
    
    <!-- 推荐播放最多歌曲 -->
    <span class="txt">推荐歌曲</span>
    <div class="song-constainer">
      <div class="song-layout" v-for="(item,index) in songPlayLists.records" v-bind:key="index">
            <el-image style="width: 80px; height:80px;border-radius: 50%;" :src="item.coverPicture" 
                      fit="cover" @click="goSongInfo(item.id)"></el-image>
        <div class="song-msg" @click="goSongInfo(item.id)">
          <span style="flex-grow: 1;font-size: 18px;" >{{item.songName}}</span>
          <span style="flex-grow: 1;color:#808080;font-size: 13px;">{{item.singerName}}</span>
        </div>
        <i class="el-icon-video-play" style="font-size: 22px;" @click="playSong(item)"></i>
      </div>
    </div>

    <!-- 推荐歌单 -->
    <span class="txt">推荐歌单</span>

    <div class="play-list-constainer">
      <li class="play-list" v-for="(item,index) in menuLists.records" v-bind:key="index" @click="checkPlayList">
        <div style="display: flex;justify-content: center;">
          <el-image style="width: 153px; height: 100px;border-radius: 20px;" :src="item.coverPicture" fit="cover" @click="goMenuInfo(item.id)"></el-image>
        </div>
        <span style="flex-grow: 1;line-height: 50px;">{{item.menuName}}</span>
      </li>
    </div>

    <!-- 推荐歌单 -->
    <span class="txt">推荐专辑</span>

    <div class="play-list-constainer">
      <li class="play-list" v-for="(item,index) in albumLists.records" v-bind:key="index" @click="checkPlayList">
        <div style="display: flex;justify-content: center;">
          <el-image style="width: 100px; height: 100px;border-radius: 50%;" :src="item.coverPicture" fit="cover" @click="goAlbumInfo(item.id)"></el-image>
        </div>
        <span style="flex-grow: 1;line-height: 50px;">{{item.menuName}}</span>
      </li>
    </div>
  </div>

  
</template>

<script>
import HomeSwiper from '../components/HomeSwiper.vue'
import  {ToplistSongCollectAPI,ToplistSongPlayAPI,ToplistMenuAPI,ToplistAlbumAPI} from '@/request/api'

export default{
    data(){
        return{
            list:[
                  {
                        coverPicture: require("@/assets/images/swiper-images.jpg")
                    },
                    {
                        coverPicture: require("@/assets/images/swiper-images.jpg")
                    },
                    {
                        coverPicture: require("@/assets/images/swiper-images.jpg")
                    },
                    {
                        coverPicture: require("@/assets/images/swiper-images.jpg")
                    },
                    {
                        coverPicture: require("@/assets/images/swiper-images.jpg")
                    }
            ],
            menuLists:[],             //收藏最多的歌单
            albumLists:[],            //收藏最多的歌单
            songCollectLists:[],      //收藏最多的歌
            songPlayLists:[],         //播放最多的歌
            menuImagePath:require("@/assets/images/playList-Image.png"),
            albumImagePath:require("@/assets/images/album-image.png"),
        }
    },
    components:{
      HomeSwiper
  },
  methods:{
    goMenuInfo(id){
      console.log(id)
      this.$router.push({path: '/main/collectmenu?publicMenuID='+id});
    },
    goAlbumInfo(id){
      console.log(id)
      this.$router.push({path: '/main/collectalbum?publicAlbumID='+id});
    },
    goSongInfo(id){
      console.log(id)
      this.$router.push({path: '/main/song?song_id='+id});
    },
    //获取收藏最多的专辑
    getAlbumLists(){
      ToplistAlbumAPI({
        days:7,
        minimumCollection:1,
        page_number:1,
        page_size:6
      }).then(res =>{
          console.log(res)
          if(res.success==true)
          {
            this.albumLists=res.data.topAlbumlist;
            console.log(this.albumLists)

            this.albumLists.records= this.coverPictureHandler(this.albumLists.records)
           
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
    //获取收藏最多的歌单
    getMenuLists(){
      ToplistMenuAPI({
        days:7,
        minimumCollection:1,
        page_number:1,
        page_size:3
      }).then(res =>{
          console.log(res)
          if(res.success==true)
          {
            this.menuLists=res.data.topMenulist;
            console.log(this.menuLists)
            this.menuLists.records=this.coverPictureHandler(this.menuLists.records)

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
    //获取播放量最多的歌
    geSongPlayLists(){
      ToplistSongPlayAPI({
        days:7,
        minimumCollection:1,
        page_number:1,
        page_size:3
      }).then(res =>{
          console.log(res)
          if(res.success==true)
          {
            this.SongCollectLists=res.data.topSonglist;
            console.log(this.SongCollectLists)
            this.SongCollectLists.records=this.songCoverPictureHandler(this.SongCollectLists.records);
            
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
     //获取收藏量最多的歌
     getSongCollectLists(){
      ToplistSongCollectAPI({
        days:7,
        minimumCollection:1,
        page_number:1,
        page_size:3
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
    coverPictureHandler(item)
    {
      for(var i=0;i<item.length;i++)
                    {
                        const spliceLength2 = item[i].coverPicture.lastIndexOf("/");
                        item[i].coverPicture="http://124.70.195.38:8000/menu-cover/"+item[i].coverPicture.slice(spliceLength2 + 1);
                        console.log(item[i].coverPicture)
                    }
      return item;
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
    playSong(item){
      this.$store.commit('playSong',item)
    },
    checkPlayList(){

    }
  },
  created(){
    this.getMenuLists()
    this.getSongCollectLists()
    this.geSongPlayLists()
    this.getAlbumLists()
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
  justify-content: center;
  width:20%;
  height:150px;
  margin: 20px 10px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: 153px;
    height:100px;
  }
}
.song-constainer{
  margin: 20px 60px;
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
.el-icon-video-play:hover{
  color: rgb(24, 144, 255);
}
.el-avatar:hover{
  opacity: 0.7;
}
.el-image:hover{
  opacity: 0.7;
}
</style>