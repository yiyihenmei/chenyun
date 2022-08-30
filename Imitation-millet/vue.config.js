const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',  //线上路径改为./开头
  productionSourceMap:false,   //打包时去除map文件，减少文件体积
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        // target: 'http://localhost:3000/', // 本地后端地址
        target: 'http://101.132.181.9/api', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
}
})