import { useState, useEffect, useRef } from "react";
import "./Menu.css"
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import db, { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Reviews from "./Reviews";
const Menu = () => {
  const menuItems = [
    { name: "Bruschetta", description: "Toasted bread with tomatoes, basil, and olive oil.", price: "$5.99","rating": 4.5,
      "isFeatured": true, category: "Appetizers" },
    { name: "Mozzarella Sticks", description: "Deep-fried mozzarella cheese with marinara sauce.", price: "$6.99","rating": 4.5,
      "isFeatured": true, category: "Appetizers" },
    { name: "Grilled Salmon", description: "Served with lemon butter sauce and roasted vegetables.", price: "$14.99","rating": 4.5,
      "isFeatured": true, category: "MainCourse" },
    { name: "Spaghetti Carbonara", description: "Pasta with creamy sauce, bacon, and parmesan cheese.", price: "$12.99","rating": 4.5,
      "isFeatured": true, category: "MainCourse" },
    { name: "Cheesecake", description: "Creamy cheesecake with a graham cracker crust.", price: "$4.99","rating": 4.5,
      "isFeatured": true, category: "Desserts" },
    { name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center.", price: "$5.99","rating": 4.5,
      "isFeatured": true, category: "Desserts" },
    { name: "Iced Lemon Tea", description: "Refreshing lemon-flavored iced tea.", price: "$2.99","rating": 4.5,
      "isFeatured": true, category: "Beverages" },
    { name: "Cappuccino", description: "Espresso topped with steamed milk and foam.", price: "$3.99","rating": 4.5,
      "isFeatured": true, category: "Beverages" }
  ];
  const [filteredMenu, setFilteredMenu] = useState(menuItems)
  const hasUploaded = useRef(false)
  const [category, setCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("default");
  const [user, setUser] = useState(null)
  const [review, setReview]= useState({})
  const [selectedItem, setSelectedItem] = useState("")
  
useEffect(()=>{
  const addMenuToFirestore = async() => {
    if (hasUploaded.current) return
    hasUploaded.current = true
    
    try {
      const menuCollection = collection(db, "menu")
      const snapShot = await getDocs(menuCollection)

      if (snapShot.empty){
        for (let item of menuItems){
          await addDoc(menuCollection, item)
        }
        console.log("Menu uploaded successfully")
      }else{
        console.log("Menu already exists in Firestore")
      }

    } catch (error) {
      console.log("Error", error)
    }
  }
  addMenuToFirestore()
}, [])
  
  
  
  useEffect(()=> {
    let updatedMenu = [...menuItems]

    if (category !== "All"){
      updatedMenu = updatedMenu.filter(item => item.category === category)
    }

    if (searchTerm) {
      updatedMenu = updatedMenu.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (sortOrder === "lowToHigh") {
      updatedMenu.sort((a, b) => parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")));
    } else if (sortOrder === "highToLow") {
      updatedMenu.sort((a, b) => parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", "")));
    }

    setFilteredMenu(updatedMenu)

  },[category, searchTerm, sortOrder])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const handleReviewSubmit = async(e, itemName) => {
    e.preventDefault()

    if (!user) {
      alert("You must be logged in to give review")
      return
    }

    if(!review[itemName] || review[itemName].trim() === ""){
      alert("Please write a review before submitting")
      return;
    }
    
    try {
      await addDoc(collection(db, "reviews"), {
        reviewsText: review[itemName],
        userId: auth.currentUser.uid,
        foodId: selectedItem,
        createdAt: new Date()
      })
      setReview((prevReviews) => ({
        ...prevReviews,
        [itemName]: "",
      }))
      alert("Review Submitted!")
    } catch (error) {
      alert(error.message)
    } 
  }

  const handleReviewChange = ((item, value) => {
    setReview((prevReviews) => ({
      ...prevReviews,
      [item]: value,
    }))
  })
  
  return (
    <div className="menu">
        <h1 className="menu-title">Our Menu</h1>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Appetizers">Appetizers</option>
          <option value="MainCourse">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        {filteredMenu.map((item, index)=>(
          <div key={index} className="menu-category">
          <h2>{item.category}</h2>
          <ul>
              <li className="menu-item">
                <h3>{item.name} - <span>{item.price}</span></h3>
                <p>{item.description}</p>
                <p>Add review</p>
                <form onSubmit={(e) => handleReviewSubmit(e, item.name)} onClick={() => setSelectedItem(item.name)}>
                  <textarea
                    value={review[item.name] || ""}
                    onChange={(e) => handleReviewChange(item.name, e.target.value)}
                    placeholder="Write your review"
                  ></textarea>
                  <button type="submit">Submit your review</button>
                </form>
                <Reviews foodId={item.name}/>
              </li>
          </ul>
        </div>
        ))}
    </div>
  )
}

export default Menu

