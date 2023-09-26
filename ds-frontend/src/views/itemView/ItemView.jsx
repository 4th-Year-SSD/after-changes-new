import React, { useState, useContext, useEffect } from 'react'
import SideDrawerItem from '../../components/sideDrawerItem/SideDrawerItem'
import { TopNav } from '../../components'
import { Button, Col, Container, Row } from 'react-bootstrap'
import HerbCard from '../../components/herbCard/HerbCard'
import './itemView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { getAllProduct } from '../../services/productService'
import { productContext } from '../../context/productContext'

//const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // example array of products, replace with your own data
export default function ItemView() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 9

  const totalPages = Math.ceil(products.length / cardsPerPage)
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard)

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber)

  const fetchData = async () => {
    let responseData = await getAllProduct()
    setTimeout(() => {
      if (responseData?.data) {
        setProducts(responseData.data)
        console.log(responseData.data)
      }
    }, 1000)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderHerbCards = () => {
    return currentCards?.map(
      (product, index) =>
        product.pVisible && (
          <Col
            sm="4"
            key={index}
            style={{
              marginTop: '20px',
              padding: '10px',
            }}
          >
            <HerbCard product={product} />
          </Col>
        ),
    )
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`tw-mr-1 tw-rounded-full tw-px-3 tw-py-2 ${
            currentPage === i && 'tw-bg-blue-500 tw-text-white'
          }`}
        >
          <button onClick={() => handlePageClick(i)}>{i}</button>
        </li>,
      )
    }
    return pageNumbers
  }
  return (
    <>
      <TopNav />
      <Container className="tw-flex">
        <SideDrawerItem />
        <div className="tw-m-5 tw-flex tw-flex-col tw-items-center">
          <Row>{renderHerbCards()}</Row>
          <ul className="tw-flex tw-justify-center tw-mt-4">{renderPageNumbers()}</ul>
        </div>
      </Container>

      {/* //className="item-container" */}
    </>
  )
}

// ;<Button variant="primary load-more-btn">
//   <FontAwesomeIcon icon={faSync} className="me-2" /> Load More
// </Button>
{
  /*  */
}
