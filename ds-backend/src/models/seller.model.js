import mongoose, { Schema } from "mongoose";
import { type } from "os";

const SellerSchema = new Schema(
  {
    sellerName: { 
      type: String,
      required: true,
    },

    sellerEmail: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Seller", SellerSchema);
