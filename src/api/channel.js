import request from '@/utils/request'

// 添加频道
export const getUserChannel = data => {
  return request.patch('/v1_0/user/channels', { channels: [data] })
}

// 删除频道
export const deleteUserChannel = channelId => request.delete(`/v1_0/user/channels/${channelId}`)
