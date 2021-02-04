import React from 'react';
import { NavLink } from 'react-router-dom';

const signOut = (props) =>{
    return(
        <ul className='right'>
            <li><NavLink to='/' onClick={props.logout}>Log Out</NavLink></li>
            <li><NavLink to='/userdetail' >User Details</NavLink></li>
            <li><NavLink to='/usereducation' >User Education</NavLink></li>
            <li><NavLink to='/changePassword'>Change Password</NavLink></li>
        </ul>
    )
}

export default signOut;