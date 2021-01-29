import Navbar from './Navigation/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonalInformation from './Form/PersonalInformation';
import EducationalInformation from './Form/EducationalInformation';
import Login from './Auth/Login';
import { Component } from 'react';
import Detail from './Detail/Detail';
import UserDetail from './Detail/User Detail/UserDetail';
import UserEducation from './Detail/User Detail/UserEducation';

class App extends Component {
  state = {
    login : false
  }

  loginHandler = () =>{
    this.setState({login:true})
  }

  logoutHandler = () =>{
    sessionStorage.clear()
    this.setState({login:false})
  }

  componentDidMount(){
    if(!localStorage.getItem('users')){
      localStorage.setItem('users','[]')
    }
    if(!localStorage.getItem('userInformation')){
      localStorage.setItem('userInformation','[]')
    }
  }
  
  render() {
    
    
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar login={this.state.login} logout={this.logoutHandler}/>
          <Switch>
            <Route path='/loggedin' render={() => <Detail login={this.state.login} />} />
            <Route path='/login' render={() => <Login login={this.loginHandler} />} />
            <Route path='/personalInformation' component={PersonalInformation} />
            <Route path='/educationalInformation' component={EducationalInformation} />
            <Route path='/userdetail' component={UserDetail} />
            <Route path='/usereducation' component={UserEducation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
