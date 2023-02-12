<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('cloreHistory')">删除全部</span>
        &nbsp;
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item,index) in searchhistory"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item,index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'SearchHistory',

  // 局部注册的组件
  components: {},

  // 组件参数 接收来自父组件的数据
  props: {
    searchhistory: Array
  },

  // 组件状态值
  data () {
    return {
      isDeleteShow: false // 控制图片显示/隐藏
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
    // 删除历史记录
    onSearchItemClick (item, index) {
      // 判断状态
      if (this.isDeleteShow) {
        // 删除记录
        this.$emit('onSearchItemClick', index)
      } else {
        this.$emit('onSearch', item)
      }
    }
  }

}
</script>

<style scoped lang="less">

</style>
