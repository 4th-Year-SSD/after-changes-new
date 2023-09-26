import Seller from "../models/seller.model";
// get all sellers repository
export const getAllSellers = async (data) => {
  return await Seller.find(data);
};
// insert seller repository
export const insertSeller = async (data) => {
  return await new Seller(data).save();
};
// get seller by id repository
export const findSeller = async (filters) => {
  return await Seller.findOne(filters);
};

