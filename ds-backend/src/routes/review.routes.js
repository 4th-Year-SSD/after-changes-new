import express from "express";
// import { protect, adminProtect } from "../middleware/auth";
import {
  getAllReviewsController,
  createProductReviewController,
  deleteProductReviewController,
  updateProductReviewController,
  createSellerReviewController,
  deleteSellerReviewController,
  updateSellerReviewController,
  getReviewByIdController,
  getReviewsController,
} from "../controllers/review.controller";
import { doubleCsrfProtection , csrfErrorHandler } from "../middleware/csrf";
const reviewRouter  = express.Router();

reviewRouter.get("/", getAllReviewsController);
reviewRouter.get("/read-reviews/", getReviewsController);
reviewRouter.get("/:review_id", getReviewByIdController);

reviewRouter.post(
  "/products/create",
  doubleCsrfProtection,
  csrfErrorHandler,
  createProductReviewController,
 
);
reviewRouter.post(
  "/sellers/create",
    doubleCsrfProtection,
  csrfErrorHandler,
  createSellerReviewController,
 
);

reviewRouter.delete(
  "/products/delete/:review_id",
    doubleCsrfProtection,
  csrfErrorHandler,
  deleteProductReviewController,

);
reviewRouter.delete(
  "/sellers/delete/:review_id",
    doubleCsrfProtection,
  csrfErrorHandler,
  deleteSellerReviewController,
);

reviewRouter.put(
  "/products/update/:user_id",
    doubleCsrfProtection,
  csrfErrorHandler,
  updateProductReviewController,
);
reviewRouter.put(
  "/sellers/update/:user_id",
    doubleCsrfProtection,
  csrfErrorHandler,
  updateSellerReviewController,
);

export default reviewRouter ;
