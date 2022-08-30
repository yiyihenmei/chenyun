import Cookies from "js-cookie";
const TokenKey='token'

// 获取token的方法
export function getToken(){
	return Cookies.get(TokenKey)
}

// 设置token
export function setToken(token){
	Cookies.set(TokenKey,token)
}

//删除cookies里面的token
export function removetoken(){
	Cookies.remove(TokenKey)
}

// 导出
// export {setToken,removetoken}
