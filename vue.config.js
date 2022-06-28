const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  lintOnSave: false,//关闭语法检查

  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.121:7001 ',
        ws: true,
        changOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
