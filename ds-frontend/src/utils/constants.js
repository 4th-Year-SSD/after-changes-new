export const URL = {
  // base_url: ,
  return_url: `http://localhost:3000/payment?result=success`,
  cancel_url: `http://localhost:3000/payment?result=failed`,
  notify_url: `${process.env.REACT_APP_BACKEND_URL}/api/payment/`,
}
