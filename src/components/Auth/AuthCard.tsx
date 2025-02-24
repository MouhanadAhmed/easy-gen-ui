import React, { useRef } from 'react'
import './Auth.css'
import RegisterCard from './Register/RegisterCard';
import LoginCard from './Login/LoginCard';
export default function AuthCard() {
 const containerRef = useRef<HTMLDivElement>(null);


function toggleContainer():void {
    containerRef?.current?.classList.toggle('active')
}

  return (

    <div ref={containerRef} className="container">

            <LoginCard/>
            <RegisterCard/>

    <div className="toggle-box">
        <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={toggleContainer}>Register</button>
        </div>

        <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn"  onClick={toggleContainer}>Login</button>
        </div>
    </div>
</div>

  )
}
