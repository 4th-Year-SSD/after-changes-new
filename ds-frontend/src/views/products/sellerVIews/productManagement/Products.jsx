import React, { Fragment, createContext, useReducer } from 'react'

import ProductMenu from './productMenu/ProductMenu'
import AllProduct from './allProducts/AllProduct'
import { productState, productReducer } from '../../../../context/productContext'

/* This context manage all of the products component's data */
export const ProductContext = createContext()

const ProductComponent = () => {
  return (
    <div className="tw-grid tw-grid-cols-1 tw-space-y-4 tw-p-4">
      <ProductMenu />
      <AllProduct />
    </div>
  )
}

const Products = (props) => {
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

export default Products
