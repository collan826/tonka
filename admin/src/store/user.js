import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '../api/request'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  const login = async (loginData) => {
    const res = await request.post('/api/auth/login', loginData)
    setToken(res.data.token)
    userInfo.value = res.data.admin
    return res
  }

  const getUserInfo = async () => {
    const res = await request.get('/api/auth/info')
    userInfo.value = res.data
    return res
  }

  const logout = async () => {
    await request.post('/api/auth/logout')
    clearToken()
  }

  return {
    token,
    userInfo,
    setToken,
    clearToken,
    login,
    getUserInfo,
    logout
  }
})
