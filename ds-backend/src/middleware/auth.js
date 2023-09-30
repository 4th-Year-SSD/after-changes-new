import { getOneUser } from "../repository/user.repository";
import { decodeJwtToken } from "../utils/jwt";
import { makeResponse } from "../utils/response";
import asyncHandler from "./async";

export const protect = asyncHandler(async (req, res, next) => {

  const token = req.headers.authorization
    ? req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null
    : null;
  if (!token)
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  const decodedUser = decodeJwtToken(token).data;

  const user = decodedUser
    ? await getOneUser({ _id: decodedUser._id }, false)
    : null;
  if (!user) return makeResponse({ res, status: 403, message: "Unauthorized" });
  req.user = user;
  next();
});

export const adminProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  next();
});

//To protect routes for only buyers
export const buyerProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "BUYER")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  next();
});

//To protect routes for only sellers
export const sellerProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "SELLER")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  next();
});
