import Seller from "../models/seller.model";

export const getAllSellers = async (data) => {
  return await Seller.find(data);
};

export const insertSeller = async (data) => {
  return await new Seller(data).save();
};

export const findSeller = async (filters) => {
  return await Seller.findOne(filters);
};

