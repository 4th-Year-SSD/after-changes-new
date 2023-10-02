import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  addNewUser,
  getUsers,
  getUserByID,
  updateUserdetails,
} from "../services/user.services";
import CryptoJS from "crypto-js"; // Import the crypto-js library
// create user
export const create = asyncHandler(async (req, res) => {

   // Decrypt the address and phone fields before saving to the database
   const decryptedPhone = CryptoJS.AES.decrypt(req.body.phone, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
   const decryptedAddress = CryptoJS.AES.decrypt(req.body.address, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
 
   // Replace the original address and phone with decrypted values
   req.body.phone = decryptedPhone;
   req.body.address = decryptedAddress;


  const result = await addNewUser(req.body);
  if (!result)
    return makeResponse({ res, status: 500, message: "Failed to add user" });
  if (result.status) return makeResponse({ res, ...result });
  return makeResponse({
    res,
    status: 201,
    data: result,
    message: "User added successfully",
  });
});
// get all users
export const getAll = asyncHandler(async (req, res) => {
  const users = await getUsers(req.query);

  // Decrypt the address and phone fields for all users in the array
  const decryptedUsers = users.map((user) => {
    const decryptedPhone = CryptoJS.AES.decrypt(user.phone, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
    const decryptedAddress = CryptoJS.AES.decrypt(user.address, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
    return {
      ...user.toObject(),
      phone: decryptedPhone,
      address: decryptedAddress,
    };
  });

  return makeResponse({
    res,
    status: 200,
    data: decryptedUsers,
    message: "Users retrieved successfully",
  });
});

// get user by id
export const getById = asyncHandler(async (req, res) => {
  const ret = await getUserByID(req.params.id);
  if (ret.status) return makeResponse({ res, ...ret });
  // Decrypt the address and phone fields before sending the response
  const decryptedPhone = CryptoJS.AES.decrypt(ret.phone, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
  const decryptedAddress = CryptoJS.AES.decrypt(ret.address, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);

  // Replace the original address and phone with decrypted values
  ret.phone = decryptedPhone;
  ret.address = decryptedAddress;
  return makeResponse({
    res,
    status: 200,
    data: ret,
    message: "User retrieved successfully",
  });
});
// update user
export const update = asyncHandler(async (req, res) => {

   // Decrypt the address and phone fields before updating
   const decryptedPhone = CryptoJS.AES.decrypt(req.body.phone, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
   const decryptedAddress = CryptoJS.AES.decrypt(req.body.address, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
 
   // Replace the original address and phone with decrypted values
   req.body.phone = decryptedPhone;
   req.body.address = decryptedAddress;

  const result = await updateUserdetails(req.params.id, req.user, req.body);
  if (!result)
    return makeResponse({ res, status: 500, message: "Failed to update user" });
  if (result.status) return makeResponse({ res, ...result });
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "User updated successfully",
  });
});

// get my details
export const getMyDetails = asyncHandler(async (req, res) => {
  const user = await getUserByID(req.user._id);
  if (user.status) return makeResponse({ res, ...user });
 // Decrypt the address and phone fields before sending the response
 const decryptedPhone = CryptoJS.AES.decrypt(user.phone, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);
 const decryptedAddress = CryptoJS.AES.decrypt(user.address, "ThisIsASampleEncryptionKey").toString(CryptoJS.enc.Utf8);

 // Replace the original address and phone with decrypted values
 user.phone = decryptedPhone;
 user.address = decryptedAddress;
  return makeResponse({
    res,
    status: 200,
    data: user,
    message: "User retrieved successfully",
  });
});
