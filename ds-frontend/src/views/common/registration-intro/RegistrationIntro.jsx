import './regIntro.css'
import TopNav from '../../../components/topnav/TopNav'

import { Container, Row, Col } from 'react-bootstrap'
import Lottie from 'react-lottie'
import animationDataTruck from '../../../assets/fastTruck.json'
import animationDataHuman from '../../../assets/garbageCollection.json'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function RegistrationIntro() {
  const navigate = useNavigate()

  const defaultOptionsTruck = {
    loop: true,
    autoplay: true,
    animationData: animationDataTruck,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const defaultOptionsHuman = {
    loop: true,
    autoplay: true,
    animationData: animationDataHuman,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <>
      <TopNav />
      <Container className="mt-5">
        <Row>
          <Col>
            <Lottie options={defaultOptionsTruck} height={200} width={200} />
          </Col>

          <Col>
            <Lottie options={defaultOptionsHuman} height={200} width={200} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <Button
              variant="outline-dark"
              onClick={() => {
                navigate('/registration')
              }}
            >
              Buyer
            </Button>
          </Col>

          <Col className="text-center">
            <Button
              variant="success"
              onClick={() => {
                navigate('/registration?seller=true')
              }}
              style={{
                color: 'green',
                ':hover': { backgroundColor: 'white', borderColor: 'white' },
              }}
            >
              Seller
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}
