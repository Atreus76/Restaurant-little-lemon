import { addDoc, collection } from "firebase/firestore";
import db from "./firebase";
import { useEffect } from "react";


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
  
useEffect(()=>{
    const addMenuToFirestore = async() => {
        try {
          const menuCollection = collection(db, "menu")
          for (let item of menuItems) {
            await addDoc(menuCollection, item)
          }
        } catch (error) {
          console.log("Error", error)
        }
      }
      
      addMenuToFirestore()
      console.log("Success")
}, [])