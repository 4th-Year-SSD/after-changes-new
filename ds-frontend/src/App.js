import React, { Suspense } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoutes from './ProtectedRoutes'
import {
  Login,
  ForgetPassword,
  Register,
  RegistrationIntro,
  Unauthorized,
  Landing,
  AboutUs,
  FAQ,
  NotFound,
  ServicesPage,
  ProductView,
} from './views/common'
import ShoppingCart from './views/shoppingCart/ShoppingCart'
import ItemView from './views/itemView/ItemView'
import OrderView from './views/orders/OrderView'
// import ReviewsView from './views/reviews/sellerView/sellerReviewView'
import Checkout from './views/checkout/Checkout'
import Payment from './views/checkout/Payment'

const loading = (
  <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
)

const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))
const UserLayout = React.lazy(() => import('./layout/UserLayout'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" name="Landing" element={<Landing />} />
          <Route path="/unauthorized" name="Unauthorized" element={<Unauthorized />} />
          <Route path="/login" name="Login" element={<Login />} />
          <Route path="/registration-intro" name="Reg-intro" element={<RegistrationIntro />} />
          <Route path="/forget-password" name="ForgetPassword" element={<ForgetPassword />} />
          <Route path="/aboutus" name="AboutUS" element={<AboutUs />} />
          <Route path="/faq" name="FAQ" element={<FAQ />} />
          <Route path="/services" name="ServicePage" element={<ServicesPage />} />
          <Route path="/registration" name="Register" element={<Register />} />
          <Route path="/shoppingcart" name="ShoppingCart" element={<ShoppingCart />} />
          <Route path="/all-products" name="ItemView" element={<ItemView />} />
          <Route path="/orderview" name="OrderView" element={<OrderView />} />
          <Route path="/productview/:id" name="ProductView" element={<ProductView />} />
          <Route path="/checkout" name="Checkout" element={<Checkout />} />
          <Route path="/payment" name="Payment" element={<Payment />} />
          <Route element={<ProtectedRoutes allowedRoles={['ADMIN']} />}>
            <Route path="admin/*" name="Home" element={<AdminLayout />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['SELLER', 'BUYER']} />}>
            {' '}
            <Route path="user/*" name="UserLayout" element={<UserLayout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
