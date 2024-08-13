import React, { useState, useEffect } from "react";
import "../../styles/AuthStyles.css";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/Context";

const Register = () => {
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (setAuth) {
      // Show loader before redirecting
      const redirectToDashboard = () => {
        if (setAuth.role === "admin") {
          navigate("/dashboard/admin");
        } else if (setAuth.role === "user") {
          navigate("/dashboard/user");
        }
      };
      setTimeout(() => {
        redirectToDashboard();
      }, 1000); // Adjust delay as needed (1000ms = 1 second)
    }
  }, [setAuth, navigate]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    if (rollNo) {
      data.rollNo = rollNo;
    } else if (email) {
      data.email = email;
    }

    data.password = password;

    try {
      const res = await axios.post(
        "http://localhost:9000/api/fee/portal/login",
        data
      );
      if (res.data.success) {
        toast.success(res.data.message, { duration: 5000 });

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // Redirect based on user role
        const userRole = res.data.user.role;
        if (userRole === 1) {
          navigate("/dashboard/admin");
        } else if (userRole === 0) {
          navigate("/dashboard/user");
        } else {
          navigate("/home-page"); // Fallback to home page if role is undefined
        }
      } else {
        toast.error(res.data.message, { duration: 5000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { duration: 5000 });
    }
  };
  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="form">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <h3 className="title">Login</h3>
            <p className="text-para">
              Don't have an account?
              <span>
                <Link
                  to="/register"
                  style={{ color: "#8AC642", textDecoration: "none" }}
                >
                  {" "}
                  Register...
                </Link>
              </span>
            </p>

            <div className="input-container">
              <input
                type="text"
                value={rollNo || email}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isNaN(value)) {
                    setEmail(value);
                    setRollNo("");
                  } else {
                    setRollNo(value);
                    setEmail("");
                  }
                }}
                name="identifier"
                className="input"
                autoComplete="off"
                placeholder="Enter Your Roll No or Email"
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
              <Link
                to="/forgotpassword"
                style={{
                  color: "#8AC642",
                  textDecoration: "none",
                  position: "relative",
                  left: "200px",
                }}
              >
                {" "}
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn" style={{ marginTop: 20 }}>
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
