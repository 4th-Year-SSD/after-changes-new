import express from "express";
import { v4 as uuidv4 } from "uuid";
//   getProductByCategory,
//   getProductByPrice,
//   postAddProduct,
//

// getSingleProduct

import { doubleCsrfProtection, csrfErrorHandler } from "../utils/csrf";
import {
  getAllProduct,
  postAddProduct,
  editProduct,
  getDeleteProduct,
  getAllProductOnSale,
  getSingleProduct,
  updateVisibleStatus,
} from "../controllers/product.controller";
import { protect, adminProtect, sellerProtect } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.get("/all-product", getAllProduct);

productRouter.get("/seller/all-product", protect, sellerProtect, getAllProduct);
// productRouter.get("/product-by-category", getProductByCategory);
// productRouter.get("/product-by-price", getProductByPrice);

productRouter.post(
  "/add-product",
  protect,
  sellerProtect,
  doubleCsrfProtection,
  csrfErrorHandler,
  postAddProduct
);
productRouter.post(
  "/edit-product/:id",
  protect,
  sellerProtect,
  adminProtect,
  doubleCsrfProtection,
  csrfErrorHandler,
  editProduct
);
productRouter.get("/all-product-onsale", getAllProductOnSale);
productRouter.delete(
  "/delete-product/:id",
  protect,
  sellerProtect,
  doubleCsrfProtection,
  csrfErrorHandler,
  getDeleteProduct
);
productRouter.get("/single-product/:id", getSingleProduct);
productRouter.patch(
  "/confirm-product",
  protect,
  adminProtect,
  doubleCsrfProtection,
  csrfErrorHandler,
  updateVisibleStatus
);
export default productRouter;
