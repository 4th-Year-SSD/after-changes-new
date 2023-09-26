import React, { useEffect } from 'react'
import OrderCard from '../../components/orderCard/OrderCard'
import { TopNav } from '../../components'
import './orderView.scoped.css'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'

export default function OrderView() {
  const [orders, setOrders] = React.useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }



  useEffect(() => {
    axios.get(`http://localhost:3001/api/order/`,config).then((response)=>{
      console.log(response.data);
      setOrders(response.data);
    }).catch((error)=>{
      console.log(error)
    })
  }, [orders]);

  return (
    <>
      <TopNav />
      <Container>
        <h1 className="tw-font-bold tw-text-2xl order-title">My Orders</h1>
        <Row className="tw-mt-5 tw-row tw-g-4">
          {orders.map((order, index) => (
            <Col
              key={order.orderId}
              className={`tw-mb-5 ${orders.length > 2 ? 'tw-col-md-6' : 'tw-col-md-3'}`}
            >
              <OrderCard order={order} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
