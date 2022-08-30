<template>
  <div class="background">
		<div class="changepassword">
		<div class="s-box">
			<p class="textChangePassword">修改密码</p>
		</div>
    <el-form class="el-form-forget" ref="changeFormRef" :model="changeForm" label-width="80px">
      <el-form-item label="用户名:"  prop="account">
        <el-input v-model="changeForm.account"></el-input>
      </el-form-item>
			<el-form-item label="新密码:"  prop="password">
        <el-input v-model="changeForm.password"></el-input>
      </el-form-item>
			<el-form-item label="再次输入:"  prop="password2">
        <el-input v-model="changeForm.password2"></el-input>
      </el-form-item>
      <el-form-item class="buttonyes">
        <el-button type="primary" @click="ok">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
	</div>
</template>


<script>
export default {
  data() {
		// 用户名校验
		const checkAccount=(rule, value, callback)=>{
			const re=/^[a-z0-9_-]{3,16}$/
			if(re.test(value)){
				callback()
			}else{
				callback(new Error('用户格式不正确'))
			}
		}
		// 密码校验
		const checkPassword=(rule, value, callback)=>{
			const re=/^[a-z0-9_-]{6,18}$/
			if(re.test(value)){
				callback()
			}else{
				callback(new Error('密码格式不正确'))
			}
		}
		const checkPassword2=(rule, value, callback)=>{
			const re=/^[a-z0-9_-]{6,18}$/
			if(re.test(value)){
				callback()
			}else{
				callback(new Error('确认密码格式不正确'))
			}
		}
    return {
      dialogFormVisible: true,
      changeForm: {
        account: '',
				password:'',
				password2:'',
      },
			rules: {
				account: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
						{ validator: checkAccount, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
						{ validator: checkPassword, trigger: 'blur' }
          ],
          password2: [
						{ required: true, message: '请输入确认密码', trigger: 'blur' },
						{ validator: checkPassword2, trigger: 'blur' }
          ],
        },
    }
  },
	methods:{
		ok(){
			this.$refs.changeFormRef.validate((valid)=>{
				if(!valid){
					return
				}
			})
			this.$router.push('/')
		},
	}
}
</script>

<style lang="scss" scoped>
	.changepassword{
		width: 650px;
		height: 450px;
		border: 1px solid rgb(179, 178, 178);
		margin: auto;
		margin-top: 100px;
		overflow: hidden;
		border-radius: 20px;
		box-shadow: 8px 8px 8px 0 #ccc;
		background-color: #fff;
	}
	.s-box{
		width: 100%;
		height: 40px;
	}
	.el-form-forget{
		width: 80%;
		margin: auto;
		margin-top: 60px;
	}
	.buttonyes{
	float: right;
	margin-top: 30px;
	}
	.textChangePassword{
		color: rgb(61, 60, 60);
		font-size: 16px;
		padding-left: 40px;
		padding-top: 30px;

	}
.background{
	background-image: url(../assets/login.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
	position: fixed;
}
</style>
