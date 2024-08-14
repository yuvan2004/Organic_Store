import React from 'react'

const Signup = () => {
  return (
    <div className="background-container">
            <div className="signup-container">
                <h1>Signup</h1>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="usermail">Email</label>
                    <input type="email" id="usermail" name="usermail" required />

                    {/* <label htmlFor="dob">Date of Birth</label>
                    <input type="text" id="dob" name="dob" required /> */}

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />

                    {/* <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" required /> */}

                    <button type="button" onClick={()=>Signupbtnclick()}>Sign Up</button>
                   <div className="alredy">
                    <label>Already have a Account?</label><a href="/login" className="top">Login</a></div>
                    
                </form>
                </div>
                </div>
  )
}

export default Signup