import React, { Fragment, createContext, useReducer } from 'react'

import AllProduct from './allProducts/AllProduct'
import { productState, productReducer } from '../../../../context/productContext'
import ViewProductModal from './viewProductModal/ViewProductModal'

/* This context manage all of the products component's data */
export const ProductContext = createContext()

const ProductComponent = () => {
  return (
    <div className="tw-grid tw-grid-cols-1 tw-space-y-4 tw-p-4">
      <AllProduct />
      <div className="tw-ol-span-1 tw-flex tw-justify-between tw-items-center">
        {' '}
        <ViewProductModal />
      </div>
    </div>
  )
}

const AdminProductsView = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(productReducer, productState)

  return (
    <Fragment>
      <ProductContext.Provider value={{ data, dispatch }}>
        <ProductComponent />
      </ProductContext.Provider>
    </Fragment>
  )
}

export default AdminProductsView
