<template>
  <div class="search-suggestion">

  <div class="search-suggestion">
    <van-cell
      v-for="(text, index)
      in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search',text)"
      >
      <span slot="title" v-html="highlight(text)"></span>
    </van-cell>
  </div>

  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  // 组件名称
  name: 'SearchSuggestion',

  // 局部注册的组件
  components: {},

  // 组件参数 接收来自父组件的数据
  props: {
    searchtext: String
  },

  // 组件状态值
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },

  // 计算属性
  computed: {},

  // 侦听器
  watch: {
    // 侦听输入文本
    searchtext: {
      // 监视的处理函数
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 1000),

      // handler (val) {
      //   this.loadSearchSuggestions(val)
      //   console.log(val)
      // },
      // 首次监视触发
      immediate: true
    }
  },

  // 数据已初始化
  created () {},

  // DOM已渲染
  mounted () {},

  // 组件方法
  methods: {

    // 获取联想建议 方法
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.options
      } catch {
        this.$toast('获取失败')
      }
    },

    // 替换文本
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchtext}</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchtext, 'gi')
      // 字面量的方式创建正则表达式 /正则表达式/gi  /this.searchText/gi  /he/gi
      // text.replace(/匹配的内容/gi, highlightStr)
      return text.replace(reg, highlightStr)
    }
  }

}
</script>

<style scoped lang="less">
.search-suggestion {

  /deep/ .active {
    color: #3296fa;
  }
}
</style>
