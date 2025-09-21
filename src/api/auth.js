import client from './axios'

export default {
  async login(params) {
    const res = await client
      .post('/auth/login', params)
      .catch(error => ({ data: null, error: error.message }))
    return res
  },
}
