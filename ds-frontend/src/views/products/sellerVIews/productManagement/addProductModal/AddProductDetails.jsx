import React, { Fragment, useContext, useState, useEffect, useRef } from 'react'
import { ProductContext } from '../Products'
import { createProduct, getSellerAllProduct } from '../../../../../services/productService'
import { getAllCategory } from '../../../../../services/categoryService'
import { Badge } from 'react-bootstrap'
import { imageUpload, removeImage } from '../../../../../utils/imagesFunctions'
import { categories } from '../../../../../data/dumyCategories'

const AddProductDetail = () => {
  const { data, dispatch } = useContext(ProductContext)

  const alert = (msg, type) => <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>

  //added newly
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)


  const [imageAdded, setImageAdded] = useState(false)

  const [fData, setFdata] = useState({
    pName: '',
    pDescription: '',
    pStatus: '',
    pImages: [], // Initial value will be null or empty array
    pCategory: '',
    pPrice: '0.0',
    pOffer: '0.0',
    pQuantity: '0',
    pWeight: '0.0',
    success: false,
    error: false,
  })

  const fetchData = async () => {
    let responseData = await getSellerAllProduct()
    setTimeout(() => {
      if (responseData && responseData.data) {
        dispatch({
          type: 'fetchProductsAndChangeState',
          payload: responseData.data,
        })
      }
    }, 1000)
  }

  useEffect(() => {
    console.log(fData)
    setImageAdded(true)
    setSelectedFile(null)
  }, [fData?.pImages])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (fData.pImages?.length < 2) {
      setFdata({ ...fData, error: 'Please upload at least 2 image' })
      setTimeout(() => {
        setFdata({ ...fData, error: false })
      }, 2000)
    }

    try {
      console.log(fData)
      let responseData = await createProduct(fData)
      if (responseData.success) {
        fetchData()
        setFdata({
          ...fData,
          pName: '',
          pDescription: '',
          pImages: [],
          pStatus: '',
          pCategory: '',
          pPrice: '',
          pQuantity: '',
          pOffer: '',
          pWeight: '',
          success: responseData.success,
          error: false,
        })
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: '',
            pDescription: '',
            pImages: [],
            pStatus: '',
            pCategory: '',
            pPrice: '',
            pQuantity: 0,
            pOffer: 0,
            pWeight: 0.0,
            success: false,
            error: false,
          })
        }, 2000)
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error })
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false })
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG or GIF)')
    } else if (file.size > 1048576) {
      setError('The selected file is too large (max. 1MB)')
    } else {
      setSelectedFile(file)

      setError('')
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }
  const handleUpload = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      return
    }
    imageUpload(selectedFile, 'itemsImages')
      .then((imageUrl) => {
        // push the imageUrl to the imageUrl array
        setFdata((prevState) => ({
          ...prevState,
          error: false,
          success: false,
          pImages: [...prevState.pImages, imageUrl],
        }))
        console.log(imageUrl)
        setSelectedFile(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleImageRemove = (imageUrl, e) => {
    e.preventDefault()
    // Remove the image from Firebase Storage
    removeImage(imageUrl)
      .then(
        // Remove the imageUrl from the formData
        setFdata((prevState) => ({
          ...prevState,
          error: false,
          success: false,
          pImages: prevState.pImages.filter((url) => url !== imageUrl),
        })),

        console.log('Image removed from Firebase Storage'),
        setSelectedFile(null),
      )
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: 'addProductModal', payload: false })}
        className={`${
          data.addProductModal ? '' : 'tw-hidden'
        } tw-fixed tw-top-0 tw-left-0 tw-z-30 tw-w-full tw-h-full tw-bg-black tw-opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? '' : 'tw-hidden'
        } tw-fixed tw-inset-0 tw-flex tw-items-center tw-z-30 tw-justify-center tw-overflow-auto`}
      >
        <div className="tw-mt-4 tw-md:mt-0 tw-relative tw-bg-white tw-w-8/12 tw-md:w-3/6 tw-shadow-lg tw-flex tw-flex-col tw-items-center tw-space-y-4 tw-px-4 tw-py-4 tw-md:px-8">
          <div className="tw-flex tw-items-center tw-justify-between tw-w-full tw-pt-4">
            <span className="tw-text-left tw-font-semibold tw-text-2xl tw-tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: '#303031' }}
              onClick={(e) => dispatch({ type: 'addProductModal', payload: false })}
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
          {fData.error ? alert(fData.error, 'red') : ''}
          {fData.success ? alert(fData.success, 'green') : ''}
          <form className="tw-w-full">
            <div className="tw-flex tw-space-x-1 tw-py-4">
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1 tw-space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  type="text"
                />
              </div>
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1 tw-space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>

            {/* Most Important part for uploading multiple image */}

            <div className="tw-flex tw-space-x-1 tw-py-4">
              <div className="tw-flex tw-w-1/2  tw-flex-col tw-mt-4">
                <label htmlFor="image">Product Images *</label>
                <span className="tw-text-gray-600 tw-text-xs">Must need 2 images</span>
                {imageAdded && (
                  <div className="tw-mt-3">
                    {fData.pImages.map((image, index) => (
                      <Badge
                        pill
                        variant="secondary"
                        className="tw-mr-2 tw-mb-2"
                        style={{ padding: '0.5rem' }}
                      >
                        {image.split('?alt=media&token=')[0].split('%2F').pop()}
                        <span
                          aria-hidden="true"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => handleImageRemove(image, e)}
                        >
                          &times;
                        </span>
                      </Badge>
                    ))}
                  </div>
                )}
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleButtonClick}
                  className="tw-flex tw-flex-col tw-mt-4"
                >
                  <div className="tw-mt-3">
                    {selectedFile ? (
                      <Badge
                        pill
                        variant="secondary"
                        className="tw-mr-2 tw-mb-2"
                        style={{ padding: '0.5rem' }}
                      >
                        {URL.createObjectURL(selectedFile)}
                      </Badge>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {selectedFile && <button onClick={(e) => handleUpload(e)}>Upload Image</button>}
                <input type="file" onChange={handleFileSelect} ref={fileInputRef} />
              </div>
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                <label htmlFor="weight">Product Weight * (Kg)</label>
                <input
                  value={fData.pWeight}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pWeight: e.target.value,
                    })
                  }
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="weight"
                />
              </div>
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="tw-flex tw-space-x-1 tw-py-4">
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Available">
                    Available
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                <label htmlFor="status">Product Category *</label>
                <select
                  value={fData.pCategory}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option name="status" value={elem} key={elem}>
                            {elem}
                          </option>
                        )
                      })
                    : ''}
                </select>
              </div>
            </div>
            <div className="tw-flex tw-space-x-1 tw-py-4">
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="tw-w-1/2 tw-flex tw-flex-col tw-space-y-1">
                <label htmlFor="offer">Product Offfer (%) *</label>
                <input
                  value={fData.pOffer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  className="tw-px-4 tw-py-2 tw-border tw-focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="tw-flex tw-flex-col tw-space-y-1 tw-w-full tw-pb-4 tw-md:pb-6 tw-mt-4">
              <button
                style={{ background: '#303031' }}
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="tw-rounded-full tw-bg-gray-800 tw-text-gray-100 tw-text-lg tw-font-medium tw-py-2"
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddProductDetail
