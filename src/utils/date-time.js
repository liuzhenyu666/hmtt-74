// 对dayjs, 进行封装
import dayjs from 'dayjs'
// 引入dayjs的一个插件, 在 yarn add dayjs 就已经将这个插件下载
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用

export const formatTime = (val) => {
  return dayjs(val).format('DD/MM/YYYY')
}

export const getRelativeTime = (yourTime) => {
  return dayjs(yourTime).fromNow()
}
