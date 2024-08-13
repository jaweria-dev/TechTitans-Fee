import React, { useState, useEffect } from 'react';
import { BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaUsers } from "react-icons/fa";
import AdminMenu from './../../components/Layout/AdminMenu';
import AdminHeader from '../../components/Layout/AdminHeader';
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
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

                            <div className='card1'>
                                <div className='card-inner'>
                                    <h3 style={{ color: "white" }}>BATCH</h3>
                                    <BsFillGrid3X3GapFill className='card_icon' style={{ color: "white" }} />
                                </div>
                                <h1 style={{ color: "white" }}>12</h1>
                            </div>

                            <Link to="/dashboard/admin/create-teacher" style={{ textDecoration: "none" }}>
                                <div className='card1'>
                                    <div className='card-inner'>
                                        <h3 style={{ color: "white" }}>TEACHERS</h3>
                                        <BsPeopleFill className='card_icon' style={{ color: "white" }} />
                                    </div>
                                    <h1 style={{ color: "white" }}>10+</h1>
                                </div>
                            </Link>
                            {/* <div className='card'>
                            <div className='card-inner'>
                                <h3>ALERTS</h3>
                                <BsFillBellFill className='card_icon' />
                                </div>
                            <h1>42</h1>
                        </div> */}
                        </div>
                        <div className='charts'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#4b7bec" />
                                    <Bar dataKey="uv" fill="#8ac642" />
                                </BarChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="pv" stroke="#4b7bec" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#8ac642" />
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


