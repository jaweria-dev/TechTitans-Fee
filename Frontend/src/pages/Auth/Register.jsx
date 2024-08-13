import React, {useState} from 'react'
import "../../styles/AuthStyles.css";
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [Trainer, setTrainer] = useState("")
    const [batchNo, setBatchNo] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [answer, setAnswer] = useState("")
    
    const navigate = useNavigate()


    // form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !phone || !Trainer || !batchNo || !rollNo || !answer) {  
            toast.error('Please fill in all fields', { duration: 5000 });  
            return;  
        }

        try {
            const res = await axios.post('http://localhost:9000/api/fee/portal/register', { name, email, password, phone, Trainer, batchNo, rollNo, answer });
            if (res.data.success) {
                toast.success(res.data.message, { duration: 5000 });
                navigate('/');
            } else {
                toast.error(res.data.message, { duration: 5000 });
            }
        } catch (error) {
            console.error(error.response || error.message);  
            toast.error('Something Went Wrong', { duration: 5000 });
        }
    };
    return (
        <div className="container">
            <div className="form">
                <div className="contact-info">
                    <h3 className="title">HELLO 👋</h3>
                    <h3 className="title">SMIT</h3>
                    <h3 className="title">STUDENT</h3>

                    <br />
                    <p className="text">
                        Please register
                        <br />
                        to start managing your
                        <br />
                        fees efficiently....
                    </p>
                </div>

                <div className="contact-form">
                    <form action="#" id="form" onSubmit={handleSubmit}>
                        <h3 className="title">Reg
                            ister</h3>
                        <p className="text-para">Already have an account please<span><Link to='/' style={{ color: "#8AC642", textDecoration: "none" }}> Login...</Link></span></p>
                        <div className="input-container">
                            <label htmlFor=""></label>
                            <input type="text"
                                value={name} onChange={(e) => setName(e.target.value)}
                                name="name" className="input" id="fullname" autoComplete="off" placeholder="Enter Your Full Name"  required/>
                        </div>
                        <div className="input-container">
                            <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} name="email" className="input" id="email" autoComplete="off" placeholder="Enter Your Email Address" required/>
                        </div>
                        <div className="input-container">
                            <input type="number" value={phone}
                                onChange={(e) => setPhone(e.target.value)} name="phone" className="input" id="phonenum" autoComplete="off" placeholder="Enter Your Phone Number" required/>
                        </div>
                        <div className="input-container">
                            <input type="password"   value={password}
                            onChange={(e) => setPassword(e.target.value)} name="password" className="input" id="password" autoComplete="off" placeholder="Enter Your Password" required/>
                        </div>
                        <div className="input-container">
                            <input type="text"   value={Trainer}
                            onChange={(e) => setTrainer(e.target.value)} name="trainer" className="input" id="trainer" autoComplete="off" placeholder="Enter Your Trainer" required/>
                        </div>
                        <div className="input-container">
                            <input type="number"  value={batchNo}
                            onChange={(e) => setBatchNo(e.target.value)}name="batch" className="input" id="batch" autoComplete="off" placeholder="Enter Your Batch No" required/>
                        </div>
                        <div className="input-container">
                            <input type="number"  value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}name="rollno" className="input" id="rollno" autoComplete="off" placeholder="Enter Your Roll No" required/>
                        </div>
                        <div className="input-container">
                            <input type="text" value={answer}
                            onChange={(e) => setAnswer(e.target.value)}name="text" className="input" id="answer" autoComplete="off" placeholder="What Is Your Favourite Game" required/>
                        </div>

                        <button type="submit" className="btn">
                        REGISTER
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;