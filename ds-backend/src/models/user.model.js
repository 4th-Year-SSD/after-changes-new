import mongoose from "mongoose";
import CryptoJS from "crypto-js"; // Import the crypto-js library
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["BUYER", "ADMIN", "SELLER"],
    default: "BUYER",
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
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

// Encryption function using CryptoJS
function encryptField(field) {
  const secretKey = "ThisIsASampleEncryptionKey";
  return CryptoJS.AES.encrypt(field, secretKey).toString();
}

// Middleware to encrypt address and phone before saving
UserSchema.pre("save", function (next) {
  this.phone   = encryptField(this.phone);
  this.address = encryptField(this.address);
  next();
});
UserSchema.plugin(aggregatePaginate);

const User = mongoose.model("User", UserSchema);

export default User;
