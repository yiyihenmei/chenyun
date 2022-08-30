<template>
    <div class="background">
        <div class="box">
            <el-form label-width="80px" :model="loginForm" :rules="rules" ref="loginFormRef">
                <h2>欢迎登录</h2>
                <el-form-item label="用户名" style="width:550px;margin:auto;" prop="username">
                    <el-input v-model="loginForm.username" class="ipt1"></el-input>
                </el-form-item>
                <el-form-item label="密码" style="width:550px;margin:auto" prop="password" class="ipt2">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>

                <el-form-item class="ju">
                    <el-button type="primary" @click="login('loginFormRef')">登录</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 用户名校验
        const checkUsername = (rule, value, callback) => {
            const re =/^[a-z0-9_-]{3,16}$/ 
            if(re.test(value)){
                callback()
            }else{
                callback(new Error('用户名格式不正确'))
            }
        }
        // 密码
        const checkPassword= (rule, value, callback) => {
            const re = /^[a-z0-9_-]{6,18}$/
            if (re.test(value)) {
                callback()
            } else {
                callback(new Error('密码格式不正确'))
            }
        }
        return {
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: checkUsername,trigger:'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: checkPassword, trigger: 'blur' }

                ],
            }
        }
    },
    methods: {
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push("/welcome")
                } else {
                    return false
                }
            })
        }
        // login() {
        //     this.$refs.loginFormRef.validate((valid) => {
        //         if (!valid) return
        //     });
        //     this.$axios.post('http://vue.mengxuegu.com/pro-api/user/login', this.loginForm).then(res => {
        //         console.log(res);
        //         if (res.data.code == 2000) {
        //             this.$message.success(res.data.message)
        //             sessionStorage.setItem('token', res.data.token)
        //             this.$router.push('/home')
        //         } else {
        //             this.$message.error(res.data.message)
        //         }
        //     })
        // }
    },
}
</script>

<style lang="scss" scoped>


.huan{
    margin-bottom: 20px;
}

.background {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("../assets/jks.png");
    background-size: 100% 100%;
    top: 0;
}

h2 {
    text-align: center;
    padding-top: 30px;
    font-size: 30px;
    background-image: linear-gradient(to bottom left, red, yellow, green);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-top: 60px;
}

.el-input {
    margin-bottom: 10px;
    margin-top: 20px;
}

.ju{
    text-align: center;
}
.box {
    width: 600px;
    height: 350px;
    background-color: rgba($color: #6d6969, $alpha: 0.5);
    margin: auto;
}
::v-deep .el-form-item__label {
    color: #a2bdf8 !important;
    font-size: 18px;
    padding-top: 20px;
}
.el-button{
    margin-top: 20px;
    position: relative;
    top: 0;
    left:-30px;
}

</style>