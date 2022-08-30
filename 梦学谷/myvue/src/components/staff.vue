<template>
    <div>
        <Title></Title>
        <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="账号" v-model="searchInput.cardNum"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="姓名" v-model="searchInput.name"></el-input>
                </div>
            </el-col>
            <!-- 按钮 -->
            <el-col :span="4">
                <el-button type="primary" @click="getList">查询</el-button>
                <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
                <el-button>重置</el-button>
            </el-col>
        </el-row>
        <!-- 模态框-add -->
        <el-dialog title="添加会员信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary" :label-width="formLabelWidth">
                    <el-input v-model="form.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="block" label="入职时间" prop="entryDate" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.entryDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 模态框-update -->
        <el-dialog title="修改会员信息" :visible.sync="dialogFormVisible1">
            <el-form :model="formEdit" :rules="rules" ref="ruleForm">
                <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="block" label="入职时间" prop="entryDate" :label-width="formLabelWidth">
                    <el-date-picker v-model="formEdit.entryDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 表格 -->
        <template>
            <el-table :data="tableData" border style="width: 100%;margin-top:15px">
                <el-table-column type="index" label="序号" align="center" width="120px">
                </el-table-column>
                <el-table-column prop="username" label="账号" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="age" label="年龄" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="电话" align="center">
                </el-table-column>
                <el-table-column prop="salary" label="薪酬" align="center">
                </el-table-column>
                <el-table-column prop="entryDate" label="入职时间" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="bj(scope.row)" size="small">编辑</el-button>
                        <el-button type="danger" size="small" @click="sc(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[1, 2, 5, 10]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
import Title from '../components/title.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            // 校验
            rules: {
                username: [
                    { required: true, message: '请输入卡号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
            },
            form: {
                username: '',
                name: '',
                age: '',
                mobile: '',
                entryDate: '',
                salary: '',
            },
            formEdit: {},
            formLabelWidth: '120px',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            tableData: [],
            value: '',
            roleId: '',
            pagenum: 1,
            pagesize: 5,
            // 条件查询
            searchInput: {
                cardNum: "",
                name: "",
                payType: "",
                birthday: "",
            },
        };
    },

    created() {
        this.getList()
    },

    methods: {
        // 分页
        handleSizeChange(val) {
            this.pagenum = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.pagesize = val
            this.getList()
        },
        getList() {
            this.$axios.post('http://vue.mengxuegu.com/pro-api/staff/list/search/1/10', this.searchInput).then(res => {
                console.log(res);
                this.tableData=res.data.data.rows
            })
        },
        // 新增
        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.$axios.post('http://vue.mengxuegu.com/pro-api/staff', this.form).then(res => {
                    console.log(res);
                    if (res.data.code == 2000) {
                        this.$message.success(res.data.message)
                        this.dialogFormVisible = false
                        this.getList()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            })
        },
        // 搜索

        // 编辑
        bj(roleId) {
            this.dialogFormVisible1 = true
            this.formEdit = roleId
        },
        edit() {
            this.$axios.put('http://vue.mengxuegu.com/pro-api/staff/10', `${this.formEdit.roleId}`, {
            }).then(res => {
                if (res.data.code === 2000) {
                    this.$message.success(res.data.message)
                    this.dialogFormVisible1 = false
                    this.getList()
                } else {
                    this.$message.error(res.data.message)

                }
            })
        },
        sc(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete('http://vue.mengxuegu.com/pro-api/staff/10', id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                this.getList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>