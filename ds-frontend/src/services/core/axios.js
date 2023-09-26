import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export const apiRequest = async (request) => {
  const response = await request()
    .then((res) => ({
      ...res.data,
      success: true,
    }))
    .catch((error) => {
      const message = error.response.data.message
      //error message if data is not there
      // if (error.response.status === 403) {
      //   if (localStorage.getItem("token")) {
      //     alert(message);
      //   }
      // } else {
      //   alert(message);
      // }
      // return {
      //   success: false,
      //   message: message,
      // };
    })
  return response
}
