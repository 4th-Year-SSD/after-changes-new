import { Container, Row, Col } from 'react-bootstrap'
import DrugsImage from '../../assets/images/landing-page/drugs-image.png'
import './herbCard.scoped.css'
import Button from 'react-bootstrap/Button'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function HerbCard({ product }) {
  const navigate = useNavigate()
  useEffect(() => {
    console.log(product)
  }, [])
  return (
    <>
      <Container
        className="herb-card tw-border-4 tw-border-[#EDEAE7] tw-rounded-lg tw-shadow-glow"
        style={{
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/productview/${product?.pPid}`)}
      >
        <Row>
          <Col
            style={{
              width: '253px',

              display: 'flex',
              justifyContent: 'center',
              zIndex: '2',
            }}
          >
            <img
              src={product?.pImages[0]}
              className="mb-n2 ms-n2"
              style={{
                marginTop: '-1px',
                alignSelf: 'flex-right',
                width: '100px',
                height: '100px',
                zIndex: '3',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
              alt={product?.pImages[0]}
            />
          </Col>
          <Col className="tw-flex tw-justify-end tw-mt-3">
            <i class="fas fa-star" style={{ color: 'darkgreen' }}></i>
            <small className="tw-ml-2" style={{ color: 'darkgreen' }}>
              {' '}
              5.5
            </small>
          </Col>{' '}
        </Row>
        <Row>
          <Col className=""></Col>
          <Col className="tw-flex tw-justify-end">
            {product?.pSaleStatus && (
              <span className="badge bg-danger  text-white  "> {product?.pOffer}% Off</span>
            )}
          </Col>{' '}
        </Row>
        <Row>
          <Col>{product?.pName}</Col>
        </Row>
        <Row className="mt-1">
          <Col className="mt-3">
            <Button variant="outline-dark">Add +</Button>
          </Col>
          <Col className=" ">
            <Row className="">
              <small className="tw-flex tw-justify-end">6.00</small>
            </Row>
            <Row>
              <small className="tw-flex tw-justify-end text-danger tw-font-bold">
                $ {product?.pPrice}
              </small>
            </Row>
            <Row>
              <small className="tw-flex tw-justify-end">6.00</small>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
