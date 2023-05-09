<!-- 我的创作 -->
<template>
    <div class='a'>
        <table class="table_0">
            <tr style="height:50px;">
                <td style="font-size:20px;width:110px;">歌曲名</td>
                <td style="font-size:20px;width:110px;">歌手</td>
                <td style="font-size:20px;width:110px;">类别</td>
                <td style="font-size:20px;width:110px;">语言</td>
                <td style="font-size:20px;width:110px;">时长</td>
                <td style="font-size:20px;width:110px;">审核状态</td>
            </tr> 
            <tr v-for="(song, index) in displayedSongs" :key="index" class="col_td">
                <td>{{ song.name }}</td>
                <td>{{ song.singer }}</td>
                <td>{{ song.category }}</td>
                <td>{{ song.language }}</td>
                <td>{{ song.time }}</td>
                <td :class="{ 'red': song.status === '审核中', 'blue': song.status === '已发布' }">{{ song.status }}</td>
            </tr>
        </table>
        <div class="pagechoice">
            <button @click="previousPage">上一页</button>
            <span>{{currentPage  }}/{{ pageCount }}</span>
            <button @click="nextPage"> 下一页</button>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            songs: [
            { id: 1, name: '歌曲1', singer: '歌手1', category: '流行', language: '中文',time:'3:30', status: '审核中' },
            { id: 2, name: '歌曲2', singer: '歌手2', category: '摇滚', language: '英文',time:'3:30',  status: '已发布' },
            { id: 3, name: '歌曲3', singer: '歌手3', category: '电子', language: '日语',time:'3:30',  status: '审核中' },
            { id: 4, name: '歌曲4', singer: '歌手4', category: '民谣', language: '中文',time:'3:30',  status: '审核中' },
            { id: 5, name: '歌曲5', singer: '歌手5', category: '流行', language: '英文',time:'3:30',  status: '审核中' },
            { id: 6, name: '歌曲6', singer: '歌手6', category: '摇滚', language: '中文',time:'3:30',  status: '审核中' },
            { id: 7, name: '歌曲7', singer: '歌手7', category: '电子', language: '英文',time:'3:30',  status: '审核中' },
            { id: 8, name: '歌曲8', singer: '歌手8', category: '民谣', language: '中文',time:'3:30',  status: '审核中' },
            { id: 9, name: '歌曲9', singer: '歌手9', category: '流行', language: '日语',time:'3:30',  status: '审核中' },
            { id: 10, name: '歌曲10', singer: '歌手10', category: '摇滚', language: '英文',time:'3:30',  status: '审核中' }
        ],
        pageSize:10,
        currentPage:1
        }
    },
    computed:{
        pageCount(){
            return Math.ceil(this.songs.length/this.pageSize)
        },
        displayedSongs(){
            const startIndex=(this.currentPage-1)*this.pageSize
            const endIndex=startIndex+this.pageSize
            return this.songs.slice(startIndex,endIndex)
        }
    },
    methods:{
        previousPage(){
            if(this.currentPage>1){
                this.currentPage--
            }
        },
        nextPage(){
            if(this.currentPage<this.pageCount){
                this.currentPage++
            }
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
    text-align: center;
}
.table_0{
    margin: auto;
    width:90%;
}
.table_0 td{
    text-align:center;
}
.col_td{
    height:38px;
}
.col_td td{
    width:110px;
    font-size:15px;
    font-family: 思源黑体;
}
.red{
    color:red;
}
.blue{
    color:blue;
}
.pagechoice{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>