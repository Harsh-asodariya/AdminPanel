import React, { Component } from 'react';

class Detail extends Component{
    render(){
        let personalInformation = JSON.parse(localStorage.getItem('PersonalInformation'))
        let firstname = personalInformation['firstname']
        let lastname = personalInformation['lastname']
        
        return(
        <div className='container' style={{textAlign: 'center',
            verticleAlign: 'middle', margin:'100px', fontWeight:'bold', fontSize:'50px'}}>
            <span>{firstname} {lastname}</span>
        </div>)
    }
}

export default Detail;