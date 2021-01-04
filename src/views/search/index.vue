<template>
  <div class="search">
    <!-- 搜索组件一级路由   $router.back()返回上一个页面-->
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()">
    </van-nav-bar>

    <!-- https://youzan.github.io/vant/#/zh-CN/search -->
    <van-search
      @input="getSuggestion"
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      v-model.trim="keyword"
    >
      <template #action>
        <div @click="clickSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-show="keyword">
      <van-cell @click="clickSearch" v-for="(item, index) in showSuggestion" :key="item" icon="search">
        <div @click="clickSuggestion(index)" v-html="item"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-show="!keyword">
      <van-cell title="历史记录">
      </van-cell>
      <van-cell @click="clickHistory(item)" v-for="(item, index) in history" :key="item" :title="item">
        <van-icon @click.stop="delHistory(index)" name="close" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage.js'
import { reqGetSuggestion } from '@/api/search.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      suggestion: [],
      history: getHistory(),
      timeId: null
    }
  },
  methods: {
    getSuggestion () {
      clearTimeout(this.timeId)
      this.timeId = setTimeout(async () => {
        if (this.keyword === '') {
          this.suggestion = []
          return
        }
        const res = await reqGetSuggestion(this.keyword)
        this.suggestion = res.data.data.options
        console.log('发送请求了')
      }, 1000)
    },
    clickSearch () {
      if (this.keyword === '') return
      this.addHistory(this.keyword)
    },
    clickSuggestion (index) {
      this.addHistory(this.suggestion[index])
    },
    addHistory (str) {
      const index = this.history.findIndex(item => item === str)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(str)
      setHistory(this.history)
      this.$router.push('/result')
    },
    delHistory (index) {
      this.history.splice(index, 1)
      setHistory(this.history)
    },
    clickHistory (history) {
      this.addHistory(history)
    }
  },
  computed: {
    showSuggestion () {
      const regExp = new RegExp(this.keyword, 'gi')
      const arr = this.suggestion.map(item => {
        const newArr = item.replace(regExp, (match) => {
          return `<span style="color: red;">${match}</span>`
        })
        return newArr
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
