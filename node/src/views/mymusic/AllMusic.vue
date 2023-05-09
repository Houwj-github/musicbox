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

        <!-- <div style="margin-top:20px;">
            <el-table :data="tableData" >
                <el-table-column fixed prop="date" label="日期" width="150" ></el-table-column>
                <el-table-column prop="name" label="姓名"  width="120"></el-table-column>
                <el-table-column prop="province" label="省份" width="120"></el-table-column>
                <el-table-column prop="city" label="市区" width="120"></el-table-column>
                <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div> -->
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            value:'',
            options: [{
                    value: '时间',
                    }, {
                    value: '次数',
                }],
                tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
        }
    },
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
.el-table tr{
    background-color: rgba(201,221,245, 0.4);
}
</style>

