import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
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

export const addItemToCart = async (productId, csrf_token) => {
  const formData = {
    userId: userId,
    products: [productId],
    csrf_token:csrf_token
  }
  try {
    return  await axiosInstance.post(`/cart/`, formData)
 
  } catch (er) {
//
  }
}
