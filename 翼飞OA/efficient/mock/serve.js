//引入express
const express=require('express')

//引入mock数据
const Mock=require('mockjs')

// 登录的值
const loginInfo=require('./common/login.json')


// 登录日志
const loginRead=require('./common/loginRead.json')
// 实例化 express
const app=express()




app.use('/user/login',function(req,res){
    res.json(
    Mock.mock({
        status:200,
        msg:'登录成功',
        loginInfo
    }))
})


app.use('/home/loginsearch',function(req,res){
    res.json(
		Mock.mock({
			status:200,
			msg:'登录日志成功',
			loginRead
		}))
})
// 实例化监听的接口
 app.listen(8888,()=>{
	console.log('监听端口号 8888');
 })
