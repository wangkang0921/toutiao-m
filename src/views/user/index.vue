<template>
  <div class="user-container">
    <!-- 已登入状态 -->
    <div v-if="token" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="user-img"
            round
            :src="userList.photo"
          />
          <span class="name"> {{userList.name}} </span>
        </div>
        <div class="right">
          <van-button class="right-btn" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count"> {{userList.art_count}} </div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count"> {{userList.follow_count}} </div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count"> {{userList.fans_count}} </div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count"> {{userList.like_count}} </div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 未登入状态 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/mobile.png" alt="" />
        <span class="text">登入 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

     <van-cell title="消息通知" is-link/>
     <van-cell title="小智同学" is-link/>
     <van-cell @click="onLogout" v-if="token" class="logout-cell" title="退出登入"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserList } from '@/api/user'

export default {
  name: 'userIndex',

  data () {
    return {
      userList: ''
    }
  },

  computed: {
    ...mapState('user', ['token'])
  },

  created () {
    if (this.token) {
      this.getUserList()
    }
  },

  methods: {
    // 退出登入
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('user/getUserToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 请求数据
    async getUserList () {
      try {
        const { data } = await getUserList()
        this.userList = data
      } catch (error) {
        this.$toast('状态已经过期, 轻重新登入')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 230px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 23px;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;

        .user-img {
          width: 132px;
          height: 132px;
          border: 2px solid #ffffff;
          margin-right: 22px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }

      .right {
        display: flex;
        align-items: center;
        .right-btn{
          width: 120px;
          height: 34px;
          color: #666666;
        }
      }
    }

    .data-stats {
      height: 130px;
      display: flex;

      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }
        .text {
          font-size: 24px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 140px;
      margin-bottom: 8px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span {
        margin-top: 10px;
        font-size: 28px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    margin-top: 8px;
    text-align: center;
    color: #d86262;
  }
}
</style>
