import Buyer from "../models/buyer.model";
import logger from "../utils/logger";

// create buyer repository
export const createBuyer = async (buyer) => {
  // create a new buyer object
  const buyerMade = (await new Buyer(buyer).save()).toObject();
  return buyerMade;
};
// get all buyers repository
export const getAllBuyers = async ({
  sort = {},
  filter = {},
  page,
  limit = 10,
}) => {
  const options = {
    page,
    limit,
    collation: {
      locale: "en",
    },
  };
 // if sort is not empty
  if (Object.keys(sort).length > 0) options.sort = sort;
 // if filter is not empty
  if (filter.member_count) {
    filter.members = { $size: Number(filter.member_count) };
    delete filter.member_count;
  }
  // if filter is not empty
  const aggregateQuery = () =>
    Buyer.aggregate([
      {
        $match: filter,
      },
      { $unset: ["password", "verification_code"] },
    ]);

  return await (page
    ? Buyer.aggregatePaginate(aggregateQuery(), options)
    : aggregateQuery()
  ).catch((err) => {
    logger.error(
      `An error occurred when retrieving customers - err: ${err.message}`
    );
    throw err;
  });
};
 // get one buyer repository
export const getOneBuyer = async (filters, returnPassword = false) => {
  const buyer = await Buyer.findOne(filters).lean();
  if (!buyer) return null;

  if (!returnPassword) delete buyer.password;
  return buyer;
};
// update buyer repository
export const findOneAndUpdateBuyer = async (filters, data) => {
  const buyer = await Buyer.findOneAndUpdate(filters, data, {
    new: true,
  }).lean();
  if (!buyer) return null;

  delete buyer.password;
  return buyer;
};
// delete buyer repository
export const findOneAndRemoveBuyer = async (filters) => {
  return await Buyer.findOneAndRemove(filters);
};
// subscribe repository
export const subscribe = async (buyerId, sellerId) => {
  // find buyer by id
  const user = await Buyer.findById(buyerId);
  let subscribed;
  if (user?.subscribed_companies?.includes(sellerId)) {
    await user.subscribed_companies.pull(sellerId);
    subscribed = false;
  } else {
    await user.subscribed_companies.push(sellerId);
    subscribed = true;
  }
  user.save();
  return subscribed;
};
