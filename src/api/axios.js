import axios from 'axios'
import { useUserStore } from '../store'

const client = axios.create({
  // baseURL: 'http://10.0.2.2:8000/api/v1',
  baseURL: 'http://192.168.1.119:8000/api/v1',
  timeout: 5000,
  headers: {
    'X-Client-Type': 'Mobile',
  },
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
    console.log('API ERROR', error.message, 'status', error.status) // ✅ fires for 401, 500, network errors
    console.log(error.response.data)
    // return error
    return Promise.reject(error)
  }
)

export default client
