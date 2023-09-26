import React from 'react'

import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const ProductTable = ({ product, confirmProduct, viewProduct }) => {
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
            onClick={(e) => viewProduct(product?._id, product, true)}
            className="tw-cursor-pointer tw-hover:bg-gray-200 tw-rounded-lg tw-p-2 tw-mx-1"
          >
            <FontAwesomeIcon icon={faEye} color="blue" />
          </span>
          <span
            onClick={(e) => confirmProduct(product?.pPid, product?.pSeller)}
            className="tw-cursor-pointer tw-hover:bg-gray-200 tw-rounded-lg tw-p-2 tw-mx-1"
          >
            <FontAwesomeIcon icon={faCheckCircle} color="green" />
          </span>
        </td>
      </tr>
    </>
  )
}

export default ProductTable
