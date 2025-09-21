import axios from 'axios'
import { useUserStore } from '../store'

const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  // baseURL: 'https://url/api/v1',
})

client.interceptors.request.use(config => {
  const token = useUserStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

client.interceptors.response.use(
  response => response,
  error => {
    console.log('GLOBAL API ERROR', error) // ✅ fires for 401, 500, network errors
    // return error
    return Promise.reject(error)
  }
)

export default client
