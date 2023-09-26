export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pId: '',
    pPid: '',
    pName: '',
    pDescription: '',
    pImages: [],
    pStatus: '',
    pCategory: '',
    pQuantity: '',
    pPrice: '',
    pOffer: '',
    pWeight: '',
  },
  viewProductModal: {
    modal: false,
    pId: '',
    pPid: '',
    pName: '',
    pDescription: '',
    pImages: [],
    pStatus: '',
    pCategory: '',
    pQuantity: '',
    pPrice: '',
    pOffer: '',
    pWeight: '',
  },
}

export const productReducer = (state, action) => {
  switch (action.type) {
    /* Get all product */
    case 'fetchProductsAndChangeState':
      return {
        ...state,
        products: action.payload,
      }
    /* Create a product */
    case 'addProductModal':
      return {
        ...state,
        addProductModal: action.payload,
      }
    /* Edit a product */
    case 'editProductModalOpen':
      return {
        ...state,
        editProductModal: {
          modal: true,
          pId: action.product.pId,
          pPid: action.product.pPid,
          pName: action.product.pName,
          pDescription: action.product.pDescription,
          pImages: action.product.pImages,
          pStatus: action.product.pStatus,
          pCategory: action.product.pCategory,
          pQuantity: action.product.pQuantity,
          pPrice: action.product.pPrice,
          pOffer: action.product.pOffer,
          pWeight: action.product.pWeight,
        },
      }
    case 'editProductModalClose':
      return {
        ...state,
        editProductModal: {
          modal: false,
          pId: '',
          pPid: '',
          pName: '',
          pDescription: '',
          pImages: [],
          pStatus: '',
          pCategory: '',
          pQuantity: '',
          pPrice: '',
          pOffer: '',
          pWeight: '',
        },
      }
      {
        /* View a product */
      }
    case 'viewProductModalOpen':
      return {
        ...state,
        viewProductModal: {
          modal: true,
          pId: action.product.pId,
          pPid: action.product.pPid,
          pName: action.product.pName,
          pDescription: action.product.pDescription,
          pImages: action.product.pImages,
          pStatus: action.product.pStatus,
          pCategory: action.product.pCategory,
          pQuantity: action.product.pQuantity,
          pPrice: action.product.pPrice,
          pOffer: action.product.pOffer,
          pWeight: action.product.pWeight,
        },
      }
    case 'viewProductModalClose':
      return {
        ...state,
        viewProductModal: {
          modal: false,
          pId: '',
          pPid: '',
          pName: '',
          pDescription: '',
          pImages: [],
          pStatus: '',
          pCategory: '',
          pQuantity: '',
          pPrice: '',
          pOffer: '',
          pWeight: '',
        },
      }
    default:
      return state
  }
}
