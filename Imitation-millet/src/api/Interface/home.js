import { valueEquals } from "element-plus";
import Http from "../http.js";
const getMobile=(catName)=>{
    let data=Http.post('product/getPromoProduct',{categoryName: catName})
    return data
}

const getTelevision=()=>{
    let data=Http.post('product/getHotProduct',{categoryName:["电视机", "空调", "洗衣机"]})
    return data
}
const getParts=()=>{
    let data=Http.post('product/getHotProduct',{categoryName:["保护套", "保护膜", "充电器", "充电宝"]})
    return data
}

const goLogin=(val,res)=>{
    let data=Http.post('users/login',{userName:val,password:res})
    return data
}

const getRegister=(val,res)=>{
    let data=Http.post('users/register',{userName:val,password:res})
    return data
}

export {getMobile,getTelevision,getParts,goLogin,getRegister}