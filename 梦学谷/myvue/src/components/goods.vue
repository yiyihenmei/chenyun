<template>
    <div>
        <Title></Title>
        <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="商品名称" v-model="searchInput.name"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="商品编号" v-model="searchInput.code"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="选择供应商" v-model="searchInput.supplierName"></el-input>
                </div>
            </el-col>
            <!-- 按钮 -->
            <el-col :span="4">
                <el-button type="primary" @click="getList">查询</el-button>
                <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
                <el-button @click="cz">重置</el-button>
            </el-col>
        </el-row>


        <!-- 模态框-add -->
        <el-dialog title="新增商品" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code" :label-width="formLabelWidth">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec" :label-width="formLabelWidth">
                    <el-input v-model="form.spec" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice" :label-width="formLabelWidth">
                    <el-input v-model="form.retailPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice" :label-width="formLabelWidth">
                    <el-input v-model="form.purchasePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum" :label-width="formLabelWidth">
                    <el-input v-model="form.storageNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName" :label-width="formLabelWidth">
                    <el-input v-model="form.supplierName" autocomplete="off" @focus="selectgys"></el-input>
                    <!-- 供应商-add -->
                    <el-dialog title="选择供应商" :visible.sync="dialogTableVisible" width="50%">
                        <el-row :gutter="20">
                            <el-col :span="10">
                                <el-input placeholder="供应商名称" v-model="ipt4"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <el-button type="primary" click="cha">查询</el-button>
                            </el-col>
                        </el-row>

                        <el-table :data="tableData">
                            <el-table-column type="index" label="序号"></el-table-column>
                            <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
                            <el-table-column prop="name" label="联系人"></el-table-column>
                        </el-table>
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 模态框-update -->
        <el-dialog title="编辑商品" :visible.sync="dialogFormVisible1">
            <el-form :model="formEdit" :rules="rules" ref="ruleForm">
                <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.spec" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.retailPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.purchasePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.storageNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.supplierName" autocomplete="off"></el-input>
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
                <el-table-column prop="name" label="商品名称" align="center">
                </el-table-column>
                <el-table-column prop="code" label="商品编码" align="center">
                </el-table-column>
                <el-table-column prop="spec" label="商品规格" align="center">
                </el-table-column>
                <el-table-column prop="retailPrice" label="零售价" align="center">
                </el-table-column>
                <el-table-column prop="purchasePrice" label="进货价" align="center">
                </el-table-column>
                <el-table-column prop="storageNum" label="库存数量" align="center">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商" align="center">
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
                name: [
                    { required: true, message: '请输入卡号', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                storageNum: [
                    { required: true, message: '不能为空', trigger: 'change' },
                ],
            },
            form: {
                code: '',
                name: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName: '',
                linkman:''
            },
            formEdit: {},
            formLabelWidth: '120px',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogTableVisible:false,
            tableData: [],
            value: '',
            roleId: '',
            pagenum: 1,
            pagesize: 5,
            // 条件查询
            searchInput: {
                code: "",
                name: "",
                linkman:'',
                supplierName:''
            },
            ipt4:''
        };
    },

    created() {
        this.getList()
    },

    methods: {
        cha(){
            this.$axios.get('http://vue.mengxuegu.com/pro-api/supplier/list/search/1/10').then(res=>{
                console.log(res);
                this.tableData.filter(item=>{
                    item.supplierName.indexOf(this.supplierName)
                })
            })
        },
        selectgys(){
            this.dialogTableVisible= true
        },
        // 重置
        cz(){
            this.searchInput.name ==''
            this.searchInput.code==''
            this.searchInput.supplierName ==''
        },
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
            this.$axios.post('http://vue.mengxuegu.com/pro-api/goods/list/search/1/10', this.searchInput).then(res => {
                console.log(res);
                this.tableData=res.data.data.rows
            })
        },
        // 新增
        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.$axios.post('http://vue.mengxuegu.com/pro-api/goods', this.form).then(res => {
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
    

        // 编辑
        bj(roleId) {
            this.dialogFormVisible1 = true
            this.formEdit = roleId
        },
        edit() {
            this.$axios.put('http://vue.mengxuegu.com/pro-api/goods/10', `${this.formEdit.roleId}`, {
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
                this.$axios.delete('http://vue.mengxuegu.com/pro-api/goods/11', id).then(res => {
                    if(res.data.code===2000){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                    
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