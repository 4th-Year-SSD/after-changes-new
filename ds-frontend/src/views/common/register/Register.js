import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Swal from 'sweetalert2'
import { TopNav } from '../../../components'

import { axiosInstance } from '../../../services/core/axios'
import SellerRegister from './sellerRegister/SellerRegister'
import BuyerRegister from './buyerRegister/BuyerRegister'

const Register = () => {
  //useState
  const [validated, setValidated] = useState(false)
  const location = useLocation()
  const isSeller = location.search.includes('seller=true')
  const [form, setForm] = useState({
    role: isSeller ? 'BUYER' : 'SELLER',
    name: {
      first_name: '',
      last_name: '',
    },
    email: '',
    password: '',
    phone: '',
    address: '',
    dob: '',
    nic: '',
    gender: '',
  })

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    const inForm = e.currentTarget

    //check if the form is valid
    if (inForm.checkValidity() === false) {
      setValidated(true)
    } else {
      //if the form is valid send the user entered data
      axiosInstance
        .post('/auth/register', form)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Request successfully sent!',
              showConfirmButton: false,
              timer: 2000,
            })
            setForm({})
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
        .then(function () {
          // always executed
        })

      setValidated(false)
    }
  }
  useState(() => {
    console.log(isSeller)
  })

  //handleInput
  const handleInput = (e) => {
    const name = e.target.name
    let value = e.target.value
    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <>
      <TopNav />
      {isSeller ? (
        <SellerRegister handleInput={handleInput} handleSubmit={handleSubmit} form={form} />
      ) : (
        <BuyerRegister handleInput={handleInput} handleSubmit={handleSubmit} form={form} />
      )}
    </>
  )
}
export default Register
