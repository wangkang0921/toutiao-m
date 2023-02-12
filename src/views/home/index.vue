<template>
  <div class="home-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-ba" fixed>
      <van-button
        class="search"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
      >
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 标签页 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <articleList :item="item"></articleList>
      </van-tab>
      <div slot="nav-right" class="plicehoder"></div>
      <div
        slot="nav-right"
        class="humgur-btn"
        @click="isChannelsEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelsEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <channelEdit
    :channels="channels"
    :active="active"
    @addChannels="addChannels"
    @onMychannelClick="onMychannelClick"
    @delChannels="delChannels"
    ></channelEdit>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './components/article-list'
import channelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'homeIndex',

  components: {
    articleList,
    channelEdit
  },

  computed: {
    ...mapState('user', ['token'])
  },

  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelsEditShow: false // 弹出层
    }
  },

  created () {
    // 获取频道数据
    this.getChannels()
  },

  methods: {
    async getChannels () {
      try {
        // 如果用户已经登入 获取服务端数据
        if (this.token) {
          const { data } = await getUserChannels()
          this.channels = data.channels
        } else if (getItem('channels')) {
          // 如果未登入 但是有本地存储
          this.channels = getItem('channels')
        } else {
          const { data } = await getUserChannels()
          this.channels = data.channels
        }
      } catch (error) {
        this.$toast.fail('获取频道列表失败')
      }
    },

    // 添加频道
    addChannels (value) {
      this.channels.push(value)
    },

    // 子组件控制频道选中状态
    onMychannelClick (value, isChannelsEditShow = true) {
      this.active = value
      // 关闭弹出层
      this.isChannelsEditShow = isChannelsEditShow
    },

    // 删除频道
    delChannels (value) {
      this.channels.splice(value, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 96px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
    border: none;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .van-tabs__nav {
    padding-bottom: 0;

    .van-tabs__wrap {
      height: 80px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .plicehoder {
      flex-shrink: 0;
      width: 50px;
      height: 82px;
    }
    .humgur-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 88px;
      background-color: #fff;
      opacity: 0.8;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
