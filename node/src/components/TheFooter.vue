<template>
    <div style="padding-top: 60px;" class="audio-player">
        <el-footer >
            <el-row style="height: 100%;margin:auto">
                <el-col :span="4" :offset="2">
                    <audio ref="audio-player"></audio>
                    <div style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin-top: 10px;">
                        <i class="el-icon-caret-left" style="font-size: 30px;" @click="musicPlay('pre')" ></i>
                        <i :class="play==false?'el-icon-video-play':'el-icon-video-pause'" style="font-size: 40px;" @click="musicPlay('play')" ></i>
                        <i class="el-icon-caret-right" style="font-size: 30px;" @click="musicPlay('next')" ></i>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div style="margin-left: 50px;display: flex;align-items: center;" >
                        <div @click="goSongInfo" style="margin-top:10px">
                            <el-image style="width: 40px; height: 40px;border-radius: 50%;" fit="cover" :src="list.coverPicture" :class="play==false?'':'img'" ></el-image>
                        </div>
                        <div style="display: flex;flex-direction: column;margin-left: 20px;line-height: 15px;width:60%;">
                            <span >{{list.songName}}</span>
                            <el-slider v-model="sliderVal" :format-tooltip="formatTooltip" :min="sliderMin" :max="sliderMax"  @change="spliderSelect"></el-slider>
                        </div>
                        <span style="margin-left: 20px;margin-bottom: -15px;color: #1989FA;">{{currentTime}}</span>
                        <span style="margin-bottom: -15px;">/{{duration}}</span>
                    </div>
                </el-col>
                <el-col :span="4" >
                    <div style="display: flex;flex-direction: row;justify-content:start;margin-top:20px">
                        <i class="el-icon-folder-add" style="font-size: 18px;" @click="addPlayLists" ></i>
                        <i class="el-icon-download" style="font-size: 18px;margin-left: 50px;" @click="downloadSong" ></i>
                    </div>
                </el-col>
            </el-row>
        </el-footer>

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
            :page-size="pageSizeDialog"  hide-on-single-page=true></el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>  
        </el-dialog>
    </div>
</template>   

<script>
import axios from 'axios';
import CreatedPlayLists from '@/views/mymusic/CreatedPlayLists.vue';
import Vue from 'vue';
import {songPlayLoggedAPI,menuMySongAPI,menuCollectPageAPI,menuMyPageAPI} from '@/request/api'

