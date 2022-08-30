<template>
    <div>
        <Nav></Nav>
        <el-row :gutter="20" class="rowbox">
            <el-col :span="4">
                <el-button type="primary" @click="dels"><i class="el-icon-delete"></i> 删除选中 </el-button>
            </el-col>
            <el-col :span="4">
                <el-select v-model="model" placeholder="请选择">
                    <el-option v-for="item in selectList" :label="item.label" :value="item.label" :key="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="用户名" v-model="input" @input="searchInput"></el-input>
            </el-col>
        </el-row>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center" width="150px">
            </el-table-column>
            <el-table-column prop="name" label="用户名" align="center">
            </el-table-column>
            <el-table-column prop="money" label="账户余额" align="center">
            </el-table-column>
            <el-table-column prop="thumb" label="头像(查看大图)" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.thumb" class="pictures" :preview-src-list="[scope.row.thumb]"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.state == '成功'">成功</el-tag>
                    <el-tag type="warning" v-else>失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="注册时间" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="bj(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>编辑
                    </el-button>
                    <el-button @click="sc(scope.$index, tableData)" type="text" size="small"><i
                            class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="editForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="editForm.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Nav from './nav.vue'
export default {
    components: {
        Nav
    },
    data() {
        return {

            // 下拉菜单
            selectList: [],
            // 编辑
            editForm: {

            },
            // 表格数据
            tableData: [],
            // 复制的表格数据
            tableDataCopy: [],
            // 模态框
            dialogFormVisible: false,
            formLabelWidth: '100px',
            model: '',
            input: '',
            // 当前选框选中的值
            sels: [],
            multipleSelection: []
        };
    },

    created() {
        this.getList();
        this.getAddressList()
    },

    methods: {
        // 获取选中状态
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val
        },
        // 批量删除
        dels() {
            console.log(this.multipleSelection);
            // this.tableData = this.tableDataCopy.filter(item => !this.multipleSelection.includes(item.id))
            // this.tableData=this.tableDataCopy.filter(item=>this.multipleSelection.includes(item)==false)
            // console.log(this.tableData);
            let arr=this.tableData.filter(item=>{
                return item.multipleSelection==false
                console.log(arr);
                this.tableData=arr
            })
        },
        // 获取地址列表
        getAddressList() {
            this.$axios.get('/parameter/address').then(res => {
                // console.log(res);
                this.selectList = res.data.data.list
            })
        },
        // 搜索
        searchInput() {
            if (this.input.trim().length && this.model != '') {
                var aa = this.tableDataCopy.filter(item => item.address.includes(this.model));
                this.tableData = aa.filter(item => item.name.includes(this.input))
            }
        },
        getList() {
            // 请求接口数据
            this.$axios.get('/parameter/query').then(res => {
                // console.log(res);
                this.tableData = res.data.data.list
                this.tableDataCopy = res.data.data.list
            })
        },
        // 编辑
        edit() {
            this.dialogFormVisible = false;
            this.editForm = {}
        },
        // 表单回填
        bj(id) {
            this.dialogFormVisible = true;
            this.editForm = id
        },


        // 删除
        sc(index, rows) {
            rows.splice(index, 1);
        },
    },
};
</script>

<style lang="scss" scoped>
i {
    padding-right: 10px;
}

.rowbox {
    margin-bottom: 20px;
}

.pictures {
    height: 50px;
}
</style>