// 用户相关的请求模块
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码
// export const getSmsCode = data => request.get('/app/v1_0/sms/codes/:mobile', { params: { data } })

export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取自己信息
export const getUserList = () => request.get('/v1_0/user')

// 获取用户的频道
export const getUserChannels = () => request.get('/v1_0/user/channels')
