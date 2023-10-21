import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      // validate: {
      //   validator: (v) => {
      //     return /^[a-zA-Z]+$/gm.test(v);
      //   },
    },
    status_code: {
      type: String,
      required: true,
      // validate: {
      //   validator: (v) => {
      //     return /^[a-zA-Z]+$/gm.test(v);
      //   },
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
