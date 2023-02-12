<template>
  <div class="channel-edit">
    <!-- 频道编辑 -->
    <!-- 单元格 -->
    <van-cell :border="false" class="title">
      <span class="title-text" slot="title">频道编辑</span>
      <van-button
       class="title-btn"
        type="danger"
         plain
         round
          size="mini"
          @click="isEditShow">
        {{isEdit ? "完成" : "编辑"}}</van-button
      >
    </van-cell>
    <!-- /单元格 -->
    <!-- 宫格 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channels"
        :key="index"
        @click="onMychannelClick(item, index)"
      >
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannels.includes(item.id)"></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">
          {{ item.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格 -->
    <!-- /频道编辑 -->

    <!-- 频道推荐 -->
    <!-- 单元格 -->
    <van-cell :border="false">
      <span slot="title">频道推荐</span>
    </van-cell>
    <!-- /单元格 -->
    <!-- 宫格 -->
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="item in recommend"
        :key="item.id"
        :text="item.name"
        icon="plus"
        @click="onaddChannel(item)"
      />
    </van-grid>
    <!-- /宫格 -->
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllList } from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { getUserChannel, deleteUserChannel } from '@/api/channel'

export default {
  // 组件名称
  name: 'channelEdit',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  // 组件状态值
  data () {
    return {
      allChannels: [], // 所有列表
      isEdit: false, // 控制频道编辑图标
      fiexChannels: [0]// 固定频道不允许删除
    }
  },
  // 计算属性
  computed: {
    ...mapState('user', ['token']),

    // 计算频道推荐
    recommend () {
      // 生成一个空数组
      const recommendChannels = []
      // 遍历所有频道
      this.allChannels.forEach((item) => {
        // 遍历我的频道
        const bl = this.channels.find((channel) => channel.id === item.id)
        if (!bl) {
          recommendChannels.push(item)
        }
      })
      return recommendChannels
    }
  },
  // 侦听器
  watch: {},
  // 数据已初始化
  created () {
    this.getAllChannerList()
  },
  // DOM已渲染
  mounted () {},
  // 组件方法
  methods: {
    async getAllChannerList () {
      const { data } = await getAllList()
      this.allChannels = data.channels
    },

    // 添加频道
    async onaddChannel (value) {
      // 把数据传给父级
      this.$emit('addChannels', value)

      if (this.token) {
        try {
          // 已登入存储到服务器
          await getUserChannel({
            id: value.id,
            seq: this.channels.length
          })
          this.$toast.success('更新频道成功')
        } catch (error) {
          this.$toast.fail('更新频道失败')
        }
      } else {
      // 未登入存储到本地
        setItem('channels', this.channels)
      }
    },

    // 控制编辑图标
    isEditShow () {
      this.isEdit = !this.isEdit
    },

    // 频道编辑跳转或删除
    onMychannelClick (item, index) {
      if (this.isEdit) {
        // 如果是固定频道不能删除
        if (this.fiexChannels.includes(item.id)) {
          return
        }

        // 删除数组里面的项
        this.$emit('delChannels', index)

        // 判断 如果删除之前的频道 下标需要减一
        if (index <= this.active) {
          this.$emit('onMychannelClick', this.active - 1)
        }

        // 调用更新频道数据函数
        this.delCannelList(item.id)
      } else {
      // 非编辑状态跳转
        this.$emit('onMychannelClick', index, false)
      }
    },

    // 删除频道方法
    async delCannelList (id) {
      try {
        if (this.token) {
          await deleteUserChannel(id)
        } else {
          // 未登入存储到本地
          setItem('channels', this.channels)
        }
      } catch (error) {
        this.$toast('更新数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
      font-size: 32px;
      color: #333333;
    }

    .title-btn {
      width: 104px;
      height: 47px;
      font-size: 26px;
      color: #f86363;
      border: 1px solid #f86363;
    }
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      background-color: #f4f5f6;

      &::after {
        border: none;
      }

      .text {
        font-size: 28px;
        color: #222222;
      }

      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      white-space: nowrap; //不折行

      .van-grid-item__text {
        margin: 0;
      }

      .van-icon-clear {
        font-size: 15px;
        position: absolute;
        top: -5px;
        right: -5px;
        color: #cacaca;
      }
    }
  }

  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap; //不折行

      .van-icon-plus {
        font-size: 28px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin: 0 0 0 6px;
      }
    }
  }
}
</style>
