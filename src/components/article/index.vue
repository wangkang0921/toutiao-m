<template>
  <van-cell class="articleItem">
    <div slot="title" class="title van-multi-ellipsis--l2"> {{item.title}} </div>
    <div slot="label" class="label-info-cover">
      <!-- 下方图片 -->
      <div v-if="item.cover.type === 3" class="cover-wrad">
        <div
        class="cover-item"
        v-for=" (img,index) in item.cover.images "
        :key="index"
        >
          <van-image
            class="cover-item-img"
            :src="img"
            fit="cover"
          />
        </div>
      </div>
      <span> {{item.aut_name}} </span>
      <span> {{item.comm_count}} </span>
      <span> {{item.pubdate | relativeTime}} </span>
    </div>
    <!-- 右边图片 -->
    <van-image
      class="right-cover"
      v-if="item.cover.type === 1"
      slot="default"
      :src="item.cover.images[0]"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'articleIndex',

  props: {
    item: Object
  }
}
</script>

<style lang="less" scoped>
.articleItem {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 20px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .cover-wrad {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      width: 232px;
      height: 100%;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img {
        width: 232px;
        height: 100%;
      }
    }
  }
  .label-info-cover span {
    font-size: 24px;
    margin-right: 24px;
  }
}
</style>
