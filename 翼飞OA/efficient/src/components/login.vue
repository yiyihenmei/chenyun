<template>
  <div class="first-box">
    <div class="second-box">
      <p class="title">OA系统登录</p>
      <el-form ref="form" :model="form" style="width:420px" class="el-form-input">
        <el-form-item>
          <el-input v-model="form.name" class="el-input" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="third-box">
          <span>忘记密码?</span>
        </div>
        <div class="four-box">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.name" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="form.name" placeholder="验证码图片"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-form-item class="el-item-login">
          <el-button class="login" style="width:330px">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  created() {
    axios.get('/effect/home/loginsearch').then((res) => {
      console.log(res)
    })
  }
}
</script>



<style lang="scss" scoped>
	.el-item-login{
		width: 100%;
		height: 50px;
		margin-top: 20px;
	}
	.login{
		margin-left: 40px;
		height: 50px;
		border-radius: 13px;
		background-color:rgb(213, 192, 248);
		color: #fff;
		font-size: 20px;
		border: none;
	}
.third-box {
  width: 100%;
  height: 30px;
  // overflow: hidden;
  span {
    float: right;
    color: rgb(237, 198, 85);
		margin-right: 10px;
		margin-top: -15px;
  }
}
.el-form-input {
  margin: 10px 80px;
}
::v-deep .el-input__inner {
  border-radius: 15px;
  height: 50px;
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
  width: 100%;
  height: 100%;
  background-image: url(../assets/login.png);
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
