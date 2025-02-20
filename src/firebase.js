// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsUHvvaCrLNDtYfVnu5Aw--dsGSqLUnCY",
  authDomain: "little-lemon-43df2.firebaseapp.com",
  projectId: "little-lemon-43df2",
  storageBucket: "little-lemon-43df2.firebasestorage.app",
  messagingSenderId: "688955553052",
  appId: "1:688955553052:web:b1c85ef743abf55845f6d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)


export { auth }
export default db