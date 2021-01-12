import React from 'react';
import { NavLink } from 'react-router-dom';

const signOut = (props) =>{
    return(
        <ul className='right'>
            <li><NavLink to='/' onClick={props.logout}>Log Out</NavLink></li>
        </ul>
    )
}

export default signOut;