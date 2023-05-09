<!-- 上传歌曲 -->
<template>
    <div class='a'>
        <form @submit.prevent="submitForm">
            <div style="display:flex;flex-direction: row;align-items: center;">

                <div class='b' >
                    <div class='c'>
                        <label for="songName">*歌曲名：</label>
                        <input type="text" id="songNmae" v-model="songName" required>
                    </div>
                    <div class='c'>
                        <label for="artistName">*作者名：</label>
                        <input type="text" id="artistNmae" v-model="artistName" required>
                    </div>
                    <div class='c'>
                        <label for="songCategory">*歌曲类别：</label>
                        <input type="text" id="songCategory" v-model="songCategory" required>
                        <!--
                        <select id="songCategory" v-model="songCategory" required>
                            <option value="">请选择类别</option>
                            <option value="pop">流行</option>
                            <option value="rock">摇滚</option>
                            <option value="jazz">爵士</option>
                        </select>
                        -->   
                    </div>
                    <div class='c'>
                        <label for="songLanguage">*语言：</label>
                        <input type="text" id="songLanguage" v-model="songLanguage" required>
                        <!--
                        <select id="songLanguage" v-model="songLanguage" required>
                            <option value="">请选择语言</option>
                            <option value="chinese">中文</option>
                            <option value="english">英语</option>
                            <option value="japanese">日语</option>
                        </select>
                        -->   
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
                        <label>歌曲封面</label>
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
            songName:'',
            artistName:'',
            songCategory:'',
            songLanguage:'',
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
        handleSongChange(event){
            this.songFile=event.target.files[0]
        },
        submitForm(){
            const formData=new FormData()
            formData.append('songName',this.songName)
            formData.append('artistName',this.artistName)
            formData.append('songCategory',this.songCategory)
            formData.append('songLanguage',this.songLanguage)
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
    width:200px;
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