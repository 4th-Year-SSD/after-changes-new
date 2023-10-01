const express = require('express');
import { buyerProtect, protect } from "../middleware/auth.js";
const {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  deleteProductFromCart,
  getTotalPrice,
  getCartCount,
} = require("../controllers/cart.controller");
import { doubleCsrfProtection,csrfErrorHandler } from "../middleware/csrf.js";

const cartRouter = express.Router();

cartRouter.route("/").post(protect, createCart);
cartRouter
  .route("/:userId")
  .get(protect, getCartByUserId)
  .put(protect, doubleCsrfProtection, csrfErrorHandler, updateCart)
  .delete(protect, doubleCsrfProtection, csrfErrorHandler, deleteCart);
cartRouter
  .route("/:userId/:productId")
  .delete(
    protect,
     doubleCsrfProtection,
    csrfErrorHandler,
    deleteProductFromCart,
   
  );
// cartRouter.route('/:userId/:productId/').put(protect, updateProductQuantity);
cartRouter.route('/getTotalPrice/:userId').get(protect,buyerProtect, getTotalPrice);
cartRouter
  .route("/getCartCount/:userId")
  .get(protect, buyerProtect, getCartCount);

export default cartRouter;
