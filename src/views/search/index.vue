<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <searchResult
      v-if="isResultShow"
      :searchText="searchText"
    ></searchResult>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <searchSuggestion
      v-else-if="searchText"
      :searchtext="searchText"
      @search="onSearch"
    ></searchSuggestion>
    <!-- /联想建议 -->

    <!-- 搜索历史 -->
    <searchHistory
      v-else
      :searchhistory="searchhistory"
      @onSearchItemClick="onSearchItemClick"
      @onSearch="onSearch"
      @cloreHistory="searchhistory=[]"
      ></searchHistory>
    <!-- /搜索历史 -->

  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import searchSuggestion from './components/search-suggestion'

export default {
  // 组件名称
  name: 'serachIndex',

  // 局部注册的组件
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },

  // 组件参数 接收来自父组件的数据
  props: {},

  // 组件状态值
  data () {
    return {
      searchText: '', // 搜索内容
      isResultShow: false, // 显示搜索结果
      searchhistory: getItem('hm-search-history') || [] // 搜索历史记录数组
    }
  },

  // 计算属性
  computed: {},

  // 侦听器
  watch: {
    searchhistory (val) {
      setItem('hm-search-history', val)
    }
  },

  // 数据已初始化
  created () {},

  // DOM已渲染
  mounted () {},

  // 组件方法
  methods: {

    // 搜索栏搜索
    onSearch (val) {
      // 获取搜索内容
      this.searchText = val

      // 添加历史记录 : 1.不要用重复的值 2.新值添加到数组最前面
      const index = this.searchhistory.indexOf(val)
      if (index !== -1) {
        this.searchhistory.splice(index, 1)
      }

      this.searchhistory.unshift(val)

      // 显示搜索结果
      this.isResultShow = true
    },

    // 搜索栏取消
    onCancel () {
      this.$router.push('/home')
    },

    // 删除历史记录
    onSearchItemClick (index) {
      this.searchhistory.splice(index, 1)
    }
  }

}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .van-search__action {
    color: #fff;
  }
}
</style>
