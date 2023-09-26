import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createOrder = async (order) => {
  return (await axiosInstance.post('/order/', order)).data
}
