import * as React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { deleteProductReview, deleteSellerReview } from '../../../../services/reviewService'

export default function DeleteReviewCard({ reviewDetails, isOpen, onClose }) {
  const reviewType = reviewDetails.product ? 'product' : 'seller'
  const handleDelete = () => {
    if (reviewType === 'product') {
      deleteProductReview(reviewDetails._id)
        .then((res) => {
          console.log('Review deleted: ', res)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      deleteSellerReview(reviewDetails._id)
        .then((res) => {
          console.log('Review deleted: ', res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    onClose()
  }

  return (
    <>
      <div>
        <Dialog open={isOpen} onClose={onClose} fullWidth>
          <Grid container>
            <Grid item xs={8}>
              <DialogTitle>Delete your review</DialogTitle>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', float: 'right', margin: 1 }}>
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <DialogContent>
            <p>Are you sure you want to delete your review?</p>
            <p>This action is not reversible</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
