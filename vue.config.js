// vue中配置文件: 配置webpack的文件
// 这里面的配置, 会覆盖默认的webpack配置
module.exports = {
  // 配置打包后的内容, 可以直接在本地双击打开 (配置路由成相对路径了)
  publicPath: './',
  // 配置开发服务器
  devServer: {
    port: 3000,
    open: true
  }
}
