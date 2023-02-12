<template>
  <div class="search-result">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败, 轻稍后重试"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title" />
    </van-list>

  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  // 组件名称
  name: 'SearchResult',

  // 局部注册的组件
  components: {},

  // 组件参数 接收来自父组件的数据
  props: {
    searchText: String
  },

  // 组件状态值
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 页数
      perPage: 15, // 每页数量
      error: false
    }
  },

  // 计算属性
  computed: {},

  // 侦听器
  watch: {},

  // 数据已初始化
  created () {},

  // DOM已渲染
  mounted () {},

  // 组件方法
  methods: {
    async onLoad () {
      try {
        // 异步更新数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        const { results } = data
        // 把数据添加都数组中
        this.list.push(...results)
        // 数据请求成功后把 loading 关闭
        this.loading = false
        // 判断数据是否请求完毕
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true

        // 加载失败
        this.loading = false
        this.$toast('数据请求失败, 请稍后重试')
      }
    }
  }
}

</script>

<style scoped lang="less">

</style>
