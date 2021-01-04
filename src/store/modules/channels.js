import { reqGetChannels, reqGetAllChannels } from '@/api/channels.js'
const state = {
  // vuex中提供我的频道数据
  channels: [],
  // vuex中提供全部的频道数据
  allChannels: []
}
const mutations = {
  setChannels (state, newValue) {
    state.channels = newValue
  },
  setAllChannels (state, allValue) {
    state.allChannels = allValue
  },
  addChannel (state, newValue) {
    state.channels.push(newValue)
  },
  delChannel (state, channel) {
    state.channels = state.channels.filter(item => item.id !== channel.id)
  }
}
const actions = {
  async getChannelsAsync (context) {
    const res = await reqGetChannels()
    // console.log(res)
    context.commit('setChannels', res.data.data.channels)
  },
  async getAllChannelsAsync (context) {
    const res = await reqGetAllChannels()
    context.commit('setAllChannels', res.data.data.channels)
  }
}
const getters = {
  // 可选的频道
  optionalChannels: (state) => {
    // 对allChannels中的元素进行过滤，只保留那些没有在channels中出现的元素
    const results = state.allChannels.filter(channel => {
      const index = state.channels.findIndex(item => item.id === channel.id)
      // 如果找到了，index就不是-1，如果找不到就是-1（要留下）
      return index === -1
    })
    return results
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
