import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'

// 处理相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 加载全局语言包
dayjs.locale('zh-cn')

// 过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
