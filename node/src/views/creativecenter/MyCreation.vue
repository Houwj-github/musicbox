<!-- 我的创作 -->
<template>
    <div>
        <div style="margin:20px 200px">
            <!-- 上传歌曲 -->
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="http://124.70.195.38:8000/compose/music"
                    :on-change="handleChange"
                    name="songFile"
                    :headers="uploadHeaders"
                    :before-upload="beforeSongUpload"
                    :file-list="fileList">
                    <el-button  icon="el-icon-folder-add" size="small" type="primary" round>上传歌曲</el-button>
                </el-upload>
            </div>
        <div class='a'>
            <table class="table_0">
                <tr style="height:50px;">
                    <td style="font-size:20px;width:150px;">歌曲名</td>
                    <td style="font-size:20px;width:150px;">歌手</td>
                    <td style="font-size:20px;width:150px;">类别</td>
                    <td style="font-size:20px;width:150px;">语言</td>
                    <td style="font-size:20px;width:150px;">状态</td>
                    <td style="font-size:20px;width:150px;">操作</td>
                </tr> 
                <tr v-for="(song, index) in displayedSongs" :key="index" class="col_td">
                    <td class="centent_i" @click="goSong(song.id,song.status)">
                        <i v-if="song.isVip" class="vip-layout" :class="{bg:song.isVip}">VIP</i>{{ song.songName }}</td>
                    <td>{{ song.singerName }}</td>
                    <td>{{ song.classification }}</td>
                    <td>{{ song.language }}</td>
                    <td :class="{ 'blue': song.status === 0, 'red': song.status === 1, 'gray': song.status === -1}">{{ song.status===0 ? '公开' : (song.status === 1 ? '私有' : '已删除')}}</td>
                    <td><i class="el-icon-edit" @click="editSong(index)"></i><i class="el-icon-delete" @click="removeSong(song.id)"></i></td>
                </tr>
            </table>
            <div class="pagechoice">
                <button @click="previousPage">上一页</button>
                <span>{{currentPage  }}/{{ pageCount }}</span>
                <button @click="nextPage"> 下一页</button>
            </div>
            <el-dialog title="修改歌曲信息" :visible.sync="dialogVisible" width="50%" >
                <el-form ref="form" :model="form" label-width="80px">
                    <div style="display:flex;flex-direction: row;align-items: center;">
                        <div class='b' >
                            <el-form-item label="歌曲名">
                                <el-input v-model="form.songName" :placeholder="tform.songName" style="width:100%"></el-input>
                            </el-form-item>
                            <el-form-item label="歌手名">
                                <el-input v-model="form.singerName" :placeholder="tform.singerName" style="width:100%"></el-input>
                            </el-form-item>
                            <el-form-item label="歌曲分类">
                                <el-input v-model="form.classification" :placeholder="tform.classification" style="width:100%"></el-input>
                            </el-form-item>
                            <el-form-item label="vip歌曲">
                                <el-radio-group v-model="form.isVip">
                                <el-radio label="true">是</el-radio>
                                <el-radio label="false">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="语言">
                                <el-input v-model="form.language" :placeholder="tform.language" style="width:100%"></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="form.status">
                                    <el-radio label=0>公开(所有人可见)</el-radio>
                                    <el-radio label=1>私有(仅自己可见)</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div style="display:flex;flex-direction: column;align-items: center;margin: auto;">
                                <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
                                <div class="uploadcover-container" @click="handleClick">
                                    <span v-if="!form.coverPicture" style="font-size:50px;color:rgba(54, 148, 255,0.8)">+</span>
                                    <img :src="form.coverPicture" v-else>
                                </div>
                            <div class="coverfont">
                                <label>上传封面</label>
                            </div>
                        </div>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>  
            </el-dialog>
        </div>
    </div>
    
</template>

<script>
import {getUploadSongAPI} from '@/request/api'
import {editUploadSongInfoAPI} from '@/request/api'
import {delUploadSongAPI} from '@/request/api'
import {editUploadSongStatusAPI} from '@/request/api'

