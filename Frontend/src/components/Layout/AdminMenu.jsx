import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsPeopleFill } from 'react-icons/bs';
import { FaUsers } from "react-icons/fa";
import { PiUserSoundFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';

function AdminMenu({ openMenuToggle, OpenMenu }) {
    return (
        <aside id="sidebar" className={openMenuToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> Fee Portal
                </div>
                <span className='icon close_icon' onClick={OpenMenu}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/admin">
                        <BsGrid1X2Fill className='icon-icon' /> Overview
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/admin/create-teacher">
                        <BsPeopleFill className='icon-icon' /> Teachers
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/admin/create-student'>
                        <PiUserSoundFill className='icon-icon' /> Student
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/admin/students'>
                       <PiUserSoundFill className='icon-icon' /> Student
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/admin/create-student'>
                    <FaUsers className='icon-icon' /> Add Students
                        {/* <BsFillGrid3X3GapFill className='icon-icon' /> Add Students */}
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default AdminMenu;

