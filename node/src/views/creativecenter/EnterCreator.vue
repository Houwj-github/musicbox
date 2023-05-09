<template>
    <form>
        <div class="a">
            <div class='b' >
                <div class='c'>
                    <label for="name">*艺名：</label>
                    <input type="text" id="name" v-model="artist.name" required>
                </div>
                <div class='c'>
                    <label for="works">*代表作：</label>
                    <input type="text" id="works" v-model="artist.works" required>
                </div>
                <div class='c'>
                    <label for="achievements">*主要成就：</label>
                    <input type="text"  id="achievements" v-model="artist.achievements" required>
                </div>
                <div class='c'>
                    <label for="experience">*演艺经历：</label>
                    <input type="text" id="experience" v-model="artist.experience" required>           
                </div>
                <div class='c'>
                    <label for="region">*所属地区：</label>
                    <input type="text" id="region" v-model="artist.region" required>
                </div>
                <div class='c'>
                    <label for="agency">经纪公司：</label>
                    <input type="text" id="agency" v-model="artist.agency">
                </div>
                <div class='c_re'>
                    <label for="resume">*个人简介：</label>
                    <textarea id="resume" v-model="artist.resume" required></textarea>
                </div>
            </div>
        </div>
        <div class="button-form">
            <button type="button" @click="submit">完成</button>
        </div>
    </form>
</template>

<script>
export default{
    data(){
        return{
            artist:{
                name:'',
                works:'',
                achievements:'',
                experience:'',
                region:'',
                agency:'',
                resume:''
            }
        }
    },
    methods:{
        submit(){
            /*
            axios.post('/user/upgrade/creator',this.artist)
                  .then(reponse=>{
                    //成功后的操作
                    console.log(response)
                  })
                  .catch(error=>{
                    console.log(error)
                  })
            */
        }
    }

}
</script>

<style lang="less" scoped>
form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.a{
    margin:0 200px;
    padding:30px 100px;
    height:500px;
    border-radius: 15px;
    background: rgba(201, 221, 245,0.4);
}
.b{
    margin:auto 200px;
    height:400px;
    display:flex;
    flex-direction: column;
}
.c{
    width:400px;
    padding:20px 5px;
}
.c input{
    height:25px;
    width:250px;
    border:1px solid #ccc;
    border-radius:10px;
}
.c_re{
    width:400px;
    height: 300px;
    padding:20px 5px;
    position: relative;
}
.c_re label{
    display: inline-block;
    vertical-align: top;
}
.c_re textarea{
    height:45px;
    width:250px;
    border:1px solid #ccc;
    border-radius:10px;
    overflow-y: auto;
    display: inline-block;
    vertical-align: top;
    resize: none;
}
.button-form{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
button{
    width:120px;
    height:40px;
    background-color: rgb(24, 144, 255);
    border: 1px solid #ccc;
    border-radius:20px;
    color:white;
    font-size:23px;
}
button:hover{
    border-color:#333;
}
</style>