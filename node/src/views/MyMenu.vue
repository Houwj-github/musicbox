<template>
    <div class="song-list">
        <div class="song-list-header">
            <div class="song-list-cover">
                <img :src="menu.cover"/>
            </div>
            <div class="song-list-info">
                <h2>{{ menu.menuName}}</h2>
                <p>创建：{{ menu.createTime }}  更新：{{ menu.updateTime }}</p>
                <p>权限：{{ menu.authority }}</p>
                <p>介绍：{{ menu.menuIntroduction }}</p>
            </div>
        </div>
        <div class="song-list-centent">
            <table>
                <tr style="height:50px;">
                    <td style="font-size:20px;width:110px;">歌曲名</td>
                    <td style="font-size:20px;width:110px;">歌手</td>
                    <td style="font-size:20px;width:110px;"></td>
                    <td style="font-size:20px;width:110px;"></td>
                </tr>
                <tr v-for="(song,index) in menu.songList" :key="index" class="centent-td">
                    <td>{{ song.name }}</td>
                    <td>{{ song.artist }}</td>
                    <td><i class="el-icon-video-play" @click="playSong(index)"></i></td>
                    <td><i class="el-icon-delete" @click="removeSong(index)"></i></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import {getMyMenuAPI} from '@/request/api';   //导入API接口


export default{
    data(){
        return{
            menu:{
                id:'1',
                userId:'',
                isAlbum:'false',
                menuName:'hhh',
                createTime:'2021-01-01',
                updateTime:'2022-01-01',
                authority:'公开',
                menuIntroduction:'这是我创建的歌单',
                cover:require("../assets/images/swiper-images.jpg"),
                songList:[
                    {name:'Song1',artist:'Artist1',url:''},
                    {name:'Song2',artist:'Artist2',url:''},
                    {name:'Song3',artist:'Artist3',url:''}
                ]
            },
            src: require("../assets/images/swiper-images.jpg")
        }
    },
    methods:{
        getMyMenu(){
            var id='1655115610121822210'
            var url='/menu/my/'+id+'}'
            getMyMenuAPI(url).then(res=>
                {
                    console.log(res)
                }
            )
            
        },
        playSong(index){

        },
        removeSong(index){

        }
    },
    created(){
        this.getMyMenu()
    }
}
</script>

<style lang="less" scoped>
.song-list {
    display: flex;
    flex-direction: column;
    margin:0 200px;
}
.song-list-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  
}
.song-list-cover img{
    border-radius: 20px;
    flex-grow: 1;
    width: 200px;
    height:150px;
}
.song-list-info{
    margin:auto 20px;
    display: flex;
    flex-direction: column;
}
.song-list-centent{
    padding:30px 100px;
    height:300px;
    border-radius: 15px;
    border: 1px solid #409EFF;
    background: rgba(201, 221, 245,0.4);
}
.song-list-centent table {
    width: 100%;
    border-collapse: collapse;
}
.song-list-centent td{
    text-align: left;
}
.centent-td{
    height:38px;
}
.centent_td td{
    width:110px;
    font-size:15px;
    font-family: 思源黑体;
}
.el-icon-video-play:hover{
    color: #409EFF;
}
.el-icon-delete:hover{
    color:#ff0000;
}
</style>