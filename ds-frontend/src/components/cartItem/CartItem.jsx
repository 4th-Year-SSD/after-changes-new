import React, { useEffect, useState } from 'react'
import DrugsImage from '../../assets/images/landing-page/drugs-image.png'
import axios from 'axios'

export default function CartItem(props) {
  const [quantity, setQuantity] = useState(1)
  const { cart, handleRemoveProduct } = props

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }

const handleChange = (action, product, quantity) => {
  let prevQuantity = quantity
  setQuantity((quantity) => {
    console.log('quantity:', quantity)
    if (action === 'inc') {
      prevQuantity = quantity + 1
      return prevQuantity
    } else if (action === 'dec') {
      if (quantity <= 1) {
        return 1
      } else {
        prevQuantity = quantity - 1
        return prevQuantity
      }
    }
  })
  const payload = {
    product,
    quantity: prevQuantity,
  }
  axios
    .put(`http://localhost:3001/api/cart/642d7b2fadc38c896ac0a75e`, payload, config)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (
    <>
      {cart && cart?.map((ct) => (
          <div className="cards tw-max-w-3xl tw-mx-auto tw-p-3 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow tw-hover:bg-gray-100 tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-dark:hover:bg-gray-700 tw-flex tw-spacebetween tw-mt-3">
            <div className="image_box tw-p-6 tw-mr-15 tw-ml-5">
              <img
                src={ct.product?.pImages}
                alt=""
                style={{
                  width: '125px',
                  height: '125px',
                  borderRadius: '50%',
                  border: '3px solid #2D0A0A',
                }}
              />
            </div>
            {/* div which contains 3 p tags and a tags flex */}
            <div class="details tw-flex tw-justify-evenly tw-p-5 tw-mt-4 tw-mb-4 tw-ml-4 tw-mr-30">
              <div class="middle tw-items-center tw-mr-2 tw-ml-2">
                <p className="tw-font-bold">{ct.product?.pName}</p>
                <p class="tw-font-bold tw-text-gray-400">Rs.{ct.product?.pPrice}</p>
                <p class="tw-text-gray-400">{ct.product?.pWeight} g</p>
                <div class="tw-w-8 tw-h-8 tw-bg-white tw-flex tw-justify-center tw-items-center tw-border tw-border-black tw-mt-2">
                  <div class="tw-w-6 tw-h-6 tw-bg-green-500 tw-rounded-full"></div>
                </div>
              </div>
              <div class="tw-flex tw-items-center tw-justify-evenly tw-p-5 tw-my-4 tw-ml-20">
                <button
                  class="tw-m-2 tw-bg-gray-200 tw-rounded-full tw-w-8 tw-h-8 flex items-center justify-center"
                  onClick={() => handleChange('dec', ct.product._id, ct.quantity)}
                >
                  -
                </button>
                <span class="tw-m-2">{ct.quantity}</span>
                <button
                  class="tw-m-2 tw-bg-gray-200 tw-rounded-full tw-w-8 tw-h-8 flex items-center justify-center"
                  onClick={() => handleChange('inc', ct?.product._id, ct.quantity)}
                >
                  +
                </button>
              </div>
              <div class="tw-flex tw-flex-col tw-justify-center tw-items-end tw-ml-20">
                <p class="tw-text-gray-500 tw-font-bold tw-text-right">
                  Sub Total Rs.{ct.product?.pPrice * ct.quantity}
                </p>
                <div class="tw-text-right">
                  <a
                    href="#"
                    class="tw-text-red-500 tw-font-bold"
                    onClick={(e) => handleRemoveProduct(ct.product._id, e)}
                  >
                    Remove
                  </a>
                  <br />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
