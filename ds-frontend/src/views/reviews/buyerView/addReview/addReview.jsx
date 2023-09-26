import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import FormControl, { useFormControl } from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { createProductReview, createSellerReview } from '../../../../services/reviewService'
export default function AddReviewCard(reviewCategory) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(-1)
  const [comment, setComment] = useState('')
  const [reviewType, setReviewType] = useState('product')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRatingChange = (event, value) => {
    setRating(value)
  }

  const handleHoverChange = (event, value) => {
    setHover(value)
  }

  const handleReviewTypeChange = (event) => {
    setReviewType(event.target.value)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSave = () => {
    const review = reviewCategory.reviewCategory
    review.rating = rating
    review.comment = comment
    if (reviewType === 'product') {
      const { seller, ...productReview } = review
      createProductReview(productReview)
        .then((res) => {
          console.log('Product review added: ', res)
        })
        .catch((err) => {
          console.log('Error in creating product reveiw: ', err)
        })
    } else {
      const { product, ...sellerReview } = review

      createSellerReview(sellerReview)
        .then((res) => {
          console.log('Seller review added: ', res)
        })
        .catch((err) => {
          console.log('Error in adding seller review: ', err)
        })
    }
    setRating(0)
    setComment('')
    setHover(-1)
    handleClose()
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
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: 2, float: 'right' }}>
        <AddIcon />
        Add a Review
      </Button>
      <div>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Grid container>
            <Grid item xs={8}>
              <DialogTitle>Add a Review</DialogTitle>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: 'flex', float: 'right', margin: 1 }}>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <DialogContent>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      What do you want to reveiw?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={reviewType}
                      onChange={handleReviewTypeChange}
                      name="radio-buttons-group"
                      sx={{ marginLeft: 2 }}
                    >
                      <FormControlLabel
                        value="product"
                        control={<Radio />}
                        label="I want to review this product"
                      />
                      <FormControlLabel
                        value="seller"
                        control={<Radio />}
                        label="I want to review the seller of this product"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Rate the {reviewType}</FormLabel>
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}
