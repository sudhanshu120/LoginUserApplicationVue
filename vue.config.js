const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://hoblist.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
