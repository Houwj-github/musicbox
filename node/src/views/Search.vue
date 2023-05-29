<!-- 搜索结果显示界面 -->
<template>
    <div class="container">
        <div class="search-container" style="margin-bottom: 20px;">
            <i class="el-icon-search" @click="search"></i>
            <input type="text" v-model="input" style="border:none;width:90%;margin:auto;outline:none;background: rgba(201,221,245, 0);"/>
        </div>

        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲" name="first">
                    <div id="table" style="margin-top: 10px;">
                        <el-table :data="Lists" style="width: 100%" v-if="this.total!==0">
                            <el-table-column label="歌曲名" width="250"> 
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.songName}}</div>
                            </el-table-column>
                            <el-table-column label="歌手名" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.singerName}}</div>
                            </el-table-column>
                            <el-table-column  label="分类" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.classification}}</div>
                            </el-table-column>
                            <el-table-column  label="语言" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.language}}</div>
                            </el-table-column>
                            <el-table-column width="50"> 
                                <div slot-scope="scope" v-if="scope.row.status===0">
                                    <span v-if="scope.row.isVip" style="color: red;">VIP</span>
                                </div>
                            </el-table-column>
                            <el-table-column   width="50"> 
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class="el-icon-folder-add" @click="addPlayLists(scope.row)" style="font-size: 18px;"></i>
                                </div> 
                            </el-table-column> 

                            <el-table-column   width="50" >
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class="el-icon-video-play" @click="playSong(scope.row)" style="font-size: 18px;"></i>
                                </div>  
                            </el-table-column> 
                            <el-table-column   width="50" >
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class=" el-icon-download" @click="downloadSong(scope.row)" style="font-size: 18px;"></i>
                                </div>  
                            </el-table-column> 
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="歌手" name="forth">
                    <div id="table" style="margin-top: 10px;">
                        <el-table :data="Lists" style="width: 100%" v-if="this.total!==0">
                            <el-table-column label="歌曲名" width="250"> 
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.songName}}</div>
                            </el-table-column>
                            <el-table-column label="歌手名" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.singerName}}</div>
                            </el-table-column>
                            <el-table-column  label="分类" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.classification}}</div>
                            </el-table-column>
                            <el-table-column  label="语言" width="150">
                                <div slot-scope="scope" v-if="scope.row.status===0">{{scope.row.language}}</div>
                            </el-table-column>
                            <el-table-column width="50"> 
                                <div slot-scope="scope" v-if="scope.row.status===0">
                                    <span v-if="scope.row.isVip" style="color: red;">VIP</span>
                                </div>
                            </el-table-column>
                            <el-table-column   width="50"> 
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class="el-icon-folder-add" @click="addPlayLists(scope.row)" style="font-size: 18px;"></i>
                                </div> 
                            </el-table-column> 

                            <el-table-column   width="50" >
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class="el-icon-video-play" @click="playSong(scope.row)" style="font-size: 18px;"></i>
                                </div>  
                            </el-table-column> 
                            <el-table-column   width="50" >
                                <div slot-scope="scope"  v-if="scope.row.status===0">
                                    <i class=" el-icon-download" @click="downloadSong(scope.row)" style="font-size: 18px;"></i>
                                </div>  
                            </el-table-column> 
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="歌单" name="second">
                    <!-- 歌单界面 -->
                    <div class="play-list-constainer" v-if="this.total!==0">
                        <li class="play-list" v-for="(item,index) in Lists" v-bind:key="index">
                            <div v-if="item.authority!==-1">
                                <img :src="item.coverPicture" @click="goMenuInfo(item.id)"/>
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    <span style="flex-grow: 1;line-height: 50px;">{{item.menuName}}</span>
                                    <i class="el-icon-star-off" style="margin-right: 20px;" @click="collectMenu(item.id)"></i>
                                </div>
                            </div>
                        </li>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="专辑" name="third">
                    <div class="play-list-constainer" v-if="this.total!==0">
                        <li class="play-list" v-for="(item,index) in Lists" v-bind:key="index">
                            <div v-if="item.authority!==-1">
                                <!-- <img :src="item.coverPicture" @click="goMenuInfo(item.id)" style="height:100px;width:100px;margin-left: -40px;"/> -->
                                <el-image style="width: 130px; height: 130px;border-radius: 50%;" :src="item.coverPicture" fit="contain" @click="goAlbumInfo(item.id)"></el-image>
                                
                                <div style="display: flex;flex-direction: row;align-items: center;">
                                    <span style="flex-grow: 1;line-height: 50px;">{{item.menuName}}</span>
                                    <i class="el-icon-star-off" style="margin-right: 20px;" @click="collectMenu(item.id)"></i>
                                </div>
                            </div>
                        </li>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 分页组件 -->
        <div id="pagination" style="margin-left: 300px; margin-top:30px;position: fixed;bottom: 80px;" v-if="this.total!==0">
            <el-pagination  layout="total,  prev, pager, next, jumper" :total="total" :current-page.sync="pageNumber" 
            :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" background></el-pagination>
        </div>

         <!-- 空状态 -->
         <div style="display: flex;justify-content: center;" v-else >
            <el-image :src="nullImage" style="width: 400px; height: 400px" fit="contain"></el-image>
        </div>

         <!-- 选择收藏歌单 -->
         <el-dialog title="选择收藏歌单" :visible.sync="dialogVisible" width="30%">
            <el-radio-group v-model="sellectCollect">
                <li v-for="item in collectLists" v-bind:key="item.id">
                    <div v-if="item.authority!==-1" style="margin:10px">
                        <el-radio  :label="item.id" size="medium">{{item.menuName}}</el-radio>
                    </div>
                </li>
            </el-radio-group>
            <el-pagination layout="prev, pager, next" :total="collectMenuSum" :current-page.sync="pageNumberDialog" 
            :page-size="pageSizeDialog"  @current-change="handleCurrentChangeDialog" hide-on-single-page=true></el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>  
        </el-dialog>
    </div>
