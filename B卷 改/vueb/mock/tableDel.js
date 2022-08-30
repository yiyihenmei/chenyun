export default {
    //'get|/parameter/query': demoList,
    // 也可以这样写
    // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
    'delete|/parameter/del': (option) => {
        // 可以在这个地方对demoList2进行一系列操作，例如增删改
        // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
        return {
            status: 200,
            message: 'success',
            data: {
                msg: '删除成功'
            }
        };
    }
}