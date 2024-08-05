import React, { useState } from 'react';
import "../../styles/AuthStyles.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/Context';

const Register = () => {
    const [rollNo, setRollNo] = useState(""); 
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post('http://localhost:9000/api/fee/portal/login', { rollNo, password })
          if (res.data.success) {
            toast.success(res.data && res.data.message, { duration: 5000 })
            // console.log(res,"check login data .");
             
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            })
            localStorage.setItem('auth', JSON.stringify(res.data))
            navigate(location.state || '/')
          } else {
            toast.error(res.data.message, { duration: 5000 })
          }
        } catch (error) {
          console.log(error)
          toast.error('Something Went Wrong', { duration: 5000 })
        }
      }

    return (
        <div className="container">
            <div className="form">
                <div className="contact-form">
                    <span className="circle one" />
                    <span className="circle two" />
                    <form onSubmit={handleSubmit}>
                        <h3 className="title">Login</h3>
                        <p className="text-para">
                            Don't have an account?
                            <span>
                                <Link to='/register' style={{ color: "#8AC642", textDecoration: "none" }}> Register...</Link>
                            </span>
                        </p>
                        <div className="input-container">
                            <input
                                type="number"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                name="rollno"
                                className="input"
                                id="rollNo" // Changed id to rollNo
                                autoComplete="off"
                                placeholder="Enter Your Roll No"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="input"
                                id="password"
                                autoComplete="off"
                                placeholder="Enter Your Password"
                                required
                            />
                        </div>

                        <div className="forgotpassword">
                        <Link to='/forgotpassword' style={{ color: "#8AC642", textDecoration: "none", position:"relative", left:"200px"}}> Forgot Password?</Link>
                        </div>
                        

                        <button type="submit" className="btn" style={{marginTop:20}}>
                            LOGIN
                        </button>
                    </form>
                </div>
                <div className="contact-info">
                    <h3 className="title">WELCOME</h3>
                    <h3 className="title">BACK 👋</h3>
                    <h3 className="title">SMIT</h3>
                    <br />
                    <p className="text">
                        login to continue
                        <br />
                        managing your
                        <br />
                        student fees....
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
