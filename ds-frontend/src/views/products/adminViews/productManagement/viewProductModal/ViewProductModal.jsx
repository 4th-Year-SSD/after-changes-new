import React, { Fragment, useContext, useState, useEffect,  } from 'react'
import { ProductContext } from '../AdminProductsView'
import { getAllProduct } from '../../../../../services/productService'
import AwesomeSlider from 'react-awesome-slider'
import { Col, Row } from 'react-bootstrap'
const buttonStyle = {
  borderRadius: '50%',
  backgroundColor: 'white',
  opacity: 0.7,
  fontSize: '20px',
  color: 'black',
  margin: '10px 10px',
}
const contentStyle = {
  color: 'white',
  fontSize: '20px',
}
const bgImg = {
  position: 'absolute',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

const ViewProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext)

  const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

  const [formData, setformdata] = useState({
    pId: '',
    pName: '',
    pDescription: '',
    pImages: [],
    pStatus: '',
    pCategory: '',
    pQuantity: '',
    pPrice: '',
    pOffer: '',
    pWeight: '',
    error: false,
    success: false,
  })

  useEffect(() => {
    setformdata({
      pId: data.viewProductModal.pId,
      pName: data.viewProductModal.pName,
      pDescription: data.viewProductModal.pDescription,
      pImages: data.viewProductModal.pImages,
      pStatus: data.viewProductModal.pStatus,
      pCategory: data.viewProductModal.pCategory,
      pQuantity: data.viewProductModal.pQuantity,
      pPrice: data.viewProductModal.pPrice,

      pOffer: data.viewProductModal.pOffer,
      pWeight: data.viewProductModal.pWeight,
    })
  }, [data.viewProductModal])

  const fetchData = async () => {
    let responseData = await getAllProduct()
    if (responseData) {
      dispatch({
        type: 'fetchProductsAndChangeState',
        payload: responseData.data,
      })
    }
  }

  return (
    <>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: 'viewProductModalClose', payload: false })}
        className={`${
          data.viewProductModal.modal ? '' : 'tw-hidden'
        } tw-fixed tw-top-0 tw-left-0 tw-z-30 tw-w-full tw-h-full tw-bg-black tw-opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.viewProductModal.modal ? '' : 'tw-hidden'
        } tw-fixed tw-inset-0 tw-flex tw-items-center tw-z-30 tw-justify-center tw-overflow-auto `}
      >
        <div className="tw-mt-8 tw-md:mt-0 tw-relative tw-bg-white tw-w-11/12 tw-md:w-3/6 tw-shadow-lg tw-flex tw-flex-col tw-items-center tw-space-y-4 tw-px-4 tw-py-4 tw-md:px-8 tw-w-3/6 ">
          <div className="tw-flex tw-items-center tw-justify-between tw-w-full tw-pt-4">
            <span className="tw-text-left tw-font-semibold tw-text-2xl tw-tracking-wider">
              View Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: '#303031' }}
              onClick={(e) => dispatch({ type: 'viewProductModalClose', payload: false })}
              className="tw-cursor-pointer tw-text-gray-100 tw-py-2 tw-px-2 tw-rounded-full"
            >
              <svg
                className="tw-w-6 tw-h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          <div className="tw-w-full">
            <Row style={{ marginBottom: '10px' }}>
              <Col>
                {' '}
                <AwesomeSlider
                  organicArrows={false}
                  buttonContentRight={<p style={buttonStyle}>{'>'}</p>}
                  buttonContentLeft={<p style={buttonStyle}>{'<'}</p>}
                  play
                  // customContent={<p style={contentStyle}>{"I am the content/text"}</p>}
                  cancelOnInteraction={false} // should stop playing on user interaction
                  interval={500}
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  {formData?.pImages.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={image} style={bgImg} />
                    </div>
                  ))}
                </AwesomeSlider>
              </Col>
              <Col>
                <Row>
                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1 tw-space-x-1">
                    <label htmlFor="name">Product Name *</label>
                    <input
                      value={formData.pName}
                      className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                      type="text"
                      disabled
                    />
                  </div>
                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1 tw-space-x-1">
                    <label htmlFor="price">Product Price *</label>
                    <input
                      value={formData.pPrice}
                      type="number"
                      className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                      id="price"
                      disabled
                    />
                  </div>
                </Row>
                <Row>
                  <div className="tw-flex tw-flex-col tw-space-y-2">
                    <label htmlFor="description">Product Description *</label>
                    <textarea
                      value={formData.pDescription}
                      className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                      name="description"
                      id="description"
                      cols={5}
                      rows={2}
                      disabled
                    />
                  </div>
                </Row>
                <Row>
                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                    <label htmlFor="weight">Product Weight * (Kg)</label>
                    <input
                      value={formData.pWeight}
                      className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                      id="weight"
                      disabled
                    />
                  </div>
                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                    <label htmlFor="status">Product Status *</label>-
                  </div>
                </Row>
                <Row>
                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                    <label htmlFor="status">Product Category *</label>
                  </div>

                  <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                    <label htmlFor="quantity">Product in Stock *</label>
                    <input
                      value={formData.pQuantity}
                      type="number"
                      className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                      id="quantity"
                      disabled
                    />
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProductModal
