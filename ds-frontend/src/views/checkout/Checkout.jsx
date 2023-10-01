import React from 'react'
import { getCartItems } from '../../services/cartService'
import { Typography, Box, Avatar, Select, MenuItem } from '@mui/material'
import TopNav from '../../components/topnav/TopNav'
import { getMe } from '../../services/userService'

import { createOrder } from '../../services/orderService'
import { getTotalPrice } from '../../services/cartService'
import { createDelivery } from '../../services/deliveryService'

const customInputStyles = 'tw-rounded-2xl tw-p-5 tw-focus:outline-none tw-h-12 tw-w-80 tw-mt-1'

const Checkout = () => {
  const [cartItems, setCartItems] = React.useState([])
  // const [merchantInfo, setMerchantInfo] = React.useState({})
  const [user, setUser] = React.useState({})
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [deliveryFee, setDeliveryFee] = React.useState(0)
  const [deliveryProvince, setDeliveryProvince] = React.useState('Central')

  React.useEffect(() => {
    getCartItems()
      .then((res) => setCartItems(res))
      .catch((err) => { })

    getMe()
      .then((res) => {
   
        setUser(res)
      })
      .catch((err) => {})
    getTotalPrice()
      .then((res) => {})
      .catch((err) => {})
  }, [])


  const handleProvinceChange = (e) => {
    setDeliveryProvince(e.target.value)
    switch (e.target.value) {
      case 'Central':
        setDeliveryFee(100)
        break
      case 'Eastern':
        setDeliveryFee(200)
        break
      case 'North Central':
        setDeliveryFee(300)
        break
      case 'Northern':
        setDeliveryFee(400)
        break
      case 'North Western':
        setDeliveryFee(500)
        break
      case 'Sabaragamuwa':
        setDeliveryFee(600)
        break
      case 'Southern':
        setDeliveryFee(700)
        break
      case 'Uva':
        setDeliveryFee(800)
        break
      case 'Western':
        setDeliveryFee(900)
        break
      default:
        setDeliveryFee(0)
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)

    const formData = {}
    form.forEach((value, key) => (formData[key] = value))
    const order = {
      products: cartItems?.products?.map((item) => ({
        product: item.product?._id,
        quantity: item.quantity,
      })),
      totalPrice: cartItems.amount,
    }
    const savedOrder = await createOrder(order)
    const newDelivery = {
      orderId: savedOrder._id,
      userId: user._id,
      //delivery date = current date + 1 day
      deliveryDate: new Date(Date.now() + 86400000),
      deliveryFee: deliveryFee,
      contactInformation: {
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
        contactNo: form.phone,
      },
      deliveryAddress: {
        houseNo: form.house_no,
        street: form.street,
        city: form.city,
        province: form.province,
        postalCode: form.postal_code,
      },
    }

    createDelivery(newDelivery)
  }

  return (
    <>
      <TopNav />
      <Box
        sx={{
          mx: '100px',
          mt: '30px',
        }}
      >
        <Typography
          sx={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#000',
          }}
        >
          Checkout
        </Typography>
        <form
          method="post"
          action="https://sandbox.payhere.lk/pay/checkout"
          className=""
          onSubmit={handleSubmit}
        >
          {/* <input type="hidden" name="merchant_id" value={merchantInfo.merchantId} />
          <input type="hidden" name="return_url" value={URL.return_url} />
          <input type="hidden" name="cancel_url" value={URL.cancel_url} />
          <input type="hidden" name="notify_url" value={URL.notify_url} /> */}
          <input type="hidden" name="currency" value="LKR" />
          <input type="hidden" name="country" value="Sri Lanka" />
          <input type="hidden" name="amount" id="amount" value={totalPrice + deliveryFee} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: '20px',
            }}
          >
            <Box
              sx={{
                width: '60%',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#000',
                    mb: '42px',
                  }}
                >
                  Contact Information:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '54px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      First Name
                    </Typography>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={user?.name?.first_name ?? ''}
                      className={customInputStyles}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Last Name
                    </Typography>
                    <input
                      type="text"
                      name="last_name"
                      value={user?.name?.last_name ?? ''}
                      className={customInputStyles}
                      placeholder="Last Name"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Email
                    </Typography>
                    <input
                      type="text"
                      name="email"
                      value={user?.email ?? ''}
                      className={customInputStyles}
                      placeholder="Email"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Contact Number
                    </Typography>
                    <input
                      type="text"
                      name="phone"
                      value={user?.phone ?? ''}
                      className={customInputStyles}
                      placeholder="Phone"
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#000',
                    mt: '30px',
                    mb: '32px',
                  }}
                >
                  Delivery details:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '54px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      House Number
                    </Typography>
                    <input
                      type="text"
                      name="house_number"
                      value=""
                      className={customInputStyles}
                      placeholder="360"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Street Name
                    </Typography>
                    <input
                      type="text"
                      name="street_name"
                      value=""
                      className={customInputStyles}
                      placeholder="Robert Lane"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      City
                    </Typography>
                    <input
                      type="text"
                      name="city"
                      value=""
                      className={customInputStyles}
                      placeholder="Malabe"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Postal Code
                    </Typography>
                    <input
                      type="text"
                      name="postal_code"
                      value=""
                      className={customInputStyles}
                      placeholder="10115"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'block',
                      minWidth: 320,
                      mb: '20px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#6d6b69',
                      }}
                    >
                      Province
                    </Typography>
                    <Select
                      className={customInputStyles}
                      value={deliveryProvince}
                      name="province"
                      label="Province"
                      onChange={handleProvinceChange}
                      fullWidth
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={'Central'}>Central</MenuItem>
                      <MenuItem value={'Eastern'}>Eastern</MenuItem>
                      <MenuItem value={'North Central'}>North Central</MenuItem>
                      <MenuItem value={'Nothern'}>Nothern</MenuItem>
                      <MenuItem value={'North Western'}>North Western</MenuItem>
                      <MenuItem value={'Sabaragamuwa'}>Sabaragamuwa</MenuItem>
                      <MenuItem value={'Southern	'}>Southern </MenuItem>
                      <MenuItem value={'Uva'}>Uva</MenuItem>
                      <MenuItem value={'Western'}>Western</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                padding: '1rem',
                width: '30%',
              }}
            >
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '500',
                  lineHeight: '36px',
                  color: '#000',
                }}
              >
                Your order:
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '35px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '500',
                      lineHeight: '30px',
                      color: '#6d6b69',
                    }}
                  >
                    Subtotal:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    LKR {totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '500',
                      lineHeight: '30px',
                      color: '#6d6b69',
                    }}
                  >
                    Delivery:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '700',
                    }}
                  >
                    LKR {deliveryFee.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: '35px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#393634',
                      lineHeight: '33px',
                    }}
                  >
                    Total:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    LKR {(totalPrice + deliveryFee).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4c7c7d',
                    width: '100%',
                  }}
                  className="tw-px-4 tw-py-2 tw-my-2 tw-text-white tw-rounded-md tw-hover:bg-indigo-600 tw-focus:outline-none"
                >
                  Purchase
                </button>
              </Box>
              <Box>
                {cartItems.products?.map(({ product, quantity }, key) => (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mt: '32px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                      }}
                    >
                      <Avatar alt={product?.pName} src={product?.pImages[0]} />
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#6d6b69',
                        }}
                      >
                        {product?.pName}
                      </Typography>
                    </Box>
                    <Typography>X</Typography>
                    <Typography>{quantity}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default Checkout
