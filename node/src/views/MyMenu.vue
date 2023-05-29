<template>
    <div class="song-list">
        <div style="display:flex;flex-direction: row;align-items: center;">
            <div class="song-cover">
                <img :src="src+imagePath"/>
            </div>
            <div class="song-list-info">
                <h2>{{ menu.menuName}}</h2>
                <p>创建：{{ menu.createTime }}  更新：{{ menu.updateTime }}</p>
                <p>权限：{{ menu.authority===0?'公开':'私有' }}</p>
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
                    <td style="font-size:20px;width:110px;"></td>
                </tr>
                <tr v-for="(song,index) in menu.songList" :key="index" class="centent_td">
                    <template v-if="song.status !== -1">
                        <td @click="goSong(song.id)">{{ song.songName }}</td>
                        <td>{{ song.singerName }}</td>
                        <td>{{ song.classification }}</td>
                        <td>{{ song.language }}</td>
                        <td>{{ song.issueTime }}</td>
                        <td><i class="el-icon-video-play" @click="playSong(song)"></i></td>
                        <td><i class="el-icon-delete" @click="removeSong(song.id)"></i></td>
                    </template>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import {getMyMenuAPI} from '@/request/api';   //导入API接口
import {playSongloggedAPI} from '@/request/api'
import {delSongInMenuAPI} from '@/request/api'

export default{
    data(){
        return{
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
                song_menu_id:'',
                coverPicture:''
            },
            src:'http://124.70.195.38:8000/menu-cover/'

        }
    },
    
    methods:{
        getMyMenu(){
            var url='/menu/my/'+this.song_menu_id+'}'
            getMyMenuAPI(url).then(res=>
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

        },
        removeSong(id){
            delSongInMenuAPI({
                songId:id,
                songMenuId:this.menu.id
            }).then(res=>{
                console.log(res)
                if(res.data.success)
                {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                        });
                    this.getMyMenu()
                }
                else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                
            })
            console.log(id)

        }
    },
    created(){
        this.song_menu_id=this.$route.query.song_menu_id
        console.log('111')
        console.log(this.song_menu_id)
        this.getMyMenu()
    },
    computed:{
        imagePath(){
            let parts = this.menu.coverPicture.split("/");
            let path = parts[parts.length - 1]; // "no_picture_yet.jpg"
            return path;
        }
    },
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
}
.el-icon-video-play:hover{
    color: #409EFF;
}
.el-icon-delete:hover{
    color:#ff0000;
}
</style>