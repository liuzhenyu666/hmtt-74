<template>
  <div class="home">
    <van-tabs v-model="active" >
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <Article-list :channel='item' @show-more="handleShowMore"></Article-list>
      </van-tab>
      <div class="bar-btn">
        <van-icon name="wap-nav"/>
      </div>
    </van-tabs>
    <div class="bar-btn" @click="showChannelEdit = true">
      <van-icon name="wap-nav"/>
    </div>
    <van-popup v-model="showMore" :style="{ width: '60%' }">
      <more-action ref="moreActive" @report='report' @dislike='dislike'></more-action>
    </van-popup>
    <van-action-sheet v-model="showChannelEdit" title="标题">
      <channel-edit @update-active="updateActive" :active="active" @update-curchannel="updateCurChannel"></channel-edit>
    </van-action-sheet>

  </div>
</template>

<script>
import { reqDisLikeArticle, reqReportArticle } from '@/api/article.js'
import moreAction from './moreAction'
import ArticleList from './articleList'
import channelEdit from './channelEdit'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      showMore: false,
      articleId: null,
      showChannelEdit: false
    }
  },
  methods: {
    ...mapActions('channels', ['getChannelsAsync']),
    handleShowMore (id) {
      this.showMore = true
      this.articleId = id
      this.$nextTick(() => {
        this.$refs.moreActive.isReport = false
      })
    },
    async dislike () {
      console.log('不感兴趣操作', this.articleId)
      // 1. 调用后端接口，告诉后台，这个文章我不感兴趣
      await reqDisLikeArticle(this.articleId)
      // 2. 关闭弹出层
      this.showMore = false
      // 3.将用户点击的那个文章删除
      const eventObj = {
        articleId: this.articleId,
        // 通过激活的tab下标就可以找到当前频道的id
        channelId: this.channels[this.active].id
      }
      console.log(eventObj)
      this.$eventBus.$emit('del-article', eventObj)
    },
    async report (typeId) {
      // 1. 调用接口
      await reqReportArticle(this.articleId, typeId)
      // 2. 关闭弹层
      this.showMore = false
      // 3. 删除文章
      const eventObj = {
        articleId: this.articleId,
        channelId: this.channels[this.active].id
      }
      this.$eventBus.$emit('del-article', eventObj)
    },
    updateCurChannel (index) {
      this.active = index
      this.showChannelEdit = false
    },
    updateActive (active) {
      this.active = active
    }
  },
  created () {
    this.getChannelsAsync()
  },
  computed: {
    ...mapState('channels', ['channels'])
  },
  components: {
    ArticleList,
    moreAction,
    channelEdit
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
        right: 30px;
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
    .bar-btn {
      position: fixed;
      right: 5px;
      top: 57px;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
      z-index:1;
      .van-icon-wap-nav{
        font-size: 20px;
      }
    }
  }
}
</style>
