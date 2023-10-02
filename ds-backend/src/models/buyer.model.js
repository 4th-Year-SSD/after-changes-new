import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
require("dotenv").config();


const BuyerSchema = new mongoose.Schema({
  bank_details: {
    bank_name: {
      type: String,
    },
    acc_no: {
      type: String,
      validate: {
        validator: (v) => {
          return /^[\d]+$/gm.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid bank account number!`,
      },
    },
    branch: {
      type: String,
    },
    acc_owner: {
      type: String,
    },
  },
});

BuyerSchema.plugin(aggregatePaginate);

const Buyer = mongoose.model('Buyer', BuyerSchema);

export default Buyer;
