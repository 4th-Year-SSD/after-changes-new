import React, { Fragment, useContext, useEffect, useState } from 'react'

import moment from 'moment'
import { ProductContext } from '../Products'
import TableFooter from './TableFooter'

const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <>
      <tr>
        <td className="tw-p-2 tw-text-left">
          {product?.pName.length > 15
            ? product?.pDescription.substring(1, 15) + '...'
            : product?.pName}
        </td>
        <td className="tw-p-2 tw-text-left">{product?.pDescription.slice(0, 15)}...</td>
        <td className="tw-p-2 tw-text-center">
          <img
            className="tw-w-12 tw-h-12 tw-object-cover tw-object-center"
            src={`${product?.pImages[0]}`}
            alt="pic"
          />
        </td>
        <td className="tw-p-2 tw-text-center">
          {product?.pStatus === 'Available' ? (
            <span className="tw-bg-green-200 tw-rounded-full tw-text-center tw-text-xs tw-px-2 tw-font-semibold">
              {product?.pStatus}
            </span>
          ) : (
            <span className="tw-bg-red-200 tw-rounded-full tw-text-center tw-text-xs tw-px-2 tw-font-semibold">
              {product?.pStatus}
            </span>
          )}
        </td>
        <td className="tw-p-2 tw-text-center">{product?.pQuantity}</td>
        {/* <td className="tw-p-2 tw-text-center">{product?.pCategory.cName}</td> */}
        <td className="tw-p-2 tw-text-center">{product?.pOffer}</td>
        <td className="tw-p-2 tw-text-center">{moment(product?.createdAt).format('lll')}</td>
        <td className="tw-p-2 tw-text-center">{moment(product?.updatedAt).format('lll')}</td>
        <td className="tw-p-2 tw-flex tw-items-center tw-justify-center">
          <span
            onClick={(e) => editProduct(product?._id, product, true)}
            className="tw-cursor-pointer tw-hover:bg-gray-200 tw-rounded-lg tw-p-2 tw-mx-1"
          >
            <svg
              className="tw-w-6 tw-h-6 tw-fill-current tw-text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteProduct(product?._id)}
            className="tw-cursor-pointer tw-hover:bg-gray-200 tw-rounded-lg tw-p-2 tw-mx-1"
          >
            <svg
              className="tw-w-6 tw-h-6 tw-fill-current tw-text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </>
  )
}

export default ProductTable
