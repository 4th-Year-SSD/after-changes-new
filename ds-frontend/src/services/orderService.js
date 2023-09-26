import { axiosInstance as axios } from './core/axios'

export const createOrder = async (order) => {
  return (await axios.post('/order/', order)).data
}
