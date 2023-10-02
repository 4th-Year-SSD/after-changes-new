import { logout } from "../context/commonFunctions"

export function checkSellerRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_SELLER_ROLE) {
    alert('You are not allowed to perform this operation')

    // Forceably sign out the user 3 seconds after the alert is shown.
    setTimeout(logout, 3000)
  }
}

export function checkBuyerRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_BUYER_ROLE) {
    alert('You are not allowed to perform this operation')

    // Forceably sign out the user 3 seconds after the alert is shown.
    setTimeout(logout, 3000)
  }
}

export function checkAdminRole() {
  if (localStorage.getItem('role') !== process.env.REACT_APP_ADMIN_ROLE) {
    alert('You are not allowed to perform this operation')

    // Forceably sign out the user 3 seconds after the alert is shown.
    setTimeout(logout, 3000)
  }
}
