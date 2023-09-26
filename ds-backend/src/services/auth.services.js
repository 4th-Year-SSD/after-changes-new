import User from "../models/user.model";
import bcrypt from "bcrypt";
import { getOneUser, createUser } from "../repository/user.repository";
import { createAdmin } from "../repository/admin.repository";
import { createBuyer } from "../repository/buyer.repository";
import { insertSeller } from "../repository/seller.repository";

// get user service
export const loginUser = async ({ email, password }) => {
  // get user from db
  const user = await getOneUser({ email }, true);
  // check if user exists
  if (!user) return false;
  // check if password matches
  const isPasswordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  // if password does not match
  // return false
  if (!isPasswordMatch) return false;
  delete user.password;
  return user;
};
export const googleUserSignIn = async ({ email, name }) => {
  const userExist = await getOneUser({ email }, true);

  if (userExist) {
    delete userExist.password;
    return userExist;
  }
  const user = {
    role: "BUYER",
    password: "password",
    name: name,
    email: email,
  };
  const specificData = {};

  return await registerUser({ user, specificData });
};
// register user service
export const registerUser = async ({ user, specificData }) => {
  // encrypt password
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(
      user?.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS),
      (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      }
    );
  });

  if (user.role === "BUYER") {
    // create a new buyer
    var newBuyer = await createBuyer(specificData);
    // if buyer not created
  } else if (user.role === "ADMIN") {
    // create a new admin
    var newAdmin = await createAdmin(specificData);
  } else if (user.role === "SELLER") {
    var newSeller = await insertSeller(specificData);
  }
  // create a new user

  const registeredUser = await createUser({
    ...user,
    password: encryptedPassword,
    admin: user.role === "ADMIN" ? newAdmin._id : null,
    buyer: user.role === "BUYER" ? newBuyer._id : null,
    seller: user.role === "SELLER" ? newSeller._id : null,
  });

  return registeredUser;
};
