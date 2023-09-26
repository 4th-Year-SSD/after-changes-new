import './landing.css'
import { useNavigate } from 'react-router-dom'
import TopNav from '../../../components/topnav/TopNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap'

import secondCol from '../../../assets/images/landing-page/second-col.png'
import HerbCardList from '../../../components/herbCard/HerbCardList'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Image1 from '../../../assets/images/landing-slider/image1.jpg'
import Image2 from '../../../assets/images/landing-slider/image2.jpg'
import Image3 from '../../../assets/images/landing-slider/image3.jpg'
import Image4 from '../../../assets/images/landing-slider/image4.jpg'
import { Footer } from '../../../components'
import { Link } from 'react-router-dom'
import { getAllProductOnSale } from '../../../services/productService'

export default function Landing() {
  const navigate = useNavigate()
  const [images, setImages] = useState([
    { src: Image1, alt: 'Image 1' },
    { src: Image2, alt: 'Image 2' },
    { src: Image3, alt: 'Image 3' },
    { src: Image4, alt: 'Image 4' },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % images.length)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [currentIndex, images])

  return (
    <>
      <TopNav />
      <Container className="">
        <Row className="vh-50 pt-2 ">
          <Col className="position-relative overflow-flex" xs={8} xl={8} style={{ opacity: 0.8 }}>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width="860px"
              className="rounded-5"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', height: '400px' }}
            />
            <Link to={`/all-products`}>
              <button className="position-absolute bottom-0 start-0 ms-5 mb-5 btn btn-primary btn-banner">
                Shop Now
              </button>
            </Link>
            <div style={{ paddingBottom: '50px' }}></div>{' '}
            {/* Add some padding to the bottom of the column */}
          </Col>

          <Col className="" xs={4} xl={4}>
            {/* Second column with width of 35% */}
            <img src={secondCol} height="400px" width="100%" alt="second-column" />
          </Col>
        </Row>
        <Row className="vh-50 mt-0">
          <Col className="" xs={6}>
            <h1 className="fw-bold  fs-5"> Trending Goods</h1>
          </Col>
          <Col className="d-flex justify-content-end align-items-center" xs={6}>
            <button type="button" className="btn  d-flex align-items-center  p-0" onClick={() => navigate("/all-products")}>
              <small className="me-2 fw-bold">View All</small>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </Col>
        </Row>
        <Row className="vh-50">
          <Col xs={12}>
            <HerbCardList />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
