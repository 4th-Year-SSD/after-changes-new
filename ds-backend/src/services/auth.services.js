import User from "../models/user.model";
import bcrypt from "bcrypt";
import { getOneUser, createUser } from "../repository/user.repository";
import { createAdmin } from "../repository/admin.repository";
import { createBuyer } from "../repository/buyer.repository";
import { insertSeller } from "../repository/seller.repository";

export const loginUser = async ({ email, password }) => {
  const user = await getOneUser({ email }, true);

  if (!user) return false;
  const isPasswordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  if (!isPasswordMatch) return false;
  delete user.password;
  return user;
};

export const registerUser = async ({ user, specificData }) => {
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS),
      (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      }
    );
  });

  if (user.role === "BUYER") {
    var newBuyer = await createBuyer(specificData);
  } else if (user.role === "ADMIN") {
    var newAdmin = await createAdmin(specificData);
  } else if (user.role === "SELLER") {
    var newSeller = await insertSeller(specificData);
  }

  const registeredUser = await createUser({
    ...user,
    password: encryptedPassword,
    admin: user.role === "ADMIN" ? newAdmin._id : null,
    buyer: user.role === "BUYER" ? newBuyer._id : null,
    seller: user.role === "SELLER" ? newSeller._id : null,
  });

  return registeredUser;
};
