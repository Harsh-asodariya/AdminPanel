import React, { Component } from 'react';

class Detail extends Component {
    render() {
        let active_user = sessionStorage.getItem('activeuser')
        let firstname = '';
        let lastname = '';

        let stored_info = JSON.parse(localStorage.getItem('userInformation'))
        for (let u = 0; u < stored_info.length; u++) {
            if (active_user === stored_info[u].personalInformation['email']) {
                firstname = stored_info[u].personalInformation['firstname']
                lastname = stored_info[u].personalInformation['lastname']
                break;
            }
            
        }
        

        return (
            <div className='container' style={{
                textAlign: 'center',
                verticleAlign: 'middle', margin: '100px', fontWeight: 'bold', fontSize: '50px'
            }}>
                <span>{firstname} {lastname}</span>
            </div>)
    }
}

export default Detail;