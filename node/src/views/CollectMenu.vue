<template>
    <div class="song-list">
        <div style="display:flex;flex-direction: row;align-items: center;">
            <div class="song-cover">
                <img :src="src+imagePath"/>
            </div>
            <div class="song-list-info">
                <h2>{{ menu.menuName}}</h2>
                <p>创建：{{ menu.createTime }}  更新：{{ menu.updateTime }}</p>
                <p>介绍：{{ menu.menuIntroduction }}</p>
            </div>
        </div>
        <div class="song-list-centent">
            <table>
                <tr style="height:50px;">
                    <td style="font-size:20px;width:110px;">歌曲名</td>
                    <td style="font-size:20px;width:110px;">歌手</td>
                    <td style="font-size:20px;width:110px;">分类</td>
                    <td style="font-size:20px;width:110px;">语言</td>
                    <td style="font-size:20px;width:110px;">发行时间</td>
                    <td style="font-size:20px;width:110px;"></td>
                </tr>
                <tr v-for="(song,index) in menu.songList" :key="index" class="centent_td" >
                    <template v-if="song.status !== -1">
                        <td class="centent_i" @click="goSong(song.id)"><i class="vip-layout" :class="{bg:song.isVip}">VIP</i>{{ song.songName }}</td>
                        <td>{{ song.singerName }}</td>
                        <td>{{ song.classification }}</td>
                        <td>{{ song.language }}</td>
                        <td>{{ song.issueTime }}</td>
                        <td><i class="el-icon-video-play" @click="playSong(song)"></i></td>
                    </template>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import {getCollectMenuAPI} from '@/request/api'
import {playSongloggedAPI} from '@/request/api'

export default{
    data(){
        return{
            menuID:'',
            menu:{
                id:'',
                authority:'',
                menuName:'',
                menuIntroduction:'',
                isAlbum:'',
                userId:'',
                createTime:'',
                updateTime:'',
                songList:[],
                coverPicture:''
            },
            src:'http://124.70.195.38:8000/menu-cover/'

            // songList:{
            //     id:'',
            //     userId:'',
            //     isVip:'',
            //     fileDirectory:'',
            //     coverPicture:'',
            //     singerName:'',
            //     songName:'',
            //     status:'',
            //     issueTime:'',
            //     language:'',
            //     classification:'',
            //     createTime:'',
            //     updataTime:''
            // }
        }
    },
    methods:{
        getCollectMenu(){
            // var id='1'
            var url='/menu/collect/'+this.menuID+'}'
            getCollectMenuAPI(url).then(res=>
            {
                console.log(res)
                if(res.success){
                    this.menu=res.data.detailed_menu
                }
                else{
                    this.$message({
                    message: res.message,
                    type: 'warning'
                    });
                }
            }
            )
            
        },
        getPublicMenu(){
            var url='/menu/public/'+this.menuID+'}'
            getCollectMenuAPI(url).then(res=>
            {
                console.log(res)
                if(res.success){
                    this.menu=res.data.detailed_menu
                }
                else{
                    this.$message({
                    message: res.message,
                    type: 'warning'
                    });
                }
            }
            )
            
        },
        playSong(song){
            this.$store.commit('playSong',song)
            // var id=i
            // var url='/song/play/logged/'+id
            // playSongloggedAPI(url).then(res=>
            // {
            //     console.log(res)
            // })

        }
    },
    created(){
        if(this.$route.query.publicMenuID)
        {
            console.log(this.$route.query.publicMenuID)
            this.menuID=this.$route.query.publicMenuID
            this.getPublicMenu()
        }
        if(this.$route.query.collectMenuID)
        {
            console.log(this.$route.query.collectMenuID)
            this.menuID=this.$route.query.collectMenuID
            this.getCollectMenu()
        }
    },
    computed:{
        imagePath(){
            let parts = this.menu.coverPicture.split("/");
            let path = parts[parts.length - 1]; // "no_picture_yet.jpg"
            return path;

        }
    }
}
</script>

<style lang="less" scoped>
img{
    border-radius: 20px;
    flex-grow: 1;
    width: 200px;
    height:150px;
    margin-left: 20px;
}
.song-list {
    display: flex;
    flex-direction: column;
    margin:0 200px;
}
.song-list-info{
    margin:auto 20px;
    display: flex;
    flex-direction: column;
}
.song-list-centent{
    padding:30px 100px;
    // height:300px;
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
.centent_td{
    height:38px;
}
.centent_td:hover{
    color:blue;
}
.centent_td td{
    width:110px;
    font-size:15px;
    font-family: 思源黑体;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
.centent_td td:hover{
    color:blue;
    overflow: visible;
    z-index: 1;
}
.centent_i{
    margin:10px;
    display: flex;
    flex-direction: row;
}
.el-icon-video-play:hover{
    color: #409EFF;
}
.vip-layout{
    width:25px;
    border-radius: 8px;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-small;
    background-color:gray;
    margin-right: 10px;
}
.bg{
    background-color:#FF5733;
}
</style>