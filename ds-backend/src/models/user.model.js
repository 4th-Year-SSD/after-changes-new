import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: [`${process.env.BUYER_ROLE}`, `${process.env.ADMIN_ROLE}`, `${process.env.SELLER_ROLE}`],
    default: `${process.env.BUYER_ROLE}`,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `${process.env.BUYER_ROLE}`,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `${process.env.SELLER_ROLE}`,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `${process.env.ADMIN_ROLE}`,
  },
  name: {
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email should be unique"],
    lowercase: [true, "Email should be lowercase"],
  },
  password: {
    type: String,

  },
  phone: {
    type: String,

    validate: {
      validator: (v) => {
        return /\d{10}/gm.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    type: String,
   
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  profilePic: {
    type: String,
  },
});

UserSchema.plugin(aggregatePaginate);

const User = mongoose.model("User", UserSchema);

export default User;
