import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './signin';
import SignOut from './signout';

class Navbar extends Component {

    render() {
        
        let page
        let logo
        if(this.props.login === true){
            page = <SignOut logout={this.props.logout}/>
            logo = <Link to='/loggedin' className='brand-logo'>Admin Panel</Link>
        }
        else{
            page = <SignIn/>
            logo = <Link to='/' className='brand-logo'>Admin Panel</Link>
        }
        return (
            <nav className='nav-wrapper grey darken-3'>
                <div className='container'>
                    {logo}
                    {page}
                </div>
            </nav>
        )
    }
}

export default Navbar;