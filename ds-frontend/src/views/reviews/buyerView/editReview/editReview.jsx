import * as React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import { FormLabel } from '@mui/material'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { updateProductReview, updateSellerReview } from '../../../../services/reviewService'
import { getReviewById } from '../../../../services/reviewService'

export default function EditReviewCard({reviewDetails, isOpen, onClose}) {
  const [rating, setRating] = useState(reviewDetails.rating)
  const [hover, setHover] = useState(-1)
  const [comment, setComment] = useState(reviewDetails.comment)
  const reviewType = reviewDetails.product ? 'product' : 'seller'

  const handleRatingChange = (event, value) => {
    setRating(value)
  }

  const handleHoverChange = (event, value) => {
    setHover(value)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleUpdate = () => {
    const {user, ...review} = reviewDetails
    review.user = reviewDetails.user._id
    review.rating = rating
    review.comment = comment

    if (reviewType === 'product') {
      updateProductReview(review.user, review)
    } else {
      updateSellerReview(review.user, review)
    }
    setRating(0)
    setComment('')
    setHover(-1)
    onClose()
  }

  const ratingLabels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }

  function getLabelText(value) {
    return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingLabels[rating]}`
  }

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: 2, float: 'right' }}>
        <AddIcon />
        Edit Review
      </Button> */}
      <div>
        <Dialog open={isOpen} onClose={onClose} fullWidth>
          <Grid container>
            <Grid item xs={8}>
              <DialogTitle>Edit your Review</DialogTitle>
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
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Rate your {reviewType}</FormLabel>
                    <Box
                      sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={1}
                        getLabelText={getLabelText}
                        onChange={handleRatingChange}
                        onChangeActive={handleHoverChange}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        sx={{ marginBottom: 2 }}
                        required
                      />
                      {rating !== null && (
                        <Box sx={{ ml: 2, marginBottom: 2 }}>
                          {ratingLabels[hover !== -1 ? hover : rating]}
                        </Box>
                      )}
                    </Box>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item xs={12}>
                  <FormControl margin="none">
                    <FormLabel component="legend">
                      What did you think about this {reviewType}?
                    </FormLabel>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: '100%',
                      }}
                    >
                      <TextField
                        multiline
                        rows={4}
                        value={comment}
                        onChange={handleCommentChange}
                        fullWidth
                        required
                      />
                    </Box>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
