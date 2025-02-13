import  { useState } from 'react'
import "./BookingModal.css"
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';
import db from '../firebase';
const BookingModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();

        try {
          const docRef = await addDoc(collection(db, "reservations"),formData)
          alert("Reservation Confirmed!");
          console.log("Reservation Details:", docRef);
          onClose(); // Close modal after submission
        } catch (error) {
          console.log(error)
        }
      };

      const getReservation = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "reservations"))
          const reservations = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          console.log('All Reservations', reservations)
          return reservations
        } catch (error) {
          console.log("Error: ", error)
        }
      };

      // document.getElementById("reservationDate").addEventListener("change", ()=>{
      //   const selectedDate = new Date(this.value)
      //   const year = selectedDate.getFullYear();
      
      //   if (year < 2024 || year > 2030) {
      //       alert("Please select a year between 2024 and 2030.");
      //       this.value = ""; // Clear invalid input
      //   }
      // })

    
      return (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reserve a Table</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
              <input type="date" name="date" 
              min="2024-01-01" max="2030-12-31"
              id='reservationDate' required onChange={handleChange} />
              <input type="time" name="time" required onChange={handleChange} />
              <input type="number" name="guests" min="1" placeholder='Seats' required onChange={handleChange} />
              <button type="submit">Reserve</button>
              <button type="button" onClick={onClose}>Close</button>
              <button type="button" onClick={getReservation}>Get Info</button>
            </form>
          </div>
        </div>
      );
}

export default BookingModal