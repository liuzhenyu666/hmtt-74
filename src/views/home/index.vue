<template>
  <div class="home">
    <van-tabs v-model="active" >
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <Article-list :channel='item' @show-more="handleShowMore"></Article-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="showMore" :style="{ width: '60%' }">
      <more-action @dislike='dislike'></more-action>
    </van-popup>
  </div>
</template>

<script>
import { reqDisLikeArticle } from '@/api/article.js'
import moreAction from './moreAction'
import ArticleList from './articleList'
import { reqGetChannels } from '@/api/channels.js'
export default {
  name: 'HomeIndex',
  data () {
    return {
      channels: [],
      active: 1,
      showMore: false,
      articleId: null
    }
  },
  methods: {
    async loadChannels () {
      const result = await reqGetChannels()
      // console.log(result)
      this.channels = result.data.data.channels
    },
    handleShowMore (id) {
      this.showMore = true
      this.articleId = id
    },
    async dislike () {
      console.log('不感兴趣操作', this.articleId)
      await reqDisLikeArticle(this.articleId)
      this.showMore = false
    }
  },
  created () {
    this.loadChannels()
  },
  components: {
    ArticleList,
    moreAction
  }
}
</script>

<style lang='scss' scoped>
// 深度作用选择器 ::v-deep (sass) /deep/ (less) >>> (css)
  .home {
  height: 100vh;
  padding-top: 90px;
  padding-bottom: 50px;
  box-sizing: border-box;
  ::v-deep {
    .van-tabs {
      height: 100%;
      .van-tabs__line {
        background-color: #3196fa;
    }
      .van-tabs__wrap {
        position: fixed;
        left: 0;
        top: 46px;
        width: 100%;
    }
      .van-tabs__content {
        height: 100%;
        // background-color: pink;
        .van-tab__pane {
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}
</style>
