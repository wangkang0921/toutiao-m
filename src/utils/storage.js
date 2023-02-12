// Token名字
const key = 'toutiao-m-token'

// 存储
export const setToken = (newToken) => localStorage.setItem(key, newToken)

// 读取
export const getToken = () => localStorage.getItem(key)

// 删除
export const delToken = () => localStorage.removeItem(key)

// 存储数据
export const setItem = (uname, newMsg) => {
  localStorage.setItem(uname, JSON.stringify(newMsg))
}

// 读取数据
export const getItem = uname => JSON.parse(localStorage.getItem(uname))

// 删除数据
export const delItem = uname => localStorage.removeItem(uname)
