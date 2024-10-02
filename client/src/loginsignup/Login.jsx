import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const loginHandle = async () => {
        setError(""); 
        try {
            const res = await axios.post("https://task-management-5ms8.onrender.com/api/auth/login", {
                email,
                password,
            });

            const logindata = res.data;


            alert("Login Successful");
            localStorage.setItem('token', logindata.token); 
            navigate("/"); 
        } catch (err) {
            setError("An error occurred. Please try again.");
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}

                <div>
                    <input
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name='email'
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <input
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button className="login-button" onClick={loginHandle}>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className="signup-link">Don't have an account? <Link to='/signup'>Signup</Link></h2>
                </div>
                <div className='last'>
                    <p>Email: sagarrajyadav2002@gmail.com</p>
                    <p>Password: 123456</p>
                </div>
            </div>

        </div>
    )
}

export default Login;
