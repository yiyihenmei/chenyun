<template>
    <div>
        <p class="navTitle">
            {{this.$route.name}}
        </p>
        <!-- 状态 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formName">
            <el-form-item label="学员状态">
                <el-select v-model="formInline.status" placeholder="请选择">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学员名称">
                <el-input v-model="formInline.nickname" placeholder="请输入学生关键字"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" icon="el-icon-search">搜索</el-button>
                <el-button @click="reset" icon="el-icon-refresh-left">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button type="primary" class="btn1">新增学员</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">查看报表</el-button>
        <!-- 表格 -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column prop="nickname" label="学员姓名">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" />{{ scope.row.nickname }}
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status===1">启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" align="center">
                <!-- 1.时间戳方法 new Date -->
                <!-- <template slot-scope="{row:{created_at}}">
                    {{new Date(Number(created_at)).toLocaleString()}}
                </template> -->
                <!-- 2.原生js和3.第三方插件引入 -->
                <!-- <template slot-scope="{row:{created_at}}">
                    {{formatDateTime(created_at)}}
                </template> -->
                <!-- 4.main.js 里面引入Vue.prototype.$moment=moment 国际时间戳-->
                <!-- <template slot-scope="{row:{created_at}}">
                    {{$moment(created_at*1000)}}
                </template> -->
                <!-- 5.本命方法 p6四哥教的方法--全局注册 -->
                <template slot-scope="{row:{created_at}}" align="center">
                    {{created_at|dateFormat(created_at*1000)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <el-button type="text">详情</el-button>
                <el-button type="text">编辑</el-button>
                <el-button type="text">禁用</el-button>
                <el-button type="text">删除</el-button>
                <el-button type="text">重置密码</el-button>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[1, 3, 5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="tableDataCopy.length">
        </el-pagination>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            formInline:{
                // 状态  0禁用 1启用
                status:'',
                // 学员名称
                nickname:'',
                // 手机号
                mobile:''
            },
            // 表格数据
            // tableData:[],
            tableDataCopy:[],
            // 当前显示的页码数
            pageNum:1,
            // 每页的条数
            pageSize:10,
            data:[]
        };
    },

    mounted() {
        this.$axios.get('/parameter/query').then(res => {
            console.log(res);
            this.data = res.data.data.data
            this.tableDataCopy=this.data
            this.tableData=this.data
        })
        // console.log(data);
        // this.tableData=data
        // this.tableDataCopy=data
        // console.log(this.tableData);
    },
    filters:{
        dateFormat:(value)=>{
            return moment(value*1000).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    computed:{
        // 分页变化 变的是列表 get()属性是用来获取
        tableData:{
            get:function(){
                let tableDatas=[];
                // 如果当前页是第一页的话，
                if(this.pageNum===1){
                    // 列表截取 从0开始到结束
                    tableDatas=this.tableDataCopy.slice(0,this.pageSize);
                    // 如果不是第一页  意味着已经分页了
                }else{
                    // 切换的第一页：当前页-1就是起始位置，
                    tableDatas=this.tableDataCopy.slice((this.pageNum-1)*this.pageSize,
                    this.pageNum*this.pageSize)
                }
                return tableDatas
            },
            set(){

            }
        }
    },

    methods: {
        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize=val
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageNum=val
        },
        
        // 2.原生js 时间转换
        // formatDateTime(unixtimestamp){
        //     console.log(unixtimestamp);
        //     if(unixtimestamp.length<13){
        //         unixtimestamp=unixtimestamp*1000
        //     }
        //     var unixtimestamp = new Date(unixtimestamp);
        //     var year = 1900 + unixtimestamp.getYear();
        //     var month="0"+(unixtimestamp.getMonth()+1);
        //     var date="0"+unixtimestamp.getDate()
        //     var hour = "0" + unixtimestamp.getHours();
        //     var minute = "0" + unixtimestamp.getMinutes();
        //     var second = "0" + unixtimestamp.getSeconds();
        //     return(
        //         year+"_"+
        //         month.substring(month.length-2,month.length)+"_"+
        //         data.substring(date.length-2,date.length)+"_"+
        //         hour.substring(hour.length-2,hour.length)+":"+
        //         minute.substring(minute.length-2,minute.length)+":"+
        //         second.substring(second.length-2,second.length)
        //     )
        // },


        //3.第三方插件  import引入moment
        // formatDateTime(unixtimestamp) {
        //     console.log(unixtimestamp);
        //     if (unixtimestamp.length < 13) {
        //         unixtimestamp = unixtimestamp * 1000
        //     }
        //     return moment(unixtimestamp).format('YYYY-MM-DD HH:mm:ss')
        // },


        // 搜索
        search(){
            let status = this.formInline.status
            let nickname = this.formInline.nickname
            let mobile = this.formInline.mobile
            // 判断 如果 状态为0 禁用 且 姓名和手机号存在
            if (status || (status === 0 && nickname && mobile)) {
                this.searchThree()
            } else if (status || (status === 0 && nickname && !mobile)) {
                this.searchStatusAndName()
            } else if (status || (status === 0 && !nickname && mobile)) {
                this.searchStatusAndPhone()
            } else if (!status && nickname && mobile && status !== 0) {
                this.searchNameAndPhone()
            } else if (!status && !nickname && mobile && status !== 0) {
                this.searchPhone()
            } else if (!status && nickname && !mobile && status !== 0) {
                this.searchName()
            } else if (status || (status === 0 && !nickname && !mobile)) {
                this.searchStatus()
            }
        },
        // 根据状态查询
        searchStatus(){
            this.tableDataCopy=this.data.filter(
                (item)=>item.status===this.formInline.status
            )
        },
        // 根据姓名查询
        searchName(){
            this.tableDataCopy=this.data.filter(
                // indexOf 大于-1判断它存在  是一个模糊查询      还有includes/findindex
                (item) => item.nickname.indexOf(this.formInline.nickname)>-1
            )
        },
        // 根据手机号查询
        searchPhone(){
            this.tableDataCopy=this.data.filter(
                (item) => item.mobile.indexOf(this.formInline.mobile)>-1
            )
        },
        // 姓名+手机号
        searchNameAndPhone(){
            let result1=this.data.filter(
                (item) => item.nickname.indexOf(this.formInline.nickname)>-1
            );
            this.tableDataCopy=result1.filter(
                (item) => item.mobile.indexOf(this.formInline.mobile)>-1
            )
        },
        //状态+手机号
        searchStatusAndPhone(){
            let result1=this.data.filter( 
                (item)=>item.status===this.formInline.status
            )
            this.tableDataCopy=result1.filter(
                (item) => item.mobile.indexOf(this.formInline.mobile)>-1
            )
        },
        //状态+姓名
        searchStatusAndName(){
            let result1=this.data.filter(
                (item)=>item.status===this.formInline.status
            )
            this.tableDataCopy=result1.filter(
                (item) => item.nickname.indexOf(this.formInline.nickname)>-1
            )
        },
        // 状态+手机号+姓名
        searchThree(){
            let result1=this.data.filter(
                (item)=>item.status===this.formInline.status
            );
            let result2=result1.filter(
                (item) => item.nickname.indexOf(this.formInline.nickname)>-1
            );
            this.tableDataCopy=result2.filter(
                (item) => item.mobile.indexOf(this.formInline.mobile)>-1
            )
        },
        // 重置
        reset(){
            this.formInline.status=''
            this.formInline.nickname = ''
            this.formInline.mobile = ''
            this.tableDataCopy = this.data
        }
    },
};
</script>

<style lang="scss" scoped>

.navTitle {
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    font-size: 18px;
}
.demo-form-inline{
    margin-top: 10px;
}
img{
    vertical-align:middle;
    margin-right: 5px;
    width: 16%
}
.btn1{
    margin-bottom: 35px;
}
</style>