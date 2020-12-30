<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
// 需求: 希望写px, 但是生成的代码, 给我转成rem
// .box {
//   // 200px 和 200px 指的是 375px 屏幕下, 需要显示成 200px 200px
//   width: 200px;  // 200 / 37.5 => xxrem
//   height: 375px;
//   background-color: pink;
// }
// .box2 {
//   width: 100px;
//   height: 100px;
//   background-color: skyblue;
// }

// sass 有两种语法, .sass(旧版)  .scss(新版)
// 1. scss (新)语法 和 less 语法非常接近
// less => @color: pink;
// scss => $color: pink;
// $color: pink;
// #app {
//   .my-btn {
//     width: 200px;
//     height: 50px;
//     background-color: $color;
//     border-radius: 5px;
//   }
// }

// 2. sass (旧)语法 和 stylus 语法非常相近, 向往简约
//    要求: 必须省略 {} 和 ;
// $color: pink
// #app
//   .my-btn
//     width: 200px
//     height: 50px
//     background-color: $color
//     border-radius: 5px
</style>
