import React , {Component} from 'react';

class UserEducation extends Component{
    render(){
        let stored_users_detail = JSON.parse(localStorage.getItem('userInformation'))
        let Education_Detail = []
        for (let u = 0; u < stored_users_detail.length; u++) {
            let temp=[]
            temp['firstname'] = stored_users_detail[u].personalInformation.firstname;
            temp['lastname'] = stored_users_detail[u].personalInformation.lastname;
            temp['school'] = stored_users_detail[u].educationalInformation[0].school;
            temp['course'] = stored_users_detail[u].educationalInformation[0].course;
            temp['percentage'] = stored_users_detail[u].educationalInformation[0].percentage;
            temp['startdate'] = stored_users_detail[u].educationalInformation[0].startDate;
            temp['enddate'] = stored_users_detail[u].educationalInformation[0].endDate;
            Education_Detail.push(temp)
            for(let v=1; v < stored_users_detail[u].educationalInformation.length; v++){
                let temp = []
                temp['firstname'] = '';
                temp['lastname'] = '';
                temp['school'] = stored_users_detail[u].educationalInformation[v].school;
                temp['course'] = stored_users_detail[u].educationalInformation[v].course;
                temp['percentage'] = stored_users_detail[u].educationalInformation[v].percentage;
                temp['startdate'] = stored_users_detail[u].educationalInformation[v].startDate;
                temp['enddate'] = stored_users_detail[u].educationalInformation[v].endDate;
                Education_Detail.push(temp)
            } 
        }
        let show_Detail = Education_Detail.map(user=>{
            return <tr key={user.email}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.school}</td>
            <td>{user.course}</td>
            <td>{user.percentage}</td>
            <td>{user.startdate}</td>
            <td>{user.enddate}</td>
          </tr>
        })

        return(
        <div className='container' style={{marginTop:'50px',padding:'20px',backgroundColor:'white'}}>
            <table className='striped responsive-table'>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>School/Institute</th>
                    <th>Stream</th>
                    <th>Percentage/CGPA</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>

                <tbody>
                    {show_Detail}
                </tbody>
            </table>
        </div>)
    }
}

export default UserEducation;