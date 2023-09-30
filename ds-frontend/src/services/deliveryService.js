import { axiosInstance as axios } from './core/axios'

export const createDelivery = async (delivery, csrf_token) => {
  delivery.csrf_token=csrf_token
  return (await axios.post('/delivery/create', delivery)).data
}
