import mongoose from "mongoose";
import CryptoJS from "crypto-js"; // Import the crypto-js library
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['BUYER', 'ADMIN','SELLER'],
    default: 'BUYER',
    required: [true, "Role is required"],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Buyer`,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Seller`,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: `Admin`,
  },
  name: {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      // validate: {
      //   validator: (v) => {
      //     return /^[a-zA-Z]+$/gm.test(v);
      //   },
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      // validate: {
      //   validator: (v) => {
      //     return /^[a-zA-Z]+$/gm.test(v);
      //   },
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "Email should be unique"],
    lowercase: [true, "Email should be lowercase"],
    validate: {
      validator: (v) => {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "Password should be atleast 8 characters long"],
    //add password validation
    validate: {
      validator: (v) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(v);
      },
      message: (props) =>
        `Password should contain atleast one uppercase, one lowercase and one number`,
    },
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
    required: [true, "Address is required"],
    validate: {
      validator: (v) => {
        return /^[a-zA-Z0-9\s,'-]*$/gm.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid address!`,
    },
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
