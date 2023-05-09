<!-- 创建专辑 -->
<!-- 上传歌曲 -->
<template>
    <div class='a'>
        <form @submit.prevent="submitForm">
            <div style="display:flex;flex-direction: row;align-items: center;">

                <div class='b' >
                    <div class='c'>
                        <label for="albumName">*专辑名：</label>
                        <input type="text" id="albumNmae" v-model="albumName" required>
                    </div>
                    <div class='c'>
                        <label for="artistName">*作者名：</label>
                        <input type="text" id="artistNmae" v-model="artistName" required>
                    </div>
                    <div class='c'>
                        <label for="albumIntro">*专辑介绍：</label>
                        <input type="text" id="albumIntro" v-model="albumIntro" required>
                    </div>
                    <div class='c'>
                        <label for="songFile" class="file_upload">
                            <i class="fa fa-cloud-upload"></i>选择歌曲
                        </label>
                        <input type="file" id="songFile" style="display: none" @change="handleSongChange" required>
                    </div>
                </div>
                <div style="display:flex;flex-direction: column;align-items: center;">
                    <div>
                        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
                        <div class="uploadcover-container" @click="handleClick">
                            <span v-if="!coverUrl" style="font-size:50px;color:rgba(54, 148, 255,0.8)">+</span>
                            <img :src="coverUrl" v-else>
                        </div>
                    </div>
                    <div class="coverfont">
                        <label>专辑封面</label>
                    </div>
                </div>
            </div>
            <button type="submit" class="uploadbutton" >上传</button>
        </form>
    </div>
</template>

<script>
export default{
    data(){
        return{
            albumName:'',
            artistName:'',
            albumIntro:'',
            coverUrl:'',
            songFile:null
        }
    },
    methods:{
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
                this.coverUrl = reader.result
            }      
        },
        /*handleCoverChange(event){
            const file=event.target.files[0]
            this.coverUrl=URL.createObjectURL(file)
        },*/
        handleSongChange(event){
            this.songFile=event.target.files[0]
        },
        submitForm(){
            const formData=new FormData()
            formData.append('albumName',this.albumName)
            formData.append('artistName',this.artistName)
            formData.append('albumIntro',this.albumIntro)
            formData.append('songCover',this.songFile)
            formData.append('songFile',this.songFile)
            
            //发送表单数据到后端进行处理
        }
    }
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
}

.b{
    height:400px;
    display:flex;
    flex-direction: column;
}
.c{
    width:400px;
    padding:20px 5px;
}
.c input{
    height:22px;
    border:1px solid #ccc;
}
.file_upload{
    width:80px;
    margin:20px 50px;
    border:1px solid #ccc;
    display:inline-block;
    padding:6px 12px;
    //cursor:pointer;
    border-radius:15px;
    color:rgb(255, 255, 255);
    background-color: rgb(24, 144, 255);
    font-size:14px;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
}
.file_upload:hover{
    border-color:#333;
}
.uploadcover-container {
  margin:auto 50px;
  width: 200px;
  height: 250px;
  border: 1px dashed #ccc;
  border-radius: 15px;
  background:rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.uploadcover-container img {
  max-width: 100%;
  max-height: 100%;
}
.coverfont{
    margin:10px auto;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
}
.uploadbutton{
    width:150px;
    height:50px;
    margin:auto 300px;
    background-color: rgb(24, 144, 255);
    border: 1px solid #ccc;
    border-radius:20px;
    color:white;
    font-size:23px;
}
.uploadbutton:hover{
    border-color:#333;
}
</style>