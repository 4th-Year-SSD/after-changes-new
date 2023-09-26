import Review from "../models/review.model";
import Product from "../models/product.model";
import Seller from "../models/seller.model";
import logger from "../utils/logger";

// Get the current highest review ID from the database
const getMaxReviewId = async () => {
  const result = await Review.findOne()
    .sort({ reviewID: -1 })
    .select('reviewID')
    .exec();
  if (result) {
    const currentId = result.reviewID;
    const numericPart = parseInt(currentId.slice(1));
    return numericPart;
  } else {
    return 0;
  }
};

export const getAllReviewsRepository = async () => {
  try {
    const reviews = await Review.find({});
    return {
      status: 200,
      data: reviews,
      message: "All reviews retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving all reviews - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve all reviews",
    };
  }
};

export const getReviewByIdRepository = async (review_id) => {
  try {
    const review = await Review.findById(review_id);
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    return {
      status: 200,
      data: review,
      message: "Review retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving a review by id - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the review",
    };
  }
};

export const getReviewsRepository = async (reviewData) => {
  console.log("review data in repo", reviewData);
  try {
    const reviews = await Review.find(reviewData)
    .populate("user")
    .exec();
    if (!reviews) {
      return {
        status: 404,
        message: "Reviews not found",
      };
    }
    return {
      status: 200,
      data: reviews,
      message: "Reviews retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving reviews - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the reviews",
    };
  }
};

export const createProductReviewRepository = async (reviewData, product_id) => {
  const product = await Product.findById(product_id);
  if (!product) {
    return {
      status: 404,
      message: "Product not found",
    };
  }
  const maxReviewId = await getMaxReviewId();
  const nextId = `R${(maxReviewId + 1).toString().padStart(3, '0')}`;
  const review = new Review({
    ...reviewData,
    product: product_id,
    reviewID: nextId,
  });

  try {
    const savedReview = await review.save();
    // Add the new review to the product's pReviews array
    product.pReviews.push(savedReview._id);
    await product.save();
    return {
      status: 200,
      data: savedReview,
      message: "Product Review created successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when creating a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not create the product review",
    };
  }
};

export const createSellerReviewRepository = async (reviewData, seller_id) => {
  const seller = await Seller.findById(seller_id);
  if (!seller) {
    return {
      status: 404,
      message: "Seller not found",
    };
  }
  const maxReviewId = await getMaxReviewId();
  const nextId = `R${(maxReviewId + 1).toString().padStart(3, '0')}`;
  const review = new Review({
    ...reviewData,
    seller: seller_id,
    reviewID: nextId,
  });

  try {
    const savedReview = await review.save();
    // Add the new review to the seller's sReviews array
    seller.sellerReviews.push(savedReview._id);
    await seller.save();
    return {
      status: 200,
      data: savedReview,
      message: "Seller Review created successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when creating a seller review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not create the seller review",
    };
  }
};

export const deleteProductReviewRepository = async (review_id) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    await Product.updateOne(
      { _id: deletedReview.product },
      { $pull: { pReviews: deletedReview._id } }
    );
    return {
      status: 200,
      data: deletedReview,
      message: "Product Review deleted successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when deleting a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not delete the product review",
    };
  }
};

export const deleteSellerReviewRepository = async (review_id) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(review_id);
    if (!deletedReview) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    await Seller.updateOne(
      { _id: deletedReview.seller },
      { $pull: { sellerReviews: deletedReview._id } }
    );
    return {
      status: 200,
      data: deletedReview,
      message: "Seller Review deleted successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when deleting a seller review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not delete the seller review",
    };
  }
};

export const updateProductReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {
  try {
    const review = await Review.findById(review_id);
    //check if the review exists
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    //check if the user created the review
    if (review.user.toString() !== user_id) {
      return {
        status: 401,
        message: "User not authorized",
      };
    }
    //check if the product exists
    const product = await Product.findById(review.product);
    if (!product) {
      return {
        status: 404,
        message: "Product not found",
      };
    }
    //check if the review exists in the product's pReviews array
    const existingReview = product.pReviews.find(
      (r) => r.toString() === review_id
    );
    if (!existingReview) {
      return {
        status: 404,
        message: "Review not found for this product",
      };
    }
    //update the review
    const updatedReview = await Review.findByIdAndUpdate(
      review_id,
      reviewData,
      { new: true }
    );
    return {
      status: 200,
      data: updatedReview,
      message: "Product Review updated successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when updating a product review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not update the product review",
    };
  }
};

export const updateSellerReviewRepository = async (
  review_id,
  user_id,
  reviewData
) => {
  try {
    const review = await Review.findById(review_id);
    //check if the review exists
    if (!review) {
      return {
        status: 404,
        message: "Review not found",
      };
    }
    //check if the user created the review
    if (review.user.toString() !== user_id) {
      return {
        status: 401,
        message: "User not authorized",
      };
    }
    //check if the seller exists
    const seller = await Seller.findById(review.seller);
    if (!seller) {
      return {
        status: 404,
        message: "Seller not found",
      };
    }
    //check if the review exists in the seller's sellerReviews array
    const existingReview = seller.sellerReviews.find(
      (r) => r.toString() === review_id
    );
    if (!existingReview) {
      return {
        status: 404,
        message: "Review not found for this seller",
      };
    }
    //update the review
    const updatedReview = await Review.findByIdAndUpdate(
      review_id,
      reviewData,
      { new: true }
    );
    return {
      status: 200,
      data: updatedReview,
      message: "Seller Review updated successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when updating a seller review - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not update the seller review",
    };
  }
};
