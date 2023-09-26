import React, { Fragment, useContext, useEffect, useState } from 'react'
import { getSellerAllProduct, deleteProduct } from '../../../../../services/productService'
import moment from 'moment'
import { ProductContext } from '../Products'
import ProductTable from '../productTable/ProductTable'

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
    let responseData = await getSellerAllProduct()
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

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId)
    if (deleteC.error) {
      console.log(deleteC.error)
    } else if (deleteC.success) {
      console.log(deleteC.success)
      fetchData()
    }
  }

  /* This method call the editmodal & dispatch product context */
  const editProduct = (pId, product, type) => {
    console.log(product)
    if (type) {
      dispatch({
        type: 'editProductModalOpen',
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
    <Fragment>
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
          <tbody>
            {products && products?.length > 0 ? (
              products?.map((item, key) => {
                return (
                  <ProductTable
                    product={item}
                    editProduct={(pId, product, type) => editProduct(pId, product, type)}
                    deleteProduct={(pId) => deleteProductReq(pId)}
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
    </Fragment>
  )
}
export default AllProduct
