import React, { useState } from 'react'
import "../../styles/AuthStyles.css";
import "../../styles/Forgot.css"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
  const [rollNo, setRollNo] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")

  const navigate = useNavigate()

  // handel submit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:9010/api/fee/portal/forgot-password', { rollNo, newPassword, answer, })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, { duration: 5000 })

        navigate('/login')
      } else {
        toast.error(res.data.message, { duration: 5000 })
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong', { duration: 5000 })
    }
  }

  return (
    <div className="contact-form" style={{margin:"70px"}}>
      <form onSubmit={handleSubmit}>
        <h3 className="title">Forgot Password</h3>
        <div className="input-container">
          <input
            type="number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            name="rollno"
            className="input"
            autoComplete="off"
            placeholder="Enter Your Roll No"
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

        <button type="submit" className="btn" style={{width:"270px", fontSize:"18px"}}>
          FORGOT PASSWORD
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword
