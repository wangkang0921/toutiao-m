<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-ba" title="登入">
      <i slot="left">
        <van-icon @click="$router.back()" class="left-icon" name="cross" />
      </i>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入密码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 验证码 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountShow = false"
          />
          <van-button
          v-else
          class="send-sms-btn"
          round size="small"
          @click="onSendSms"
          type="default"
          native-type="button"
          >
            <span>发送验证码</span>
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          block
          type="info"
          native-type="submit"
          >登入</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'

export default {
  name: 'loginIndex',

  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      // 表单验证
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码不能为空' }
        ]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },

  methods: {
    // 登入
    async onSubmit (values) {
      // 登入loading
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      // 发起请求
      try {
        const { data } = await login(this.user)
        this.$toast.success('登入成功')

        // 跳转页面
        this.$router.back()
        // 存储token
        this.$store.commit('user/getUserToken', data.token)
      } catch (error) {
        this.$toast.fail('登入失败')
        console.log('登录失败', error)
      }
    },
    // 获取验证码
    async onSendSms () {
      // 1. 校验手机号
      console.log(111)
      try {
        await this.$refs.form.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        const res = await getSmsCode(this.user.mobile)
        console.log(res)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .left-icon {
    color: #fff;
    font-size: 40px;
  }
  .toutiao {
    font-size: 38px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    font-size: 22px;

    span {
      display: block;
      width: 160px;
      color: #666666;
    }
  }

  .login-btn-wrap {
    padding: 50px 30px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
