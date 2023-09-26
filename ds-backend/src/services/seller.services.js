export const createSeller = async (data) => {
  const seller = await findSeller({ email: data.email });
  if (seller)
    return { status: 409, message: "This seller email already exists" };

  const SellerExist = await findSeller({ name: data.name });
  // 409 - indicating a conflict with the current state of the resource
  if (SellerExist)
    return { status: 409, message: "This seller name already exists" };

  return await insertSeller({ ...data });
};

export const retrieveAllSellers = async (data) => {
  return {
    status: 200,
    data: await getAllSellers(data),
    message: "All sellers retrieved successfully",
  };
};

export const getSellerDetails = async (seller_id) => {
  const result = await findSeller({ _id: seller_id });

  if (!result) {
    return {
      status: 404,
      message: "This seller details do not exist",
    };
  }

  return {
    status: 200,
    data: result,
    message: "Seller details retrieved successfully",
  };
};
