import "./LogIn.css"
import { useRef, useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 } from "firebase/auth"
const LogIn = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [logIn, setLogIn] = useState(true)

  const register = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser)
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  const signIn = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser)
    })
    .catch((error) => {
      alert(error.message)
    })
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