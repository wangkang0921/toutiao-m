import request from '@/utils/request'

// 获取文章新闻推荐
export const getAricleList = params => request.get('/v1_0/articles', { params })
