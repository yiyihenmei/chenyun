<template>
    <div>
        <Title></Title>
        <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="供应商名称" v-model="searchInput.name"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="联系人" v-model="searchInput.linkman"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="联系电话" v-model="searchInput.mobile"></el-input>
                </div>
            </el-col>

            <!-- 按钮 -->
            <el-col :span="4">
                <el-button type="primary" @click="getList()">查询</el-button>
                <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
                <el-button>重置</el-button>
            </el-col>
        </el-row>
        <!-- 模态框-add -->
        <el-dialog title="供应商添加" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="供应商名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman" :label-width="formLabelWidth">
                    <el-input v-model="form.linkman" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 模态框-update -->
        <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible1">
            <el-form :model="formEdit" :rules="rules" ref="ruleForm">
                <el-form-item label="供应商名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.linkman" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.remark" autocomplete="off"></el-input>
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
                <el-table-column prop="name" label="供应商名称" align="center">
                </el-table-column>
                <el-table-column prop="linkman" label="联系人" align="center">
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
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
                remark: [
                    { required: true, message: '请输入卡号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
            },
            form: {
                remark: '',
                linkman: '',
                mobile: '',
                name: '',
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
                linkman: "",
                name: "",
                remark: "",
                mobile: "",
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
            this.$axios.post('http://vue.mengxuegu.com/pro-api/supplier/list/search/1/10', this.searchInput).then(res => {
                console.log(res);
                this.tableData=res.data.data.rows
            })
        },
        // 新增
        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.$axios.post('http://vue.mengxuegu.com/pro-api/supplier', this.form).then(res => {
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
            this.$axios.put('http://vue.mengxuegu.com/pro-api/supplier/10', `${this.formEdit.roleId}`, {
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
                this.$axios.delete('http://vue.mengxuegu.com/pro-api/supplier/10', id).then(res => {
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