<template>
  <div class="articleList">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title">
        <template #label>
          <van-grid :column-num="item.cover.images.length">
            <van-grid-item v-for="(img, index) in item.cover.images" :key="index" icon="photo-o" text="文字">
              <!-- <img fit="cover" lazy-load :src="img" alt=""> -->
              <van-image fit="cover" lazy-load :src="img" alt=""/>
            </van-grid-item>
          </van-grid>
          <div class="meta">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | relative}}</span>
            <span class="close" @click="close(item.art_id)">
              <van-icon name="cross"></van-icon>
            </span>
          </div>
        </template>
      </van-cell>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article.js'
export default {
  props: ['channel'],
  name: 'ArticleList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshing: false
    }
  },
  methods: {
    async onLoad () {
      if (!this.timestamp) {
        console.log('666')
        this.timestamp = +new Date()
        console.log(this.timestamp)
      }
      console.log(this.channel.id, this.timestamp)
      const result = await reqGetArticles(this.channel.id, this.timestamp)
      console.log(result)
      const arr = result.data.data.results
      console.log(arr)
      this.list = [...this.list, ...arr]
      this.loading = false
      if (arr.length === 0) {
        this.finished = true
      }
    },
    async onRefresh () {
      console.log('下拉刷新')
      try {
        const result = await reqGetArticles(this.channel.id, +new Date())
        this.list = result.data.data.results
        this.timestamp = result.data.data.pre_timestamp
      } catch {
        this.$$toast.fail('加载失败')
      }
      this.isRefreshing = false
      this.$toast.success('刷新成功')
    },
    close (id) {
      this.$emit('show-more', id.toString())
    }
  }
}
</script>

<style lang="scss" scpoed>
  .articleList {
  .meta {
    span{
      margin-right: 10px;
    }
    .close {
      float: right;
    }
  }
}
</style>
