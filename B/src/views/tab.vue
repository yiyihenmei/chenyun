<template>
    <div>
    <Nav></Nav>
        <el-tabs v-model="activeName">
            <el-tab-pane label="未读消息" name="first">
                <el-table :data="tableDatafirst" stripe style="width: 100%">
                    <el-table-column prop="title" label="消息" width="600">
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="read(scope.row)">标为已读</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="readAll()" type="primary" class="qbbj">全部标记已读</el-button>
            </el-tab-pane>
            <el-tab-pane label="已读消息" name="second">
                <el-table :data="tableDatasecond" stripe style="width: 100%">
                    <el-table-column prop="title" label="消息" width="600">
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="del(scope.row)">删除</el-button>
                            <el-button @click="reduction(scope.row)">还原未读</el-button>
                        </template>

                    </el-table-column>
                </el-table>
                <el-button type="danger" @click="delAll()" class="delAll">删除全部</el-button>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="third">
                <el-table :data="tableDatathird" stripe style="width: 100%">
                    <el-table-column prop="title" label="消息" width="600">
                    </el-table-column>
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="reductions(scope.row)">还原</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="danger" @click="delssass()" class="qk">清空回收站</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Nav from './nav.vue'
export default {
    components:{
        Nav
    },
    data() {
        return {
            // Tabs,
            activeName: 'first',
            tableDatafirst: [],
            tableDatasecond: [],
            tableDatathird: []
        };
    },

    mounted() {
        this.getlist()
    },

    methods: {
        // 获取数据
        getlist() {
            this.$axios.get('/parameter/unread').then(res=>{
                console.log(res);
                this.tableDatafirst = res.data.data.unread
            })
        },
        // 已读
        read(value) {
            console.log(value);
            this.tableDatasecond.push(value)
            var ass = this.tableDatafirst.findIndex(item => {
                return item == value
            })
            this.tableDatafirst.splice(ass, 1)
        },
        // 删除
        del(value) {
            this.tableDatathird.push(value)
            var ass = this.tableDatasecond.findIndex(item => {
                return item == value
            })
            this.tableDatasecond.splice(ass, 1)
        },
        // 还原未读
        reduction(value) {
            this.tableDatafirst.push(value)
            var ass = this.tableDatasecond.findIndex(item => {
                return item == value
            })
            this.tableDatasecond.splice(ass, 1)
        },
        // 还原
        reductions(value) {
            this.tableDatafirst.push(value)
            var ass = this.tableDatathird.findIndex(item => {
                return item == value
            })
            this.tableDatathird.splice(ass, 1)
        },
        // 全部标记已读
        readAll() {
            this.tableDatafirst.forEach(item => {
                this.tableDatasecond.push(item)
            });
            this.tableDatafirst = []
        },
        // 删除全部
        delAll() {
            this.tableDatasecond.forEach(item => {
                this.tableDatathird.push(item)
            });
            this.tableDatasecond = []
        },
        // 清空回收站
        delssass() {
            this.tableDatathird = []
        }
    },
};
</script>

<style lang="scss" scoped>



.qk,.qbbj,.delAll{
    margin-top: 20px;
}
</style>