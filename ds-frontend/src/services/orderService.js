import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createOrder = async (order, csrf_token) => {
  order.csrf_token=csrf_token
  return (await axiosInstance.post('/order/', order)).data
}
