import mongoose, { Schema } from "mongoose";


const SellerSchema = new Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    //object ids of reviews for this seller
    sellerReviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(`${process.env.SELLER_ROLE}`, SellerSchema);
