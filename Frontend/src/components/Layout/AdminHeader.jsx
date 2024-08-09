import React, { useState } from 'react';
import { BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function AdminHeader({ OpenMenu }) {

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenMenu} />
            </div>
        </header>
    );
}

export default AdminHeader;
