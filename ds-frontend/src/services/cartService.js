import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const userId = localStorage.getItem('user_id')

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})
export const getTotalPrice = async () => {
  return (await axiosInstance.get(`/cart/getTotalPrice/${userId}`)).data.totalPrice
}

export const getCartItems = async () => {
  return (await axiosInstance.get(`/cart/${userId}/`)).data
}

export const addItemToCart = async (productId) => {
  const formData = {
    userId: userId,
    products: [productId],
  }
  try {
    const res = await axiosInstance.post(`/cart/`, formData)
  } catch (er) {
    console.log(er)
  }
}
