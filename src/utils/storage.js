// Token名字
const key = 'toutiao-m-token'

// 存储
export const setToken = (newToken) => localStorage.setItem(key, newToken)

// 读取
export const getToken = () => localStorage.getItem(key)

// 删除
export const delToken = () => localStorage.removeItem(key)