export default{
    data(){
        return{
            dialogVisible:false,
            box: undefined,
            index: 0, // 当前播放的音乐素质索引
            play: this.GLOBAL.play, // 播放状态，true为正在播放
            sliderVal: 0, // 这个对接当前时长。
            sliderMin: 0,
            sliderMax: 0, // 这个对接总时长。
            // sliderValVolumn: 0.5, // 音量
            copySliderValVolumn: 0.5,
            duration: undefined, // 音乐总时长
            currentTime: undefined, //当前播放时长

            list:[],
            sellectCollect:[],

            //弹出框所需数据
            collectLists:[],                                             //收藏的歌单
            collectMenuSum:0,                                            //收藏的歌单的数量
            collectFlag:[],                                             //数据收藏信息
            pageSizeDialog:5,
            pageNumberDialog:1
        }
    },
    methods:{
        init() {
            this.index=0;
            this.list=this.$store.state.songLists
            console.log(this.list)
            this.playSong()
            this.box = this.$refs["audio-player"];
            // this.playSong();   //这个位置还有一些错误
            console.log(this.list.id)
            this.box.src ='http://124.70.195.38:8000/song/play/guest/'+this.list.id;
            console.log(this.box, "音频播放器DOM");
            const that = this;

            //  this.duration  =  this.formatTime(this.box.duration)
            // 绑定三个触发方法
            // 当时长有变化时触发，由"NaN"变为实际时长也算
            this.box.ondurationchange = function () {
                console.log("时长发生了变化");
                console.log(that.box.duration);
                // that.
                // that.duration  =  that.formatTime(that.box.duration)
                that.sliderMax = Math.floor(that.box.duration);
                that.updateTime();
            };
            // 当前数据可用是触发
            this.box.oncanplay = function () {
                console.log("已经可以播放了");
            };
            // 播放位置发送改变时触发。
            this.box.ontimeupdate = function () {
                console.log("播放位置发送了变动");
                that.updateTime();
            };
            // 音频播放完毕
            this.box.onended = function () {
                console.log("播放完毕，谢谢收听");
                // this.GLOBAL.play=false;
                this.$store.commit('pauseSong');
                this.play=false;
            };
            // 音频播放完毕
            this.box.onerror = function () {
                console.log("加载出错！");
            };
            },
            changeVolumns() {
            // 静音切换
            if (this.sliderValVolumn > 0) {
                this.sliderValVolumn = 0;
            } else {
                this.sliderValVolumn = this.copySliderValVolumn;
            }
        },
        // 播放
    musicPlay(flag) {
        // this.list=this.$store.state.songLists;
        this.play=this.$store.state.isplay;
        switch (flag) {
            case "pre":
                this.box.src = 'http://124.70.195.38:8000/song/play/guest/'+this.list.id;
                this.init();
                if (this.play) {
                    this.box.play();
                } else {
                    this.box.pause();
                }
                break;
            case "play":
                this.$store.commit('pauseSong')
                this.play=!this.play
                console.log(this.play)
                if (this.play) {
                    this.box.play();
                } else {
                    this.box.pause();
                }
                break;
            case "next":
                this.box.src = 'http://124.70.195.38:8000/song/play/guest/'+this.list.id;
                this.init();
                if (this.play) {
                    this.box.play();
                } else {
                    this.box.pause();
                }

                break;
        }
    },
    formatTooltip(val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = this.formatTime(val);
      return time.min+':'+time.sec;
    },
    updateTime() {
      const total = this.formatTime(this.box.duration);
      const current = this.formatTime(this.box.currentTime);
      this.duration = total.min+':'+total.sec;
      this.currentTime = current.min+':'+current.sec;
      // 值为xx.xxxxx 需要取整
      this.sliderVal = Math.floor(this.box.currentTime);
    },
    formatTime(time) {
      // 格式化毫秒，返回String型分秒对象

      if (!time) return { min: "00", sec: "00" };
      return {
        min: Math.floor(time / 60).toString().padStart(2, "0"),
        sec: Math.floor(time % 60).toString().padStart(2, "0"),
      }
    },
    closeAudioPlay() {
      this.isShowAudioPlayer = false;
    },
    spliderSelect() {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      this.box.currentTime = this.sliderVal;
    },
    playSong(){
        var token=localStorage.getItem('token')
            console.log(token)
            if(token===null)
                this.box.src ='http://124.70.195.38:8000/song/play/guest/'+this.list.id;
            else
                this.box=songPlayLoggedAPI('/song/play/logged/'+this.list.id).then(res =>{
                console.log(res)
                if(res.success==true)
                {
                    this.$message({
                    message: res.message,
                    type: 'success'
                    });
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
        //提交收藏歌单
        onSubmit(){
            menuMySongAPI({
                songId:this.list.id,
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
           //收藏歌单界面
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
        addPlayLists(){
            if(localStorage.getItem('token'))
            {
                
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
        //下载当前歌曲
        downloadSong(){

        },
        //去歌曲信息界面
        goSongInfo(){
            // console.log('111')
            this.$router.push({path: '/main/song?song_id='+this.list.id});
        },
    },
    watch: {
        //此时我监听的是对象，当$store.state.userInfo.Name发生修改时，此时需要深度监听才能监听到数据变化
        "$store.state.songLists":{
            deep:true,//深度监听设置为 true
            handler:function(newVal,oldVal){
                console.log("数据发生变化啦"); //修改数据时，能看到输出结果
                console.log(newVal,oldVal);
                this.list[0]=newVal;
                this.index=0;
                this.init()
                if(this.play)
                    this.box.play();
                else
                    this.box.pause();
                }
            },
        "$localStorage.getItem('token')":{
            deep:true,//深度监听设置为 true
                handler:function(newVal,oldVal){
                console.log("数据发生变化啦"); //修改数据时，能看到输出结果
                console.log(newVal,oldVal);
                this.list=newVal;
                console.log(this.list)
                this.init();
                if(this.play)
                    this.box.play();
                else
                    this.box.pause();
                 }
            }
        },

    mounted() {
        this.init();
        this.play=this.$store.state.isplay;
    },
    created(){
        this.init();

        this.$watch(
            function () {  // 第一个函数就是处理你要监听的属性，只要将其return出去就行
                return this.form['zh-CN']
            },
            function (val, oldVal) {
            }
    )
  }
}

</script>

<style lang="less" scoped>
.el-footer{
	position: fixed;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	background: rgb(248, 248, 248);
	width: 100%;
    line-height: 60px;
}
.el-icon-caret-left:hover{
    color: rgb(24, 144, 255);
}
.el-icon-video-play:hover{
    color: rgb(24, 144, 255);
}
.el-icon-caret-right:hover{
    color: rgb(24, 144, 255);
}
.el-icon-star-off:hover{
    color: rgb(24, 144, 255);
}
.el-icon-video-pause:hover{
    color: rgb(24, 144, 255);
}
.el-icon-download:hover{
    color: rgb(24, 144, 255);
}
.img {
        animation: rotate 10s linear infinite;
        -webkit-user-drag: none;
}
.el-icon-folder-add:hover{
    color: rgb(24, 144, 255);
}
</style>