</template>

<script>
import {menuPublicPageAPI,menuPublicPageAlbumAPI,menuMyAPI,songPageAPI,menuMyPageAPI,menuMySongAPI,songPlayLoggedAPI } from '@/request/api';
import {collectMenuAPI} from '@/request/api'
import Song from '@/components/TheFooter.vue'

export default{
    data(){
        return{
            input:'',
            activeName: 'first',
            value:'',
            Lists:[],
            songLists:[],
            total:0,
            pageNumber: 1,
            pageSize: 6,
            sellectCollect:[],
            dialogVisible: false,                                       //弹出框
            sellectSong:'',

            nullImage:require("@/assets/images/null-image.png"),           //空状态图片
            imagePath:require("@/assets/images/playList-Image.png"),
            albumImagePath:require("@/assets/images/album-image.png"),

            //弹出框所需数据
            collectLists:[],                                             //收藏的歌单
            collectMenuSum:0,                                            //收藏的歌单的数量
            collectFlag:[],                                             //数据收藏信息
            pageSizeDialog:5,
            pageNumberDialog:1

        }
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
         //获取歌曲要加入的歌单中
       getCollectPlayLsits(){
        menuMyPageAPI({
                currentPage:this.pageNumberDialog,
                pageSize:this.pageSizeDialog,
            }).then(res =>{
                    if(res.success==true)
                    {
                        this.collectMenuSum=res.data.song_menu_page.total;
                        this.collectLists=res.data.song_menu_page.records
                        console.log(this.collectLists)
                        this.collectLists=this.coverPictureHandler(this.collectLists)
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
       },
       //提交收藏歌单
        onSubmit(){
            menuMySongAPI({
                songId:this.sellectSong,
                songMenuId:this.sellectCollect
                }).then(res =>{
                    if(res.data.success==true)
                        {
                            this.$message({
                                message:  res.data.message,
                                type: 'success'
                            });
                        }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                 type: 'warning'
                            });
                        }
            })
            this.dialogVisible=false;
        },
        addPlayLists(item){
            if(localStorage.getItem('token'))
            {
                this.sellectSong=item.id;
                console.log(this.sellectSong)
                this.sellectCollect=[];
                this.dialogVisible = true;
                this.getCollectPlayLsits()
                console.log(this.collectLists)
            }
            else
            {
                this.$message({
                                message: '未登录不能收藏！',
                                type: 'warning'
                            });
            }
        },
        //搜索函数
        search(e){
            this.total=0;
            console.log(this.input)
            if(this.input!=='' & e.keyCode===13)
            {
                if(this.activeName==='first')
                    this.getSearchSongLists();
                else if(this.activeName==='second')
                    this.getSearchPlayLists();
                else if(this.activeName=='third')
                    this.getSearchAlbumLists();
                else 
                    this.getSearchSonger();
            } 
        },
        // 改变每页大小
        handleSizeChange(val) {
        this.pageSize = val
        if(this.activeName==='first')
            this.getSearchSongLists();
        else if(this.activeName==='second')
            this.getSearchPlayLists();
        else if(this.activeName=='third')
            this.getSearchAlbumLists();
        else 
            this.getSearchSonger();
        },
        handleCurrentChangeDialog(val){
            this.pageNumberDialog = val
            this.getCollectPlayLsits();
        },
        // 改变当前页号
        handleCurrentChange(val) {
            if(this.activeName==='first')
                    this.getSearchSongLists();
            else if(this.activeName==='second')
                    this.getSearchPlayLists();
            else if(this.activeName=='third')
                    this.getSearchAlbumLists();
            else 
                    this.getSearchSonger();
        },
        handleClick() {
            this.total=0;
            console.log(this.activeName);
            if(this.activeName==='first')
                    this.getSearchSongLists();
                else if(this.activeName==='second')
                    this.getSearchPlayLists();
                else if(this.activeName=='third')
                    this.getSearchAlbumLists();
                else 
                    this.getSearchSonger();
        },
        //获取搜索歌曲
        getSearchSongLists(){
            songPageAPI({
                currentPage:this.pageNumber,
                pageSize:this.pageSize,
                songName:this.input,
                // singerName:this.input
            }).then(res =>{
                    if(res.success==true)
                    {
                        console.log(res)
                        this.total = res.data.song_page.total
                        this.Lists=res.data.song_page.records
                        console.log(res)
                        console.log(this.Lists)
                        console.log(this.total)
                        
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
        },
        getSearchSonger(){
            songPageAPI({
                currentPage:this.pageNumber,
                pageSize:this.pageSize,
                // songName:this.input,
                singerName:this.input
            }).then(res =>{
                    if(res.success==true)
                    {
                        console.log(res)
                        this.total = res.data.song_page.total
                        this.Lists=res.data.song_page.records
                        console.log(res)
                        console.log(this.Lists)
                        console.log(this.total)
                        
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
        },
        //获取搜索歌单
        getSearchPlayLists(){
            menuPublicPageAPI({
                    currentPage:this.pageNumber,
                    pageSize:this.pageSize,
                    menuName:this.input
                }).then(res =>{
                    if(res.success==true)
                    {
                        this.total = res.data.song_menu_page.total
                        this.Lists=res.data.song_menu_page.records
                        this.Lists=this.coverPictureHandler(this.Lists)
                        console.log(res)
                        console.log(this.Lists)
                        console.log(this.total)
                        
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
        },
        //获取搜索专辑
        getSearchAlbumLists(){
            menuPublicPageAlbumAPI({
                    currentPage:this.pageNumber,
                    pageSize:this.pageSize,
                    menuName:this.input
                }).then(res =>{
                    if(res.success==true)
                    {
                        this.total = res.data.album_page.total
                        this.Lists=res.data.album_page.records
                        this.Lists=this.coverPictureHandler(this.Lists)
                        console.log(this.Lists)
                        console.log(this.total)
                    }
                    else
                        {
                            this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                })
        },
        //收藏歌单/专辑
        collectMenu(song){
            if(localStorage.getItem('token')!==null)
            {
                console.log(song)
                    this.$confirm('确认要收藏？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        collectMenuAPI('/menu/collect/'+song+'}').then(res =>{
                            console.log(res)
                            if(res.data.success)
                            {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                if(this.activeName==='first')
                                    this.getSearchSongLists();
                                else if(this.activeName==='second')
                                    this.getSearchPlayLists();
                                else
                                    this.getSearchAlbumLists();
                            }
                            else
                                this.$message({
                                        message: res.data.message,
                                        type: 'warning'
                                    });
                        })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消!'
                });          
                });
            }
            else{
                this.$message({
                                message: '未登录不能收藏！',
                                type: 'warning'
                            });
            }
            
        },
        //播放指定
        playSong(song){
            console.log(song)
            this.$store.commit('playSong',song)
        },
        //下载指定歌曲
        downloadSong(song){
            console.log(song.id)
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

    },
    
    created(){
        window.addEventListener('keydown', this.search, true)
        this.input=this.$route.query.input
        console.log(this.$route.query.input)
        this.getSearchSongLists();
    }
}
</script>

<style lang="less" scoped>
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
  width:30%;
  height:auto;
  margin: 20px 10px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: 153px;
    height:100px;
  }
}
.container{
    margin:0 100px;
    // background: rgba(201,221,245, 0.4);
    height: 520px;
    border-radius: 20px;
    padding: 30px 100px;
    margin-top:20px;
}
.top-layout{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.search-container{
    display: flex;
    flex-direction: row;
    justify-items: center;
    // background-color: #fff;
    background: rgba(201,221,245, 0.4);

    border-radius: 20px;
    padding:10px;
    width:500px;
    justify-content: space-between;
}
.table{
    background-color:rgba(201,221,245, 0.4);
    margin:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.th{
    display: flex;
    flex-direction: row;
}
.el-icon-search:hover{
    color: rgb(24, 144, 255);
}
.el-icon-folder-add:hover{
    color: rgb(24, 144, 255);
}
.el-icon-video-play:hover{
    color: rgb(24, 144, 255);
}
.el-icon-star-off:hover{
    color: rgb(24, 144, 255);
}
.el-icon-download:hover{
    color: rgb(24, 144, 255);
}

</style>