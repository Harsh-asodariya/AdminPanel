import React from 'react';
import { NavLink } from 'react-router-dom';

const signIn = () =>{
    return(
        <ul className='right'>
            <li><NavLink to='/signin'>Login</NavLink></li>
            <li><NavLink to='/personalInformation'>Register</NavLink></li>
        </ul>
    )
}

export default signIn;