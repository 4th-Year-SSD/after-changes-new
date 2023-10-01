import React from 'react'
import Reviews from '../../../components/reviewCards/reviews'


export default function BuyerReviewView() {
  const user_id = localStorage.getItem('user_id')
  return (
    <>
      <Reviews reviewCategory={{ user: user_id }} />
    </>
  )
}
