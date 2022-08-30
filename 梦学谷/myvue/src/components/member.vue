<template>
    <div>
        <Title></Title>
        <el-row :gutter="20" style="margin-top:10px">
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="会员卡号" v-model="searchInput.cardNum"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-input placeholder="会员名字" v-model="searchInput.name"></el-input>
                </div>
            </el-col>
            <!-- 下拉菜单 -->
            <el-col :span="4">
                <el-select v-model="value" placeholder="支付类型">
                    <el-option v-for="item in options" v-model="searchInput.payType" :key="item.value"
                        :label="item.label" :value="item.value" :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-col>
            <!-- 日期 -->
            <el-col :span="4">
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker v-model="searchInput.birthday" type="date" placeholder="选择日期">
                    </el-date-picker>
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
                <el-form-item label="会员卡号" prop="cardNum" :label-width="formLabelWidth">
                    <el-input v-model="form.cardNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="block" label="会员生日" prop="birthday" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money" :label-width="formLabelWidth">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral" :label-width="formLabelWidth">
                    <el-input v-model="form.integral" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType" :label-width="formLabelWidth">
                    <el-input v-model="form.payType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员地址" prop="address" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
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
                <el-form-item label="会员卡号" prop="cardNum" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.cardNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="block" label="会员生日" prop="birthday" :label-width="formLabelWidth">
                    <el-date-picker v-model="formEdit.birthday" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.integral" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.payType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员地址" prop="address" :label-width="formLabelWidth">
                    <el-input v-model="formEdit.address" autocomplete="off"></el-input>
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
                <el-table-column type="index" label="#" width="120px" align="center">
                </el-table-column>
                <el-table-column prop="cardNum" label="会员卡号" align="center">
                </el-table-column>
                <el-table-column prop="name" label="会员姓名" align="center">
                </el-table-column>
                <el-table-column prop="birthday" label="会员生日" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码" align="center">
                </el-table-column>
                <el-table-column prop="integral" label="可用积分" align="center">
                </el-table-column>
                <el-table-column prop="money" label="开卡金额" align="center">
                </el-table-column>
                <el-table-column prop="payType" label="支付类型" align="center">
                </el-table-column>
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.payType===1">现金</span>
                    <span v-if="scope.row.payType===2">微信</span>
                    <span v-if="scope.row.payType===3">支付宝</span>
                    <span v-else>银行卡</span>
                </template> -->
                <el-table-column prop="address" label="会员地址" align="center">
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
                cardNum: [
                    { required: true, message: '请输入卡号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                payType: [
                    { required: true, message: '支付类型不能为空', trigger: 'change' },
                ],
            },
            form: {
                cardNum: '',
                name: '',
                birthday: '',
                phone: '',
                integral: '',
                money: '',
                payType: '',
                address: '',
            },
            formEdit: {},
            formLabelWidth: '120px',
            dialogFormVisible: false,
            dialogFormVisible1: false,
            tableData: [],
            options: [
                { value: 1, label: '现金' },
                { value: 2, label: '微信' },
                { value: 3, label: '支付宝' },
                { value: 4, label: '银行卡' },
            ],
            value1:'',
            value: '',
            // value1: '',
            roleId: '',
            pagenum: 1,
            pagesize: 5,
            total: 0,
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
            this.pagesize= val
            this.getList()
        },
        getList() {
            this.$axios.get('https://www.fastmock.site/mock/161ba971b7547743480f0cdfc17b27e8/four-api/user/userList',this.searchInput).then(res => {
                console.log(res);
                    this.tableData = res.data.data.rows
                    // this.total = res.data.data.total
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