export default{
    data(){
        return{
            uploadHeaders:{"token":localStorage.getItem('token')},          //token
            dialogVisible: false,   //弹出框
            songs: {
                records:[]
            },
            tform:{
                classification: "",
                coverPicture: "",
                createTime: "",
                fileDirectory: "",
                id: "",
                isVip: "",
                issueTime: "",
                language: "",
                singerName: "",
                songName: "",
                status:0,
                updateTime: "",
                userId: "",
            },
            form:{
                classification: "",
                coverPicture: "",
                createTime: "",
                fileDirectory: "",
                id: "",
                isVip: "",
                issueTime: "",
                language: "",
                singerName: "",
                songName: "",
                status: 0,
                updateTime: "",
                userId: "",
            },
            pageSize:10,
            currentPage:1
        }
    },
    computed:{
        pageCount(){
            return Math.ceil(this.songs.records.length/this.pageSize)
        },
        displayedSongs(){
            const startIndex=(this.currentPage-1)*this.pageSize
            const endIndex=startIndex+this.pageSize
            return this.songs.records.slice(startIndex,endIndex)
        }
    },
    methods:{
        refresh() {
            this.getUploadSong()
        },
        previousPage(){
            if(this.currentPage>1){
                this.currentPage--
            }
        },
        nextPage(){
            if(this.currentPage<this.pageCount){
                this.currentPage++
            }
        },
        getUploadSong(){
            getUploadSongAPI({
                pageNum: 1,                    
                pageSize: 20,
            }).then(res=>{
                console.log(res)
                if(res.success){
                    this.songs=res.data.song_page
                }

            })

        },
        editSong(index){
            this.dialogVisible=true,
            this.tform=this.songs.records[index],
            this.form.id=this.songs.records[index].id,
            this.form.userId=this.songs.records[index].userId
        },
        removeSong(i){
            var id=i
            var url='/'+id
            delUploadSongAPI(url).then(res=>
            {
                console.log(res)
                if(res.data.success){
                    this.$message({
                    message: '删除成功！',
                    type: 'success'
                    });
                    this.getUploadSong()
                }
                else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })

        },
        handleClose(done) {
        this.$confirm('确认提交？')
          .then(_ => {
            editUploadSongInfoAPI({                    
                classification:this.form.classification,    
                coverPicture:this.form.coverPicture,
                id:this.form.id,
                isVip: this.form.isVip,
                language:this.form.language,
                singerName:this.form.singerName,
                songName:this.form.songName,
            }).then(res => 
            {
                console.log(res)
                console.log(this.form)
                //修改成功
                if(res.data.success){
                    this.$message({
                    message: '修改成功！',
                    type: 'success'
                    })
                    this.getUploadSong()
                }
                else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                
            }),
            editUploadSongStatusAPI({
                musicId:this.form.id,
                status:this.form.status
            }).then(res=>{
                console.log(res)
            })
            done();
          })
          .catch(_ => {});
          this.dialogVisible = false;
      },
      handleClick() {
            // 模拟点击上传按钮
            this.$refs.fileInput.click()
        },
      handleFileChange(e) {
            const file = e.target.files[0]
            if (!file) {
                return
            }
            // 读取图片文件
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.form.coverPicture = reader.result
            }
        },
        onSubmit(){
            this.handleClose();
        },
        goSong(id,status){
            this.$router.push({path: '/main/song?song_id='+id});
        }
    },

    created(){
        this.getUploadSong()
    },
    // watch:{
    //     songs(){
    //         this.refresh()
    //     }
    // }
}
</script>

<style lang="less" scoped>
.a{
    margin:0 200px;
    padding:30px 100px;
    height:500px;
    border-radius: 15px;
    // border: 1px solid #409EFF;
    background: rgba(201, 221, 245,0.4);
    text-align: center;
}
.table_0{
    margin: auto;
    width:95%;
}
.table_0 td{
    text-align:center;
}
.col_td{
    height:48px; 
}
.col_td:hover{
     color:blue;
}
.col_td td{
    width:150px;
    font-size:15px;
    font-family: 思源黑体;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
.col_td td:hover{
    overflow: visible;
    z-index: 1;
}
.red{
    color:red;
}
.blue{
    color:blue;
}
.gray{
    color:gray;
}
.pagechoice{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
.centent_i{
    margin:10px;
    display: flex;
    flex-direction: row;
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
.el-icon-edit{
    color: #65a1f4;
    margin-right:10px;
}
.el-icon-edit:hover{
    color: #122dde;
    font-weight:bolder;
}
.el-icon-delete{
    color:#f36464;
}
.el-icon-delete:hover{
    color:red;
    font-weight:bolder;
}
</style>