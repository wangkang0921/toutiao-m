<template>
  <div class="article-container">

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="isFinisheText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articleItem v-for="item in list" :key="item.id" :item="item"></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAricleList } from '@/api/article'
import articleItem from '@/components/article'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    articleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      error: false,
      isLoading: false,
      isFinisheText: ''
    }
  },

  methods: {
    async onLoad () {
      try {
        // 1.请求数据
        const { data } = await getAricleList({
          channel_id: this.item.id,
          timestamp: this.timestamp || new Date()
        })
        const { results } = data
        // 2.请求过来的数据添加进数组
        this.list.push(...results)
        // 3.把loading 改为false
        this.loading = false
        // 4.判断数据是否加载完毕
        if (results.length) {
          // 未完成可以获得下一页的时间戳 提取
          this.timestamp = data.pre_timestamp
        } else {
          // 下一个的数据为零时 说明所有数据请求完毕 停止继续请求
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        // 1.请求数据
        const { data } = await getAricleList({
          channel_id: this.item.id,
          timestamp: new Date()
        })
        const { results } = data
        // 数据追加到数组前面
        this.list.unshift(...results)
        // 关闭刷新请求
        this.isLoading = false
        // 提示
        this.isFinisheText = `刷新了 ${results.length} 条数据`
      } catch (error) {
        this.isFinisheText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  padding-bottom: 100px;
  height: 79vh;
  overflow-y: auto;
}
</style>
