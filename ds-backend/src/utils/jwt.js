import jwt from "jsonwebtoken";
require("dotenv").config();
export const sendTokenResponse = async (res, req, user, message) => {
  const accessToken = generateJWTToken(user);

  res.status(200).json({
    data: { user, access_token: accessToken },
    message,
  });
};

export const generateJWTToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRE}d`,
  });
};

export const decodeJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
