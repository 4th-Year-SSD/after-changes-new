import { axiosInstance as axios } from './core/axios'

export const createDelivery = async (delivery) => {
  return (await axios.post('/delivery/create', delivery)).data
}
