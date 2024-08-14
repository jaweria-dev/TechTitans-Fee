import React, { useState, useEffect } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaUsers } from "react-icons/fa";
import AdminMenu from './../../components/Layout/AdminMenu';
import AdminHeader from '../../components/Layout/AdminHeader';
import Layout from '../../components/Layout/Layout';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    // Sample data for the chart, can be replaced with dynamic data from API
    const data = [
        { name: 'January', students: 300 },
        { name: 'February', students: 280 },
        { name: 'March', students: 350 },
        { name: 'April', students: 400 },
        { name: 'May', students: 320 },
        { name: 'June', students: 370 },
        { name: 'July', students: 450 },
    ];

    const [openMenuToggle, setOpenMenuToggle] = useState(false);

    useEffect(() => {
        console.log('Sidebar toggle state:', openMenuToggle);
    }, [openMenuToggle]);

    const OpenMenu = () => {
        setOpenMenuToggle(!openMenuToggle);
    };

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
                    </div>

                    <div className='main-container col-md-9'>
                        <div className="col-md-3">
                            <AdminHeader OpenMenu={OpenMenu} />
                            <h1 className="m-3" style={{ color: "#8ac642" }}>Dashboard</h1>
                        </div>
                        <div className='main-cards'>
                            <Link to="/dashboard/admin/students" style={{ textDecoration: "none" }}>
                                <div className='card1'>
                                    <div className='card-inner'>
                                        <h3 style={{ color: "white" }}>STUDENTS</h3>
                                        <FaUsers className='card_icon' style={{ color: "white" }} />
                                    </div>
                                    <h1 style={{ color: "white" }}>300+</h1>
                                </div>
                            </Link>



                            <Link to="/dashboard/admin/create-teacher" style={{ textDecoration: "none" }}>
                                <div className='card1'>
                                    <div className='card-inner'>
                                        <h3 style={{ color: "white" }}>TEACHERS</h3>
                                        <BsPeopleFill className='card_icon' style={{ color: "white" }} />
                                    </div>
                                    <h1 style={{ color: "white" }}>10+</h1>
                                </div>
                            </Link>

                            <div className='card1'>
                                <div className='card-inner'>
                                    <h3 style={{ color: "white" }}>BATCH</h3>
                                    <BsFillGrid3X3GapFill className='card_icon' style={{ color: "white" }} />
                                </div>
                                <h1 style={{ color: "white" }}>12</h1>
                            </div>

                        </div>
                        <div className='charts'>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="students" fill="#4b7bec" />
                                </BarChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="students" stroke="#8ac642" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
