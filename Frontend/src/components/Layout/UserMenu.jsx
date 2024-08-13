import React from 'react';
import { BsCart3, BsGrid1X2Fill } from 'react-icons/bs';
import { FaCommentAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "../../pages/Admin/Admin.css"

function UserMenu({ openMenuToggle, OpenMenu }) {
    return (
        <aside id="sidebar" className={openMenuToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header'/> Fee Portal
                </div>
                <span className='icon close_icon' onClick={OpenMenu}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to="/dashboard/user" className="menu">
                        <BsGrid1X2Fill className='icon-icon' /> Overview
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to='/dashboard/user/courses' className="menu">
                        <FaCommentAlt className='icon-icon' /> Courses
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default UserMenu;