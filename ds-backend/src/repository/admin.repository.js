import Admin from '../models/admin.model'
import logger from '../utils/logger'
// create admin repository
export const createAdmin = async (admin) => {
  const adminMade = (await new Admin(admin).save()).toObject()
  return adminMade
}
// get all admins repository
export const getAllAdmins = async ({ sort = {}, filter = {}, page}) => {
  const options = {
    page,
    collation: {
      locale: 'en'
    }
  }
  // if sort is not empty
  if (Object.keys(sort).length > 0) options.sort = sort

  // if filter is not empty
  const aggregateQuery = () =>
    Admin.aggregate([
      {
        $match: filter
      },
      { $unset: ['password', 'verification_code'] }
    ])

  return await (page ? Admin.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
    logger.error(`An error occurred when retrieving admins - err: ${err.message}`)
    throw err
  })
}
// get one admin repository
export const getOneAdmin = async (filters, returnPassword = false) => {
  const admin = await Admin.findOne(filters).lean()
  if (!admin) return null

  if (!returnPassword) delete admin.password
  return admin
}
// update admin repository
export const findOneAndUpdateAdmin = async (filters, data) => {
  const admin = await Admin.findOneAndUpdate(filters, data, { new: true }).lean()
  if (!admin) return null

  delete admin.password
  return admin
}
// delete admin repository
export const findOneAndRemoveAdmin = async (filters) => {
  return await Admin.findOneAndRemove(filters)
}