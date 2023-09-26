import React, { Fragment, useContext, useState, useEffect } from 'react'
import { ProductContext } from '../Products'

import { createProduct, getAllProduct } from '../../../../../services/productService'
import { getAllCategory } from '../../../../../services/categoryService'
import AddProductDetail from './AddProductDetails'

const AddProductModal = (props) => {
  useEffect(() => {

  }, [])



  return (
    <Fragment>
      <AddProductDetail  />
    </Fragment>
  )
}

export default AddProductModal
