import './login.css'
import TopNav from '../../../components/topnav/TopNav'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../services/core/axios'

export default function Login() {
  //email
  const [email, setEmail] = useState('')
  //password
  const [password, setPassword] = useState('')
  //navigate
  const navigate = useNavigate()

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault()
    //login user
    axiosInstance
      .post('/auth/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          //set localstorage
        
          localStorage.setItem('role', res.data.data.user.role)
          localStorage.setItem('token', res.data.data.access_token)
          localStorage.setItem('name', res.data.data.user.name.first_name)
          localStorage.setItem('email', res.data.data.user.email)
          localStorage.setItem('authenticated', true)
          localStorage.setItem('id', res.data.data.user._id)
          localStorage.setItem('user_id', res.data.data.user._id)
 
          setEmail('')
          setPassword('')
          
          if (res.data.data.user.role === 'SELLER') {
               localStorage.setItem('id', res.data.data.user.seller._id)
          }
          if (res.data.data.user.role === 'BUYER') {
               localStorage.setItem('id', res.data.data.user.buyer._id)
          }
          //check the user role
          if (res.data.data.user.role === 'ADMIN') {
            navigate('../admin/dashboard')
          } else if (res.data.data.user.role === 'SELLER' || res.data.data.user.role === 'BUYER') {
            navigate('../user/dashboard')
          }
        }
      })
      .catch(function (error) {
        // handle error
        Swal.fire({
          icon: 'error',
          title: 'Failed to login!',
          showConfirmButton: false,
          timer: 2000,
        })
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  return (
    <>
      <TopNav />

      <div className="">
        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-place-items-center">
          <div className="tw-p-12 tw-bg-white tw-sm:w-8/12 tw-md:w-8/12 tw-lg:w-4/12">
            <h1 class="tw-text-xl tw-font-semibold tw-text-center">Sign In</h1>
            <form class="tw-mt-6" onSubmit={handleSubmit}>
              <label for="email" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john.doe@company.com"
                autocomplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                required
              />

              <label
                for="password"
                class="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                autocomplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                required
              />

              <div className="tw-text-center">
                <button
                  onClick={() => {
                    navigate('/forget-password')
                  }}
                  class="tw-text-center tw-mt-4 tw-text-base tw-text-gray-500 tw-cursor-pointer tw-hover:text-black"
                >
                  Forget Passowrd ?
                </button>
              </div>
              <button
                type="submit"
                class="tw-w-full tw-py-3 tw-mt-6 tw-font-medium tw-tracking-widest tw-text-white tw-uppercase tw-bg-[#383634] tw-shadow-lg tw-focus:outline-none tw-hover:bg-gray-900 tw-hover:shadow-none"
              >
                Sign in
              </button>
              <div className="tw-text-center">
                <button
                  onClick={() => {
                    navigate('/patient-registration')
                  }}
                  class="tw-text-center tw-mt-4 tw-text-base tw-text-gray-500 tw-cursor-pointer tw-hover:text-black"
                >
                  Haven't create an account yet ? Register Now !
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
