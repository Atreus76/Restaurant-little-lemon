import { useState, useEffect } from "react"
import db from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

const Reviews = ({ foodId }) => {
  const [reviews, setReviews] = useState([])
  const [showReviews, setShowReviews] = useState(false)
  const fetchReviews = async() => {
    if (showReviews){
      setShowReviews(false)
      return
    }

    const q = query(collection(db, "reviews"), where("foodId", "==", foodId))
    const querySnapshot = await getDocs(q)
    const submitedReviews = querySnapshot.docs.map(doc => doc.data())
    setReviews(submitedReviews)
    setShowReviews(true)
}
  return (
    <div className='reviews'>
      <button
        onClick={fetchReviews}
      >
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>
        {showReviews && (
          <div>
            {reviews.length > 0 ? (
            reviews.map((review, index) => (
                <p key={index}>
                    {review.reviewsText}
                </p>
            ))
        ): (
            <p>No reviews for this food.</p>
        )}
          </div>
        )  }
    </div>
  )
}

export default Reviews