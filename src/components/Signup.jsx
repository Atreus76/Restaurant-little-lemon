import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async(e) => {
        e.preventDefault()

        try {
            await(createUserWithEmailAndPassword(auth, email, password))
            alert("User Registered Successfully")
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className="signup">
        <form onSubmit={handleSignup}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}

export default Signup