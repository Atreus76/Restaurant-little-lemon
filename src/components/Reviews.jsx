import { useState, useEffect } from "react"
import db from "../firebase"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"

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
    const reviewPromises = querySnapshot.docs.map(async (docSnap) => {
      const reviewData = docSnap.data()

      const userRef = doc(db, "users", reviewData.userId)
      const userSnap = await getDoc(userRef)

      return {
        ...reviewData,
        userName: userSnap.exists() ? userSnap.data().userName : "Unknown User",
      }
    })
    const reviewsWithUsers = await Promise.all(reviewPromises)
    setReviews(reviewsWithUsers)
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
                    <strong>{review.userName}</strong>{review.reviewsText}
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