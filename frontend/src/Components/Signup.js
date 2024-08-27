import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

const Signup = (props) => {
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credential;
        if (password === cpassword) {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('userName', json.userName);
                props.showAlert("Account has been created", "success");
                navigate("/", { replace: true });
            } else {
                props.showAlert("Invalid Credential", "danger");
            }
        } else {
            props.showAlert("Passwords do not match", "danger");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="signup-container">
            <h4 className="signup-title my-4">Create a New Account</h4>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name*</label>
                    <input type="text" className="form-input" id="name" onChange={onChange} required name='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address*</label>
                    <input type="email" className="form-input" id="email" onChange={onChange} required name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="form-group password-group">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-input" 
                        id="password" 
                        onChange={onChange} 
                        minLength={6} 
                        required 
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
                <div className="form-group password-group">
                    <label htmlFor="cpassword" className="form-label">Confirm Password*</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-input" 
                        id="cpassword" 
                        onChange={onChange} 
                        minLength={6} 
                        required 
                        name='cpassword' 
                    />
                    <button 
                        type="button" 
                        className="password-toggle-btn" 
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
