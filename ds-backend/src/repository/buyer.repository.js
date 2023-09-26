import Buyer from "../models/buyer.model";
import logger from "../utils/logger";

export const createBuyer = async (buyer) => {
  const buyerMade = (await new Buyer(buyer).save()).toObject();
  return buyerMade;
};

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

  if (Object.keys(sort).length > 0) options.sort = sort;

  if (filter.member_count) {
    filter.members = { $size: Number(filter.member_count) };
    delete filter.member_count;
  }

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

export const getOneBuyer = async (filters, returnPassword = false) => {
  const buyer = await Buyer.findOne(filters).lean();
  if (!buyer) return null;

  if (!returnPassword) delete buyer.password;
  return buyer;
};

export const findOneAndUpdateBuyer = async (filters, data) => {
  const buyer = await Buyer.findOneAndUpdate(filters, data, {
    new: true,
  }).lean();
  if (!buyer) return null;

  delete buyer.password;
  return buyer;
};

export const findOneAndRemoveBuyer = async (filters) => {
  return await Buyer.findOneAndRemove(filters);
};

export const subscribe = async (buyerId, sellerId) => {
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
