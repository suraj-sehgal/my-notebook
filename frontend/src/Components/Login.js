import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            localStorage.setItem('userName', json.userName);
            props.showAlert("You are logged in", "success");
            navigate("/", { replace: true });
        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-container">
            <h4 className="login-title my-4">Login to Your Account</h4>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-input" 
                        id="email" 
                        name='email'
                        onChange={onChange} 
                        value={credential.email} 
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-group password-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-input" 
                        id="password" 
                        onChange={onChange} 
                        value={credential.password} 
                        name='password'
                    />
                    <button 
                        type="button" 
                        className="password-toggle-btn" 
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
