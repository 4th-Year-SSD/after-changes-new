import { useEffect, useState } from 'react'
import ReviewCard from './reviewCard'
import { getReviews } from '../../services/reviewService'

export default function Reviews({ reviewCategory }) {
  console.log('review category: ', reviewCategory)
  const [reviewList, setReviewList] = useState([])

  useEffect(() => {
    getReviews(reviewCategory)
      .then((reviews) => {
        console.log('reviews from get reveiws', reviews)
        setReviewList(reviews)
      })
      .catch((error) => console.error(error))
  }, [reviewCategory])

  return (
    <>
      <div>
        {reviewList.data?.map((review) => (
          <ReviewCard key={review.id} reviewDetails={review} />
        ))}
      </div>
    </>
  )
}
