import { useState, useEffect } from "react"
import db from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

const Reviews = ({ foodId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(()=> {
    const fetchReviews = async() => {
        const q = query(collection(db, "reviews"), where("foodId", "==", foodId))
        const querySnapshot = await getDocs(q)
        const submitedReviews = querySnapshot.docs.map(doc => doc.data())
        setReviews(submitedReviews)
    }
    fetchReviews()
  }, [foodId])

  const handleClick = () => {
    console.log(reviews[0].review.foodId)
    console.log(foodId)
  }
  return (
    <div className='reviews'>
        <button onClick={handleClick}>See the reviews of {foodId}</button>
        {reviews.length > 0 ? (
            reviews.map((review, index) => {
                <p key={index}>
                    {review.foodId}
                </p>
            })
        ): (
            <p>No reviews for this food.</p>
        )}
    </div>
  )
}

export default Reviews