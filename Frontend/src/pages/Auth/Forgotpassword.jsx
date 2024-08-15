import React, { useState } from "react";
import "../../styles/AuthStyles.css";
import "../../styles/Forgot.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // handel submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      newPassword,
      answer,
    };

    if (rollNo) {
      data.rollNo = rollNo;
    } else if (email) {
      data.email = email;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/api/fee/portal/forgot-password",
        data
      );
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 5000 });
        navigate("/");
      } else {
        toast.error(res.data.message, { duration: 5000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", { duration: 5000 });
    }
  };

  return (
    <div
      className="contact-form"
      style={{
        margin: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="title">Forgot Password</h3>
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            name="password"
            className="input"
            id="password"
            autoComplete="off"
            placeholder="Enter Your New Password"
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            name="answer"
            className="input"
            id="answer"
            autoComplete="off"
            placeholder="What Is Your Favourite Game"
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ width: "228px", fontSize: "18px" }}
        >
          FORGOT PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
