import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FlagIcon from '@mui/icons-material/Flag'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditReviewCard from '../../views/reviews/buyerView/editReview/editReview'
import DeleteReviewCard from '../../views/reviews/buyerView/deleteReview/deleteReview'

export default function ReviewCard(reviewDetails) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleFlagInappropriate = () => {
    //TODO: Flag as inappropriate
    handleMenuClose()
  }
  const handleEdit = () => {
    handleMenuClose()
    setOpenEditDialog(true)
  }
  const handleDelete = () => {
    handleMenuClose()
    setOpenDeleteDialog(true)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <>
    <EditReviewCard isOpen={openEditDialog} onClose={() => setOpenEditDialog(false)} reviewDetails={reviewDetails.reviewDetails} />
    <DeleteReviewCard isOpen={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} reviewDetails={reviewDetails.reviewDetails} />
      <Card
        sx={{
          minWidth: 275,
          margin: '1rem',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Avatar alt="Remy Sharp" src="" />
              </Grid>
              <Grid item xs={10}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {reviewDetails.reviewDetails.user.name?.first_name +
                    ' ' +
                    reviewDetails.reviewDetails.user.name?.last_name}
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                  {formatDate(reviewDetails.reviewDetails.updatedAt)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-controls="card-menu"
                  aria-haspopup
                  onClick={handleMenuOpen}
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="card-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {reviewDetails.reviewDetails.user.buyer === localStorage.getItem('id') ? (
                    <div>
                      <MenuItem onClick={handleEdit}>
                        <EditIcon sx={{ mr: 1 }} />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <DeleteIcon sx={{ mr: 1 }} />
                        Delete
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem onClick={handleFlagInappropriate}>
                      <FlagIcon sx={{ mr: 1 }} />
                      Flag as inappropriate
                    </MenuItem>
                  )}
                </Menu>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Rating name="read-only" value={reviewDetails.reviewDetails.rating} readOnly />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Lorem ipsum dolor sit amet
              </Typography>
            </Grid>
          </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.primary" gutterBottom>
                  {reviewDetails.reviewDetails.comment}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
