<template>
  <div class="first-box">
    <div class="second-box">
      <p class="title">OA系统登录</p>
      <el-form ref="ruleForm" :model="loginForm" style="width:420px" class="el-form-input" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" class="el-input" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <div class="third-box">
					<el-button class="el-btn" type="text" @click="dialogFormVisible = true">忘记密码?</el-button>
						<!-- 忘记密码对话框 -->
	     	<ChangePassword :dialogFormVisible="dialogFormVisible" @dialogForm="dialogForm"></ChangePassword>
        </div>
        <div class="four-box">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="loginForm.img_sms" placeholder="验证码" prop="img_sms"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="loginForm.img_sms" placeholder="验证码图片" prop="img_sms"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-form-item class="el-item-login">
          <el-button class="login" style="width:330px" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text">
      <p class="p-text">2022翼飞OA项目第五组版权所有京ICP证070791号京公网备案11010502022545号</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ChangePassword from './changePassword.vue'
export default {
	components:{
		ChangePassword
	},
    data() {
        // 用户名校验
        const checkAccount = (rule, value, callback) => {
            const re = /^[a-z0-9_-]{3,16}$/;
            if (re.test(value)) {
                callback();
            }
            else {
                callback(new Error("用户格式不正确"));
            }
        };
        // 密码校验
        const checkPassword = (rule, value, callback) => {
            const re = /^[a-z0-9_-]{6,18}$/;
            if (re.test(value)) {
                callback();
            }
            else {
                callback(new Error("密码格式不正确"));
            }
        };
        return {
            dialogFormVisible: false,
            loginForm: {
                account: "",
                password: "",
                img_sms: "",
            },
            rules: {
                account: [
                    { required: true, message: "请输入活动名称", trigger: "blur" },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                    { validator: checkAccount, trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: checkPassword, trigger: "blur" }
                ],
                img_sms: [
                    { required: true, message: "请输入图形验证码", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        $http.get("/effect/home/loginsearch").then((res) => {
            console.log(res);
        });
    },
    methods: {
			dialogForm(){
				this.dialogFormVisible=false
			},
        login() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) {
                    return;
                }
            });
						this.$router.push('/home')
        },
    },

}
</script>



<style lang="scss" scoped>
.p-text {
  color: rgb(154, 154, 154);
  text-align: center;
  padding-top: 80px;
	font-size: 12px;
}
.text {
  width: 100%;
}
.el-item-login {
  width: 100%;
  height: 45px;
  margin-top: 20px;
}
.login {
  margin-left: 40px;
  height: 45px;
  border-radius: 13px;
  margin-top: 10px;
  font-size: 20px;
}
.third-box {
  width: 100%;
  height: 30px;
  .el-btn {
    float: right;
    color: rgb(237, 198, 85);
    margin-right: 10px;
    margin-top: -22px;
		cursor: pointer;
  }
}
.el-form-input {
  margin: 10px 80px;
}
::v-deep .el-input__inner {
  border-radius: 15px;
  height: 45px;
}
.second-box {
  width: 580px;
  height: 450px;
  background-color: #fff;
  margin: auto;
  margin-top: 100px;
  border-radius: 7%;
  overflow: hidden;
}
.first-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/login.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.title {
  text-align: center;
  font-size: 30px;
  padding-top: 35px;
  padding-bottom: 20px;
}
</style>
