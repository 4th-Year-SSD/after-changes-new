import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/products/sellerVIews/productManagement/Products'))
const SellerReviews = React.lazy(() => import('./views/reviews/sellerView/sellerReviewView'))

const BuyerReviews = React.lazy(() => import('./views/reviews/buyerView/buyerReviewView'))
const AdminProductsView = React.lazy(() =>
  import('./views/products/adminViews/productManagement/AdminProductsView'),
)
const OrderView = React.lazy(() => import('./views/orders/OrderView'))
const OrderAdminView = React.lazy(() => import('./views/orderAdmin/OrderAdminView'))
const Commission = React.lazy(() => import('./views/commission/Commission'))
const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/dashboard', name: 'SellerDashboard', element: Dashboard, permissions: 'isSeller' },
  { path: '/dashboard', name: 'BuyerDashboard', element: Dashboard, permissions: 'isBuyer' },
  {
    path: '/product-management/products',
    name: 'Products',
    element: Products,
    permissions: 'isSeller',
  },
  {
    path: '/product-management/products',
    name: 'Products',
    element: AdminProductsView,
    permissions: 'isAdmin',
  },
  {
    path: '/adminorder',
    name: 'OrderAdminView',
    element: OrderAdminView,
    permissions: 'isAdmin',
  },
  {
    path: '/adminorder',
    name: 'OrderAdminView',
    element: OrderAdminView,
    permissions: 'isAdmin',
  },
  {
    path: '/commission',
    name: 'Commission',
    element: Commission,
    permissions: 'isAdmin',
  },
  {
    path: '/seller-reviews',
    name: 'SellerReviews',
    element: SellerReviews,
    permissions: 'isSeller',
  },
  {
    path: '/buyer-reviews',
    name: 'BuyerReviews',
    element: BuyerReviews,
    permissions: 'isBuyer',
  },
  {
    path: '/orderview',
    name: 'OrderView',
    element: OrderView,
    permissions: 'isBuyer',
  },
]

export default routes
