import Http from "../http.js";
const getMyinformation = () => {
    let data = Http.get('docs/README.md')
    return data
}

// 我的订单
const getMyorder = (uid) => {
    let data = Http.post('user/order/getOrder', { user_id: uid })
    return data
}
// 添加订单
const addMyorder = (uid, res) => {
    let data = Http.post('user/order/addOrder', { user_id: uid, products: res })
    return data
}


// 我的收藏
const getCollections = (uid) => {
    let data = Http.post('user/collect/getCollect', { user_id: uid })
    return data
}
//删除收藏
const deleteCollect = (uid, pid) => {
    let data = Http.post('user/collect/deleteCollect', { user_id: uid, product_id: pid })
    return data
}

//购物车数据
const getShoppingCart = (uid) => {
    let data = Http.post('/user/shoppingCart/getShoppingCart', { user_id: uid })
    return data
}
//修改购物车数量
const updateShoppingCart = (uid, pid, num) => {
    let data = Http.post('user/shoppingCart/updateShoppingCart', { user_id: uid, product_id: pid, num: num })
    return data
}
//删除购物车数据
const delShoppingCart = (uid, pid) => {
    let data = Http.post('user/shoppingCart/deleteShoppingCart', { user_id: uid, product_id: pid })
    return data
}


export { getMyinformation, getMyorder, getCollections, deleteCollect, getShoppingCart, updateShoppingCart, delShoppingCart, addMyorder }