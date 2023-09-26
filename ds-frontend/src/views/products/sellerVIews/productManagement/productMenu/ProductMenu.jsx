import React, { Fragment, useContext } from 'react'
import { ProductContext } from '../Products'
import AddProductModal from '../addProductModal/AddProductModal'
import EditProductModal from '../editProductModal/EditProductModal'

const ProductMenu = (props) => {
  const { dispatch } = useContext(ProductContext)
  return (
    <Fragment>
      <div className="tw-ol-span-1 tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center">
          {/* It's open the add product modal */}
          <span
            style={{ background: '#303031' }}
            onClick={(e) => dispatch({ type: 'addProductModal', payload: true })}
            className="tw-rounded-full tw-cursor-pointer tw-p-2 tw-bg-gray-800 tw-flex tw-items-center tw-text-gray-100 tw-text-sm tw-font-semibold tw-uppercase"
          >
            <svg
              className="tw-w-6 tw-h-6 tw-text-gray-100 tw-mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Product 
          </span>
        </div>
        <AddProductModal />
        <EditProductModal />
      </div>
    </Fragment>
  )
}

export default ProductMenu
