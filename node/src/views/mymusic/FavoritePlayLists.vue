<!-- 收藏的歌单 -->
<template>
    <div style="margin:30px 200px;">
  
        <!-- 歌单界面 -->
        <div class="play-list-constainer" v-if="this.total!==0">
            <li class="play-list" v-for="(item,index) in playLists" v-bind:key="index">
                <div v-if="item.authority!==-1">
                    <!-- <img :src="item.coverPicture" @click="goMenuInfo(item.id)"/> -->
                    <el-image style="width: 153px; height: 100px;border-radius: 20px;" :src="item.coverPicture" fit="cover" @click="goMenuInfo(item.id)"></el-image>

                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <span style="flex-grow: 1;line-height: 50px;">{{item.menuName}}</span>
                        <i class="el-icon-delete" style="margin-right: 20px;" @click="deletePlayList(index)"></i>
                    </div>
                </div>
            </li>
        </div>

        <!-- 分页组件 -->
        <div id="pagination" style="margin-left: 350px; bottom: 80px;position: fixed;" v-if="this.total!==0">
            <el-pagination  layout="total,  prev, pager, next, jumper" :total="total" :current-page.sync="pageNumber" 
            :page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" background></el-pagination>
        </div>

         <!-- 空状态 -->
         <div style="display: flex;justify-content: center;" v-else >
            <el-image :src="nullImage" style="width: 400px; height: 400px" fit="contain"></el-image>
        </div>
    </div>
</template>

<script>
import {menuCollectPageAPI,delCollectMenu} from '@/request/api'

export default{
    data(){
        return{
            playLists:[],
            total: 0,
            pageNumber: 1,
            pageSize: 6,

            imagePath:require("@/assets/images/playList-Image.png"),
            nullImage:require("@/assets/images/null-image.png"),           //空状态图片
        }
    },
    methods:{
        goMenuInfo(id){
                console.log(id)
                this.$router.push({path: '/main/collectmenu?collectMenuID='+id});
        },
        // 改变每页大小
        handleSizeChange(val) {
        this.pageSize = val
        this.getCollectPlayLsits()
        },

        // 改变当前页号
        handleCurrentChange(val) {
        this.pageNumber = val
        this.getCollectPlayLsits()
        },
        //删除收藏歌单
        deletePlayList(index){
            console.log(index)
            this.$confirm('确认要删除此歌单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCollectMenu(this.playLists[index].id+'}').then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getCollectPlayLsits()
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
        },
        //去歌单展开界面
        goPlayList(index){
            console.log(index)
        },
        //初始化收藏歌单界面
       getCollectPlayLsits(){
        console.log(this.pageSize)
        menuCollectPageAPI({
            currentPage:this.pageNumber,
            pageSize:this.pageSize,
        }).then(res =>{
                if(res.success==true)
                {
                    this.total = res.data.song_menu_page.total
                    this.playLists=res.data.song_menu_page.records
                    console.log(this.playLists)
                    console.log(this.total)

                    this.playLists= this.coverPictureHandler(this.playLists)
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
      this.getCollectPlayLsits();
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
  height:150px;
  margin: 20px 10px;
  img{
    border-radius: 20px;
    flex-grow: 1;
    width: 153px;
    height:100px;
    margin-left: 40px;
  }
  img:hover{
    opacity: 0.7;
  }
}
.el-icon-delete:hover {
    color: red;
}

</style>