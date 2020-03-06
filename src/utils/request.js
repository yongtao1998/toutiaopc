// axios 请求拦截器
import axios from 'axios'
import JSONBig from 'json-bigint'
import router from '@/router'

// 公共url地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 使用 json-bigint 处理大数字
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器配置
axios.interceptors.request.use(function (config) {
  // 成功时执行 第一个参数 会有一个config  它是所有的axios的请求信息
  // 第一个函数 成功的时候 需要将配置进行返回 返回的配置 会作为请求参数进行请求
  // 注入 token
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败时进入第二个函数
  // 失败时 会有一个错误 直接reject错误即可
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
// 第一个函数是响应体
// 在拦截器中 需要将数据返回和解构
  return response.data ? response.data : {}
}, function (error) {
  if (error.response.status === 401) {
    // 清除 token
    localStorage.removeItem('user-token')
    // 错误码为401 回滚登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
