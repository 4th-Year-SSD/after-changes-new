import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function OrderAdminTable() {
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState('');

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }

  const updateOrderStatus = (orderId, status) => {
    axios
      .put(
        `http://localhost:3001/api/order/updateOrderStatus/${orderId}`,
        { orderStatus: status },
        config,
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/order/getAllOrders', config)
      .then((res) => {
        console.log(res.data)
        setOrderData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  return (
    <div>
      <table class="tw-min-w-full tw-bg-white tw-border-radius">
        <thead class="tw-bg-gray-700">
          <tr>
            <th class="tw-px-6 py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Name
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Order Id
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Products
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Payment Status
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Order Status
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Total Price
            </th>
            <th class="tw-px-6 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-white tw-uppercase tw-tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="tw-divide-y tw-divide-gray-200">
          {orderData.map((order) => (
            <tr key={order.orderId}>
              <td class="tw-px-6 tw-py-4 tw-whitespace-nowrap ">
                <div>
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    class="tw-w-10 tw-h-10 tw-rounded-full"
                  />
                  <div class="tw-text-sm tw-font-medium tw-text-gray-900">
                    {order.userId?.name?.first_name}
                  </div>
                  <div class="tw-text-sm tw-text-gray-500">{order.userId?.email}</div>
                </div>
              </td>
              <td class="tw-px-6 py-4 tw-whitespace-nowrap">
                <div class="tw-text-sm tw-text-gray-900">{order.orderId}</div>
              </td>

              <td class="tw-px-6 py-4 tw-whitespace-nowrap">
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <div class="tw-text-sm tw-text-gray-900">{product.product.pName}</div>
                      <div class="tw-text-sm tw-text-gray-500">x {product.quantity}</div>
                    </li>
                  ))}
                </ul>
              </td>

              <td class="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <span class="tw-px-2 tw-inline-flex tw-text-xs tw-leading-5 tw-font-semibold tw-rounded-full tw-bg-green-100 tw-text-green-800">
                  {order.paymentStatus}
                </span>
              </td>
              <td class="tw-px-6 tw-py-4 tw-whitespace-nowrap">
                <span
                  class="tw-px-2 tw-inline-flex tw-text-xs tw-leading-5 tw-font-semibold tw-rounded-full tw-bg-green-100 tw-text-white"
                  style={{
                    backgroundColor:
                      order.orderStatus === 'Pending'
                        ? '#FFA500'
                        : order.orderStatus === 'Cancelled'
                        ? '#DC3545'
                        : order.orderStatus === 'Dispatch'
                        ? '#17A2B8'
                        : order.orderStatus === 'Confirmed'
                        ? '#28A745'
                        : '',
                  }}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td class="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-text-gray-500">
                Rs. {order.totalPrice}
              </td>
              <td class="tw-px-6 py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-left">
                <a
                  href="#"
                  class="tw-text-green-600 tw-hover:text-indigo-900 tw-text-2xl"
                  onClick={() => updateOrderStatus(order.orderId, 'Confirmed')}
                >
                  <i className="fas fa-check"></i>
                </a>
                <a
                  href="#"
                  class="tw-text-red-600 tw-hover:text-indigo-900 tw-ml-7 tw-text-2xl"
                  onClick={() => updateOrderStatus(order.orderId, 'Cancelled')}
                >
                  <i className="fas fa-times"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
