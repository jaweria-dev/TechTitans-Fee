import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
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
                    <NavLink to='/dashboard/admin/students'>
                        <BsFillGrid3X3GapFill className='icon-icon' /> Students
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon-icon' /> Setting
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default AdminMenu;

