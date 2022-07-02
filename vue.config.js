const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //自动打开
  // devServer:{
  //   open: true,
  //   host: "localhost"
  // }
  //关闭语法检查
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://1.116.64.64:5004/api2/',
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        }
      }
    }
  }
})
