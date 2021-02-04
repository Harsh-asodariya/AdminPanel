import React , {Component} from 'react';

class UserEducation extends Component{
    state = {
        flag : true
    }
    DeleteEventHandler = (user, education) => {
        let access = window.confirm('Are you sure');
        if(access){
            let tempdata = JSON.parse(localStorage.getItem('userInformation'));
            tempdata[user].educationalInformation.splice(education,1)
            localStorage.setItem('userInformation',JSON.stringify(tempdata))
            this.setState({flag :!this.state.flag})
        } 
    }

    EditEventHandler = (user, education) =>{
        this.props.history.push({
            pathname : '/educationForm',
            search : `user=${user}&education=${education}`})
    }

    render(){
        let stored_users_detail = JSON.parse(localStorage.getItem('userInformation'))
        let Education_Detail = []
        for (let u = 0; u < stored_users_detail.length; u++) {
            if(stored_users_detail[u].educationalInformation[0]){

            let temp=[]
            temp['firstname'] = stored_users_detail[u].personalInformation.firstname;
            temp['lastname'] = stored_users_detail[u].personalInformation.lastname;
            temp['school'] = stored_users_detail[u].educationalInformation[0].school;
            temp['course'] = stored_users_detail[u].educationalInformation[0].course;
            temp['percentage'] = stored_users_detail[u].educationalInformation[0].percentage;
            temp['startdate'] = stored_users_detail[u].educationalInformation[0].startDate;
            temp['enddate'] = stored_users_detail[u].educationalInformation[0].endDate;
            temp['user'] = u;
            temp['education'] = 0;
            Education_Detail.push(temp)
            }
            for(let v=1; v < stored_users_detail[u].educationalInformation.length; v++){
                let temp = []
                temp['firstname'] = '';
                temp['lastname'] = '';
                temp['school'] = stored_users_detail[u].educationalInformation[v].school;
                temp['course'] = stored_users_detail[u].educationalInformation[v].course;
                temp['percentage'] = stored_users_detail[u].educationalInformation[v].percentage;
                temp['startdate'] = stored_users_detail[u].educationalInformation[v].startDate;
                temp['enddate'] = stored_users_detail[u].educationalInformation[v].endDate;
                temp['user'] = u;
                temp['education'] = v;
                Education_Detail.push(temp)
            } 
        }
        let show_Detail = Education_Detail.map((user,index)=>{
            return <tr key={index}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.school}</td>
            <td>{user.course}</td>
            <td>{user.percentage}</td>
            <td>{user.startdate}</td>
            <td>{user.enddate}</td>
            <td><button onClick={() =>{this.EditEventHandler(user.user, user.education)}}>Edit</button></td>
            <td><button onClick={() => {this.DeleteEventHandler(user.user, user.education)}}>detete</button></td>
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
                    <th></th>
                    <th></th>
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