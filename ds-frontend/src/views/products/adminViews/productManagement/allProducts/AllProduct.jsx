import React, { useContext, useEffect, useState } from 'react'
import { getAllProduct, confirmProduct } from '../../../../../services/productService'
import { ProductContext } from '../AdminProductsView'
import ProductTable from '../productTable/ProductTable'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { message } from 'antd'
import { socket } from '../../../../../components/topbar/TopBar'
const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext)
  const { products } = data

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    setLoading(true)
    let responseData = await getAllProduct()
    setTimeout(() => {
      if (responseData?.data) {
        dispatch({
          type: 'fetchProductsAndChangeState',
          payload: responseData.data,
        })
        console.log(responseData.data)
        setLoading(false)
      }
    }, 1000)
  }

  const confirmProductReq = async (pId, sellerId) => {
    let confirmProductResponse = await confirmProduct(pId)
    console.log(confirmProductResponse)
    if (confirmProductResponse?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 2000,
      })
    } else if (confirmProductResponse?.success) {
      console.log(sellerId)
      
      
      const data = { userID: sellerId, message: `Product ${pId} is accepted by admin` }
      console.log(JSON.stringify(data))
      
      socket.emit('post_data', JSON.stringify(data))
      message.success('Feed created successfully')
      
      console.log(confirmProductResponse.success)
      fetchData()
    }
  }

  /* This method call the editmodal & dispatch product context */
  const viewProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: 'viewProductModalOpen',
        product: { ...product, pId: pId },
      })
    }
  }

  if (loading) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-p-8">
        <svg
          className="tw-w-12 tw-h-12 tw-animate-spin tw-text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <Container style={{ height: '80vh', overflowY: 'hidden !important', overflowX: 'hidden' }}>
      <div className="tw-col-span-1  tw-overflow-auto tw-bg-white tw-shadow-lg tw-p-4 tw-h-full">
        <table className="tw-table-auto tw-border tw-w-full tw-my-2">
          <thead>
            <tr>
              <th className="tw-px-4 tw-py-2 tw-border">Product</th>
              <th className="tw-px-4 tw-py-2 tw-border">Description</th>
              <th className="tw-px-4 tw-py-2 tw-border">Image</th>
              <th className="tw-px-4 tw-py-2 tw-border">Status</th>
              <th className="tw-px-4 tw-py-2 tw-border">Stock</th>
              {/* <th className="tw-px-4 tw-py-2 tw-border">Category</th> */}
              <th className="tw-px-4 tw-py-2 tw-border">Offer</th>
              <th className="tw-px-4 tw-py-2 tw-border">Created at</th>
              <th className="tw-px-4 tw-py-2 tw-border">Updated at</th>
              <th className="tw-px-4 tw-py-2 tw-border">Actions</th>
            </tr>
          </thead>
          <tbody style={{ height: '80vh', overflowY: 'scroll', overflowX: 'hidden' }}>
            {products && products?.length > 0 ? (
              products?.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    viewProduct={(pId, product, type) => viewProduct(pId, product, type)}
                    confirmProduct={(pId,sellerId) => confirmProductReq(pId, sellerId)}
                    key={key}
                  />
                )
              })
            ) : (
              <tr>
                <td colSpan="10" className="tw-text-xl tw-text-center tw-font-semibold tw-py-8">
                  No product found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="tw-text-sm tw-text-gray-600 tw-mt-2">
          Total {products && products.length} product found
        </div>
      </div>
    </Container>
  )
}
export default AllProduct
