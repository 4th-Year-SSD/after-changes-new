import { axiosInstance as axios } from './core/axios'

const userId = localStorage.getItem('id')

export const getTotalPrice = async () => {
  return (await axios.get(`/cart/getTotalPrice/${userId}`)).data.totalPrice
}

export const getCartItems = async () => {
  return (await axios.get(`/cart/${userId}/`)).data
}
