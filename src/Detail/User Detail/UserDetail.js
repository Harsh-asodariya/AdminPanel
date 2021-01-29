import React, { Component } from 'react';

class UserDetail extends Component{
    render(){
        let stored_users = JSON.parse(localStorage.getItem('userInformation'))
        let user_detail = []
        for (let u = 0; u < stored_users.length; u++) {
            let temp={}
            temp['firstname'] = stored_users[u].personalInformation.firstname;
            temp['lastname'] = stored_users[u].personalInformation.lastname;
            temp['gender'] = stored_users[u].personalInformation.gender;
            temp['email'] = stored_users[u].personalInformation.email;
            temp['phone'] = stored_users[u].personalInformation.phone;
            user_detail.push(temp)
        }
        
        let show_Detail = user_detail.map(user=>{
            return <tr key={user.email}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.phone}</td>
          </tr>
        })
        


        return(<div className='container' style={{marginTop:'50px',padding:'20px',backgroundColor:'white'}}>
            <table className='striped responsive-table'>
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone</th>
          </tr>
        </thead>

        <tbody>
        {show_Detail}
        </tbody>
      </table>
        </div>)
    }
}

export default UserDetail;