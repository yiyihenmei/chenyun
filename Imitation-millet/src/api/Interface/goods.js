import Http from "../http.js";
const getCategory = () => {
    let data = Http.post('product/getCategory')
    return data
}
const getWhole = (currentPage, pageSize) => {
    let data = Http.post('product/getAllProduct', { currentPage, pageSize })
    return data
}
const getSwitch = (name) => {
    let data = Http.post('product/getPromoProduct', { categoryName: name })
    return data
}

const getSearch = (obj) => {
    let data = Http.post('product/getProductBySearch',obj)
    return data
}

export { getCategory, getWhole,getSwitch,getSearch }