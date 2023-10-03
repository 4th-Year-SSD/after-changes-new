import { logout } from "../context/commonFunctions"

const alertAndLogout = () => { 
  alert('You are not allowed to perform this operation')
  setTimeout(logout, 3000)
}
export function checkSellerRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_SELLER_ROLE) {
        alertAndLogout()
  }
}

export function checkBuyerRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_BUYER_ROLE) {
    alertAndLogout()
  }
}

export function checkAdminRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_ADMIN_ROLE) {
     alertAndLogout()
  }
}
