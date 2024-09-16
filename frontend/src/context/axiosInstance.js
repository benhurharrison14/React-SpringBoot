import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:9191/',
})

instance?.interceptors?.request?.use(
  async (config) => {
    const bearerToken = sessionStorage.getItem("token")
    if (bearerToken) {
      config.headers['Authorization'] = `Bearer ${bearerToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
