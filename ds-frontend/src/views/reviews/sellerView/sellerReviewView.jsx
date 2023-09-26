import React from 'react'
import Reviews from '../../../components/reviewCards/reviews'
export default function SellerReviewView() {
  const seller_id = localStorage.getItem('id')
  return (
    <>
      <div>
        <Reviews reviewCategory={{ seller: seller_id }} />
      </div>
    </>
  )
}
