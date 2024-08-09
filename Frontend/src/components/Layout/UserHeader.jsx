import React, { useState } from 'react';
import { BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function UserHeader({ OpenMenu }) {

    return (
        <header className='header'>
            <div className='menu-icon'>
                <BsJustify className='icon' onClick={OpenMenu} />
            </div>
            {/* <div className='header-left'>
                <BsSearch className='icon' />
            </div>
            <div className='header-right'>
                <BsPersonCircle className='icon'
                />
            </div> */}
        </header>
    );
}

export default UserHeader;
