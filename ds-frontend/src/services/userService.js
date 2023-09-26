import { axiosInstance as axios } from './core/axios'

export const getMe = async () => {
  return (await axios.get('/user/my/')).data.data
}
