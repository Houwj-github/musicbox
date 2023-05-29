<template>
    <div class="container">
        <div class="top-layout">
            <div class="search-container">
                <i class="el-icon-search"></i>
                <input type="text" name="search" style="border:none;width:90%;margin:auto;outline:none;"/>
            </div>

            <el-select v-model="value" placeholder="排序" style="width:80px;margin-left: 150px;">
                <el-option v-for="item in options" :key="item.value" :value="item.value" ></el-option>
            </el-select>
        </div>

        <div class="table">
            
        </div>
    </div>
</template>

<script>
import {menuMyPageAPI} from '@/request/api';
export default{
    data(){
        return{
            value:'',
            options: [{
                    value: '时间',
                    }, {
                    value: '次数',
                }],
                
        }
    },
    methods:{
        check(){
            var id='1655115610121822210'
            var url='/menu/my/'+id+'}'
                menuMyPageAPI(url)
                .then(res => 
                {
                    console.log(res)
            })
        }
    },
    created(){
        // this.check()
    }
}
</script>

<style lang="less" scoped>

.container{
    margin:0 200px;
    background: rgba(201,221,245, 0.4);
    height: 400px;
    border-radius: 20px;
    padding: 30px 100px;
    margin-top:40px;
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
    background-color: #fff;
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
</style>

