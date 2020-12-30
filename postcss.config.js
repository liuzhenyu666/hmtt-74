module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 公式: 拿适配的屏幕宽度 / 10   (眼中只有 375的屏幕, 其他屏幕等比例缩放)
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
