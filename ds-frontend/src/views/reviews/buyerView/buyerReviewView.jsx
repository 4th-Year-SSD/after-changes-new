import React from 'react'
import Reviews from '../../../components/reviewCards/reviews'
import AddReviewCard from './addReview/addReview'
import Grid from '@mui/material/Grid'

export default function BuyerReviewView() {
  return (
    <>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <AddReviewCard reviewCategory={reviewCategory} />
        </Grid>
      </Grid> */}
      <Reviews reviewCategory={{ user: '642d7b30adc38c896ac0a760' }} />
    </>
  )
}
