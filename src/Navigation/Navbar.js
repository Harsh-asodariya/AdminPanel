import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignIn from './signin';
import SignOut from './signout';

class Navbar extends Component {

    render() {
        
        let page
        if(this.props.login === true){
            page = <SignOut logout={this.props.logout}/>
        }
        else{
            page = <SignIn/>
        }
        return (
            <nav className='nav-wrapper grey darken-3'>
                <div className='container'>
                    <Link to='/' className='brand-logo'>Admin Panel</Link>
                    {page}
                </div>
            </nav>
        )
    }
}

export default Navbar;