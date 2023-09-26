// import axios from 'axios'
// const baseURL = 'http://localhost:3010/api/commission/'
import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `http://localhost:3010/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

export const addCommission = async (commission) => {
  const result = await axiosInstance.post(`/commission/`, { commission_percentage: commission })
  console.log('result: ', result)
  return result
}

export const getCommission = async () => {
  return (await axiosInstance.get(`/commission/`)).data.data
}

export const updateCommission = async (user_id, commission) => {
  return (await axiosInstance.patch(`/commission/${user_id}`, commission)).data
}
