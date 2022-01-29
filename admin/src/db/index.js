import axios from 'axios'
import { store, router } from '@/setup'

axios.interceptors.response.use((response) => {
  return response
}, async (error) => {
  if (error.response.status === 401) {
    // await store.dispatch('logout')
    await query('post', `/api/auth/logout`)
    router.push('/')
  }
  if (error.response && error.response.data) {
    return Promise.reject(error.response.data)
  }
  return Promise.reject(error.message)
})
const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}
const query = (method, url, params) => {
  return axios[method](url, params, config)
    .then(res => res.data)
}

const setHeaders = (name, token) => {
  const headers = axios.defaults.headers.common
  if (token) headers[name] = token
  else delete headers[name]
}

export const getToken = (name) => {
  const token = localStorage.getItem(name)
  setHeaders(name, token)
}

export const db = (name = '') => {
  const baseUrl = '/api' + name
  return {
    get: (url, params) => query('get', `${baseUrl}${url}`, params),
    post: (url, params) => query('post', `${baseUrl}${url}`, params),
    remove: (url, params) => query('delete', `${baseUrl}${url}`, params)
  }
}
