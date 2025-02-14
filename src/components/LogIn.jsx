import "./LogIn.css"
import { useRef, useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from "firebase/auth"
import { useNavigate } from "react-router-dom"
const LogIn = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [logIn, setLogIn] = useState(true)
  const navigate = useNavigate()

  const register = async(e) => {
    try {
      e.preventDefault()

      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
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
      alert(error.message)
    }
  }

  return (
    <div className="login">
      <form action="">
        <h1>Sign In</h1>
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