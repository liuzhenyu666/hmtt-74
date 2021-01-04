<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button @click="editing = !editing" plain size="mini" type="danger">
          {{ editing ? '取消' : '编辑' }}
        </van-button>
      </van-cell>
      <van-grid>
        <van-grid-item :class="{ current: index === active }" @click="clickMychannel(index)" v-for="(item, index) in channels" :key="item.id">
          <span>{{ item.name }}</span>
          <van-icon @click="clickDelChannel(item, index)" v-if="editing" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
     <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item @click="clickAddChannel(item)" v-for="item in optionalChannels" :key="item.id">
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { reqSetChannels } from '@/api/channels'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ChannelEdit',
  props: ['active'],
  data () {
    return {
      // 是否处于编辑状态
      editing: false
    }
  },
  created () {
    this.getAllChannelsAsync()
  },
  computed: {
    ...mapState('channels', ['channels']),
    ...mapGetters('channels', ['optionalChannels'])
  },
  methods: {
    ...mapActions('channels', ['getAllChannelsAsync']),
    ...mapMutations('channels', ['addChannel', 'delChannel']),
    clickMychannel (index) {
      this.$emit('update-curchannel', index)
    },
    async clickAddChannel (channel) {
      // 1.将数据用mutations里的方法来修改
      this.addChannel(channel)
      // 2.组装接口需要的数据
      const channelList = this.channels.map((item, index) => {
        return {
          id: item.id,
          seq: index
        }
      })
      // 将推荐第一项排除在外
      channelList.shift()
      // 3.发送重置请求
      await reqSetChannels(channelList)
    },
    async clickDelChannel (channel, index) {
      console.log(index)
      console.log(this.active)
      if (index === this.active) {
        this.$emit('update-active', 0)
      }
      // 删除的是前面一项，需要将this.active - 1
      if (index < this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.delChannel(channel)
      const channelList = this.channels.map((item, index) => {
        return {
          id: item.id,
          seq: index
        }
      })
      // 将推荐第一项排除在外
      channelList.shift()
      // 3.发送重置请求
      await reqSetChannels(channelList)
    }
  }
}
</script>

<style lang="scss" scoped>
.channel{
  padding:15px;
  font-size:14px;
  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }
  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
  .current {
  color: #e5615b;
  font-weight: bold;
}
}
</style>
