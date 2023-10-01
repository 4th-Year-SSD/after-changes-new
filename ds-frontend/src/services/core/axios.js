import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
 // config.headers['x-csrf-token'] = `${localStorage.getItem('token')}`
  config.headers['Content-Type'] = `application/json`
  return config
})

