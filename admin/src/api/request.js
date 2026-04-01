import axios from 'axios'
import { ElMessage } from 'element-plus'

const getApiBase = () => {
  const hostname = window.location.hostname
  const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
  return 'http://' + hostname + ':' + apiPort
}

const request = axios.create({
  baseURL: getApiBase(),
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  error => {
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request
