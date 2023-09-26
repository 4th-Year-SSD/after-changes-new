import React from 'react'
import './orderCard.scoped.css'
import { Container, Row, Col } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'

export default function OrderCard(props) {
  const { order } = props

  // Calculate the total price
  let totalPrice = 0
  order.products.forEach((product) => {
    totalPrice += product.product.pPrice * product.quantity
  })

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4"></div>
      <Container className="order-card tw-border-4 tw-border-[#EDEAE7] tw-rounded-lg tw-shadow-glow ">
        <Row>
          <Col className="tw-flex tw-justify-center" style={{ zIndex: '2' }}>
            <img
              src={order?.products[0]?.product?.pImages}
              className="mb-n1 ms-n2 "
              style={{
                marginTop: '-1px',
                alignSelf: 'flex-right',
                width: '100px',
                height: '100px',
                zIndex: '3',
                transform: 'translateY(-30%)',
                borderRadius: '50%',
                border: '3px solid #2D0A0A',
              }}
              alt="Drugs"
            />
          </Col>
        </Row>
        <Container className="orderCardProducts">
          {order?.products.map((product) => (
            <Row key={product?.product?._id}>
              <Col className="tw-flex tw-font-bold">{product?.product?.pName}</Col>
              <Col className="tw-justify-end">
                <Row>
                  <small className="tw-flex tw-justify-end tw-text-gray-500 tw-font-bold">
                    Rs. {product?.product?.pPrice}
                  </small>
                </Row>
                <Row>
                  <small className="tw-flex tw-justify-end tw-text-gray-400">
                    x {product.quantity}
                  </small>
                </Row>
              </Col>
            </Row>
          ))}
        </Container>
        <hr />

        <Row>
          <Col className="mt-1">
            {order.orderStatus === 'Pending' ? (
              <Badge bg="warning" text="dark">
                {order.orderStatus}
              </Badge>
            ) : order.orderStatus === 'Cancelled' ? (
              <Badge bg="danger">{order.orderStatus}</Badge>
            ) : order.orderStatus === 'Dispatch' ? (
              <Badge bg="info" text="dark">
                {order.orderStatus}
              </Badge>
            ) : order.orderStatus === 'Confirmed' ? (
              <Badge bg="success">{order.orderStatus}</Badge>
            ) : null}
          </Col>
          <Col className="text-end">
            <small className="tw-justify-end  tw-font-bold ">Total price</small>
            <br />
            <small className="tw-justify-end text-danger tw-font-bold">Rs. {totalPrice}</small>
          </Col>
        </Row>
      </Container>
    </>
  )
}
