import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsPeopleFill } from 'react-icons/bs';
import { FaUsers } from "react-icons/fa";
import { PiUserSoundFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import "../../pages/Admin/Admin.css"

function AdminMenu({ openMenuToggle, OpenMenu }) {
    return (
        <aside id="sidebar" className={openMenuToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand menu' >
                    <BsCart3 className='icon_header' /> Fee Portal
                </div>
                <span className='icon close_icon' onClick={OpenMenu}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/admin" className="menu">
                        <BsGrid1X2Fill className='icon-icon' /> Overview
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/admin/create-teacher" className="menu">
                        <BsPeopleFill className='icon-icon' /> Teachers
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/admin/create-student' className="menu">
                        <PiUserSoundFill className='icon-icon' /> Add Student
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/admin/students' className="menu">
                       <PiUserSoundFill className='icon-icon' /> Students List
                    </NavLink>
                </li>

                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/admin/all-students" className="menu">
                    <FaUsers className='icon-icon' /> Students Data
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default AdminMenu;

