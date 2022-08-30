import Http from "../http.js";
// 商品详情数据
const getDetails = (id) => {
    let data = Http.post('product/getDetails',{productID:id})
    return data
}
// 商品轮播
const getDetailsPicture = (id) => {
    let data = Http.post('product/getDetailsPicture',{productID:id})
    return data
}
// 加入购物车
const addShoppingCart = (uid,pid) => {
    let data = Http.post('user/shoppingCart/addShoppingCart',{user_id:uid , product_id:pid })
    return data
}
// 加入收藏
const addCollect = (uid,pid) => {
    let data = Http.post('user/collect/addCollect',{user_id:uid , product_id:pid })
    return data
}

export { getDetails,getDetailsPicture,addShoppingCart,addCollect }