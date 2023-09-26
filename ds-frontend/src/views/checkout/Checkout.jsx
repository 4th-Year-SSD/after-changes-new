import React from 'react'
import { getCartItems } from '../../services/cartService'
import { Typography, Box, Avatar } from '@mui/material'
import TopNav from '../../components/topnav/TopNav'
import { getMe } from '../../services/userService'
import { URL } from '../../utils/constants'
import { hash } from '../../utils/hash'
import { createOrder } from '../../services/orderService'
import { getTotalPrice } from '../../services/cartService'

const customInputStyles = 'tw-rounded-2xl tw-p-5 tw-focus:outline-none tw-h-12 tw-w-80 tw-mt-1'

const Checkout = () => {
  const [cartItems, setCartItems] = React.useState([])
  // const [merchantInfo, setMerchantInfo] = React.useState({})
  const [user, setUser] = React.useState({})
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [deliveryFee, setDeliveryFee] = React.useState(0)

  React.useEffect(() => {
    getCartItems()
      .then((res) => setCartItems(res))
      .catch((err) => console.log(err))
    // getMerchantInfo()
    //   .then((res) => setMerchantInfo(res))
    //   .catch((err) => console.log(err))
    getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err))
    getTotalPrice()
      .then((res) => setTotalPrice(res))
      .catch((err) => console.log(err))
  }, [])
  console.log(cartItems)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData(e.target)
    const formData = {}
    form.forEach((value, key) => (formData[key] = value))
    const order = {
      products: cartItems?.products?.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: cartItems.amount,
    }
    const savedOrder = await createOrder(order)

    // formData.order_id = savedOrder._id

    // formData.custom_1 = user._id

    // formData.hash = hash(
    //   merchantInfo.merchantId,
    //   formData.order_id,
    //   formData.amount,
    //   formData.currency,
    //   merchantInfo.merchantKey,
    // )
    // formData.return_url = undefined
    // formData.cancel_url = undefined
    // formData.sandbox = true
    // console.log(formData)
  }

  return (
    <>
      <TopNav />
      <Box
        sx={{
          mx: '100px',
          mt: '64px',
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
              mt: '32px',
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
                  Personal Information:
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
                      value="Saman"
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
                      value="Perera"
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
                      value="samanp@gmail.com"
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
                      Phone
                    </Typography>
                    <input
                      type="text"
                      name="phone"
                      value="0771234567"
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
                    mt: '76px',
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
                      Phone
                    </Typography>
                    <input
                      type="text"
                      name="city"
                      value="Colombo"
                      className={customInputStyles}
                      placeholder="city"
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
                      House No
                    </Typography>
                    <input
                      type="text"
                      name="house_number"
                      value="No 01"
                      className={customInputStyles}
                      placeholder="house no"
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
                      name="street"
                      value="Barnes Place"
                      className={customInputStyles}
                      placeholder="street"
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
                      value="00400"
                      className={customInputStyles}
                      placeholder="postal code"
                    />
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
                      <Avatar alt={product.pName} src={product.pImages[0]} />
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#6d6b69',
                        }}
                      >
                        {product.pName}
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
