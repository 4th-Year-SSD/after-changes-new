import Swal from 'sweetalert2'

import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: `http://localhost:3003/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
})
//type,sellerId
export const getSellerAllProduct = async () => {
  try {
    let res = await axiosInstance.get(`/product/seller/all-product`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const getAllProduct = async () => {
  try {
    let res = await axiosInstance.get(`/product/all-product`)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllProductOnSale = async () => {
  try {
    let res = await axiosInstance.get(`/product/all-product-onsale`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const createProduct = async (product) => {
  try {
    const { pName, pDescription, pImages, pStatus, pCategory, pQuantity, pPrice, pOffer, pWeight } =
      product

    const parsedQuantity = parseInt(pQuantity)
    const parsedPrice = parseFloat(pPrice)
    const parsedOffer = parseFloat(pOffer)
    const parsedWeight = parseFloat(pWeight)

    const requestBody = {
      pName,
      pDescription,
      pStatus,
      pCategory,
      pImages,
      pQuantity: parsedQuantity,
      pPrice: parsedPrice,
      pOffer: parsedOffer,
      pWeight: parsedWeight,
    }

    const response = await axiosInstance.post('/product/add-product', requestBody)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const editProduct = async (product) => {
  try {
    const {
      pId,
      pPid,
      pName,
      pDescription,
      pImages,
      pStatus,
      pCategory,
      pQuantity,
      pPrice,
      pOffer,
      pWeight,
    } = product

    const parsedQuantity = parseInt(pQuantity)
    const parsedPrice = parseFloat(pPrice)
    const parsedOffer = parseFloat(pOffer)
    const parsedWeight = parseFloat(pWeight)

    const requestBody = {
      pId,
      pPid,
      pName,
      pDescription,
      pStatus,
      pCategory,
      pImages,
      pQuantity: parsedQuantity,
      pPrice: parsedPrice,
      pOffer: parsedOffer,
      pWeight: parsedWeight,
    }
    let res = await axiosInstance.post(`/product/seller/edit-product`, requestBody)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteProduct = async (pId) => {
  try {
    let res = await axiosInstance.delete(`/product/delete-product/${pId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const getProductById = async (pId) => {
  try {
    let res = await axiosInstance.get(`/product/single-product/${pId}`)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
export const productByCategory = async (catId) => {
  try {
    let res = await axiosInstance.post(`/product/product-by-category`, {
      catId,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const productByPrice = async (price) => {
  try {
    let res = await axiosInstance.post(`/product/product-by-price`, {
      price,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
//admin confirm the product
export const confirmProduct = async (pPid) => {
  /* Most important part for updating multiple image  */

  try {
    const result = await swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      let res = await axiosInstance.patch(`/product/admin/confirm-product`, {
        pPid,
      })
      return res.data
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Product visibility status is not updated :)',
        'warning',
      )
    }
  } catch (error) {
    console.log(error)
  }
}
