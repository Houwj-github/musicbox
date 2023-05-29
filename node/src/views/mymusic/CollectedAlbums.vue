<!-- 收藏的专辑 -->
<template>
    <div style="margin:30px 200px;">
        <div class="play-list-constainer" v-if="this.total!==0">
            <li class="play-list" v-for="(item,index) in alubmLists" v-bind:key="index">
                <div v-if="item.authority!==-1">
                        <el-image style="width: 120px; height: 120px;border-radius: 50%;" :src="item.coverPicture" 
                        fit="cover" @click="goAlbumInfo(item.id)"></el-image>
                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <span style="flex-grow: 1;line-height: 50px;margin-left: 50px;">{{item.menuName}}</span>
                        <i class="el-icon-delete" style="margin-right: 20px;" @click="deleteAlbumList(index)"></i>
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
import {menuCollectPageAlbumAPI, delCollectMenu} from '@/request/api'

export default{
    data(){
        return{
            alubmLists:[],
            total: 0,
            pageNumber: 1,
            pageSize: 6,

            imagePath:require("@/assets/images/album-image.png"),
            nullImage:require("@/assets/images/null-image.png"),           //空状态图片
        }
    },
    methods:{
            goAlbumInfo(id){
                console.log(id)
                this.$router.push({path: '/main/collectalbum?collectAlbumID='+id});
            },
            // 改变每页大小
            handleSizeChange(val) {
            this.pageSize = val
            this.getCollectAlbumLsits()
            },

            // 改变当前页号
            handleCurrentChange(val) {
            this.pageNumber = val
            this.getCollectAlbumLsits()
            },
         //删除收藏歌单
         deleteAlbumList(index){
            console.log(index)
            this.$confirm('确认要删除此专辑？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCollectMenu(this.alubmLists[index].id+'}').then(res =>{
                    console.log(res)
                    if(res.data.success)
                    {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getCollectAlbumLsits()
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
        goAlbumList(index){
            console.log(index)
        },
        getCollectAlbumLsits(){
          menuCollectPageAlbumAPI({
            currentPage:this.pageNumber,
            pageSize:this.pageSize,
          }).then(res =>{
                  if(res.success==true)
                  {
                      this.total = res.data.album_page.total
                      this.alubmLists=res.data.album_page.records
                      console.log(this.alubmLists)
                      console.log(this.total)

                      this.alubmLists= this.coverPictureHandler(this.alubmLists)
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
      this.getCollectAlbumLsits()
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
  height:180px;
  margin: 20px 10px;
  img{
    border-radius: 50%;
    flex-grow: 1;
    width: 130px;
    height:130px;
    margin-left: 45px;
  }
  el-image:hover{
    opacity: 0.7;
  }
}
.el-image:hover{
    opacity: 0.7;
  }
.el-icon-delete:hover {
    color: red;
}
</style>