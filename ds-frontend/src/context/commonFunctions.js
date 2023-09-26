import { googleLogout } from '@react-oauth/google'

export const logout = () => {
  googleLogout()
  localStorage.removeItem('authorized')
  localStorage.removeItem('role')
  localStorage.removeItem('access_token')
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  localStorage.removeItem('authenticated')
  localStorage.removeItem('id')
  window.location.replace('/login')
}
