import React, { useEffect } from 'react'
import CartItem from '../../components/cartItem/CartItem'
import { TopNav } from '../../components'
import { Col, Container, Row } from 'react-bootstrap'
import './shoppingCart.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ShoppingCart() {
  const [totalPrice, setTotalPrice] = React.useState(0)
  const [noOfItems, setNoOfItems] = React.useState(0)
  const [cart, setCart] = React.useState([])
  const [userId, setUserId] = React.useState('')
  const [cartId, setCartId] = React.useState('')

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }

  

  //get total price of cart
  axios
    .get(`http://localhost:3001/api/cart/getTotalPrice/${localStorage.getItem('id')}`, config)
    .then((response) => {
      // console.log(response.data);
      setTotalPrice(response.data.totalPrice)
    })
    .catch((error) => {
      console.log(error)
    })

  //get no of items in the cart
  axios
    .get(`http://localhost:3001/api/cart/getCartCount/${localStorage.getItem('id')}`, config)
    .then((response) => {
      setNoOfItems(response.data.count)
    })
    .catch((error) => {
      console.log(error)
    })

  //remove all items from cart
  const handleRemove = () => {
    axios
      .delete(`http://localhost:3001/api/cart/${localStorage.getItem('id')}`, config)
      .then((response) => {
        console.log('Deleted')
        setCart([])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //remove one product from cart
  const handleRemoveProduct = (productId, e) => {
    e.preventDefault()
    axios
      .delete(`http://localhost:3001/api/cart/${localStorage.getItem('id')}/` + productId, config)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //get the cart
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/cart/${localStorage.getItem('id')}`, config)
      .then((response) => {
        // console.log(response.data)
        setUserId(response.data.userId)
        setCartId(response.data.cartId)
        setCart(response.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [cart])

  return (
    <>
      <TopNav />
      <h1 className="tw-font-bold tw-mx-4 tw-my-2 tw-text-2xl ">Shopping Cart</h1>
      <div className="tw-flex tw-justify-end tw-items-end tw-text-right tw-max-w-3xl tw-mx-auto tw-p-1 tw-flex-col">
        <a href="#" class="tw-text-red-500 tw-font-bold" onClick={handleRemove}>
          Remove
        </a>
      </div>
      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <CartItem cart={cart} handleRemoveProduct={handleRemoveProduct} />
      </div>
      <br />
      <div className="tw-max-w-3xl tw-mx-auto">
        <hr className="tw-border-t tw-border-gray-800 tw-dark:border-gray-300 tw-h-px tw-w-full tw-my-3" />
      </div>
      <div className="tw-justify-end tw-max-w-3xl tw-mx-auto tw-p-1 tw-flex-col tw-items-end ">
        {/* Display total price */}
        {/* <p>Total Price: $25000</p>
        <br />
        <a
          href="#"
          className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded-lg tw-mt-1 tw-self-end tw-ml-auto tw-text-right"
        >
          Checkout
        </a> */}
        <Container className="cart-footer">
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <Row className="tw-font-bold">Sub Total</Row>
              <Row className="tw-text-gray-400">{noOfItems} Items</Row>
            </Col>
            <Col className="tw-text-right tw-font-bold tw-text-2xl">Rs. {totalPrice}</Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col className="tw-flex tw-justify-end">
              <Link to="/checkout">
                <span className="checkout-btn tw-text-right tw-text-white tw-py-1 tw-px-4 tw-rounded-lg tw-mt-1 ">
                  Checkout
                </span>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
