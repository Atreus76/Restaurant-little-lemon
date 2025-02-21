import "./LogIn.css"
import { useRef, useState } from "react"
import db, { auth } from "../firebase"
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
const LogIn = () => {
  const userNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [logIn, setLogIn] = useState(true)
  const navigate = useNavigate()

  const register = async(e) => {
    try {
      e.preventDefault()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        userName: userNameRef.current.value,
        email: user.email,
        createdAt: new Date()
      });
      alert("Registered Successful")
      
    } catch (error) {
      alert(error.message)
    }
    
  }

  const signIn = async(e) => {
    try {
      e.preventDefault()

      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      alert("Log in Successful")
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="login">
      <form action="">
        <h1>Sign In</h1>
        <input ref={userNameRef} type="text" placeholder="User Name"/>
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>Sign In</button>

        <h4>
          <span onClick={register}>Sign up now.</span>
        </h4>
      </form>
    </div>
  )
}

export default LogIn