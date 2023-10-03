import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { axiosInstance } from '../../../../services/core/axios'

const SellerRegister = () => {
  //navigate variable
  const navigate = useNavigate()
  //useState
  const [validated, setValidated] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('none'); // Initialize to 'Weak'

  
  const [form, setForm] = useState({
    role:`${process.env.REACT_APP_SELLER_ROLE}`,
    name: {
      first_name: '',
      last_name: '',
    },
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  })

  

  const [passwordError, setPasswordError] = useState(''); // Initialize to an empty string

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    const inForm = e.currentTarget

    //check if the form is valid
    if (inForm.checkValidity() === false) {
      setValidated(true)
    }else if (
      !/[A-Z]/.test(form.password) || 
      !/[a-z]/.test(form.password) || 
      !/\d/.test(form.password)
    ) {
      // Check if password is not strong
      setPasswordError('Password must be strong (contain uppercase, lowercase, and numbers)');
    } else if (form.password !== form.confirmPassword) {
      // Check if passwords match
      setPasswordError("Passwords don't match");
    } else {

      // Reset password error
      setPasswordError('');
    

      //if the form is valid send the user entered data
      axiosInstance
        .post('/auth/register', { user:form })
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Registration successfull!',
              showConfirmButton: false,
              timer: 2000,
            })
            setForm({})
          }
          navigate('/login')
        })
        .catch(function (error) {
          // handle error
       
        })
        .then(function () {
          // always executed
        })

      setValidated(false)
    }
  }

  //handleInput
  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value
    setForm({
      ...form,
      [name]: value,
    })

  // Check password strength
  if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value)) {
    setPasswordStrength('Strong');
  } else if (/[a-z]/.test(value) && /\d/.test(value)) {
    setPasswordStrength('Medium');
  } else {
    setPasswordStrength('Weak');
  }
}
// Define styles based on password strength
const getPasswordStrengthStyles = () => {
  let borderColor = 'gray'; // Default to weak
  let messageColor = 'gray';

  if (passwordStrength === 'Medium') {
    borderColor = 'yellow';
    messageColor = 'yellow';
  } else if (passwordStrength === 'Weak') {
    borderColor = '#ff5925';
    messageColor = '#ff5925';
  }
   else if (passwordStrength === 'Strong') {
    borderColor = '#26d730';
    messageColor = '#26d730';
  } return {
    borderColor,
    color: messageColor,
  };
};

  return (
    <>
      <div className="">
        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-place-items-center">
          <div className="tw-p-12 tw-bg-white tw-sm:w-8/12 tw-md:w-8/12 tw-lg:w-8/12">
            <h1 className="tw-text-3xl tw-font-semibold tw-text-center">Seller Register Now !!!</h1>
            <form className="tw-mt-6 " onSubmit={handleSubmit}>
              <div className="tw-flex tw-sm:flex-col tw-md:flex-row tw-justify-center">
                <div className="tw-mr-8">
                  <label
                    for="firstName"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="first_name"
                    placeholder="John"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: {
                          ...form.name,
                          first_name: e.target.value,
                        },
                      })
                    }
                    autoComplete="firstName"
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  <label
                    for="lastName"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: {
                          ...form.name,
                          last_name: e.target.value,
                        },
                      })
                    }
                    autoComplete="lastName"
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  <label
                    for="email"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john.doe@company.com"
                    onChange={handleInput}
                    autoComplete="email"
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />

                </div>
                <div className="">
                  <label
                    for="phone"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    placeholder="0764376987"
                    autoComplete="phone"
                    onChange={handleInput}
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  <label
                    for="password"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="********"
                    autoComplete="new-password"
                    onChange={handleInput}
                    style={getPasswordStrengthStyles()} // Apply styles based on password strength
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  <div
                   className="tw-text-xs tw-mt-1"
                    style={{ color: getPasswordStrengthStyles().color }}>
                     Password Strength: {passwordStrength}
                  </div>
                  <label
                    for="confirmPassword"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    autoComplete="new-password"
                    onChange={handleInput}
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  {passwordError && (
                <div className="tw-text-red-600 tw-text-xs tw-mt-1">{passwordError}</div>
                   )}
                </div>
                <div className="tw-ml-8">
                  <label
                    for="address"
                    className="tw-block tw-mt-2 tw-text-xs tw-font-semibold tw-text-gray-600 tw-uppercase"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Colombo, Sri Lanka"
                    autoComplete="address"
                    onChange={handleInput}
                    className="tw-block tw-w-full tw-p-3 tw-mt-2 tw-text-gray-700 tw-bg-gray-200 tw-appearance-none tw-focus:outline-none tw-focus:bg-gray-300 tw-focus:shadow-inner"
                    required
                  />
                  
                </div>
              </div>
              <div>
                <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
                  <button
                    type="submit"
                    className="tw-w-5/12 tw-py-3 tw-mt-6 tw-font-medium tw-tracking-widest tw-text-white tw-uppercase tw-bg-[#383634] tw-shadow-lg tw-focus:outline-none tw-hover:bg-gray-900 tw-hover:shadow-none"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      navigate('/login')
                    }}
                    className="tw-text-center tw-mt-4 tw-text-base tw-text-gray-500 tw-cursor-pointer tw-hover:text-black"
                  >
                    Already registered?
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellerRegister
