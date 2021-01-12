import Navbar from './Navigation/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PersonalInformation from './Form/PersonalInformation';
import EducationalInformation from './Form/EducationalInformation';
import Login from './Auth/Login';
import { Component } from 'react';
import Detail from './Detail/Detail';

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
    let detail
      if(this.state.login === true){
        detail = <Detail/>
      }
      else{
        detail = null
      }
    
    
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar login={this.state.login} logout={this.logoutHandler}/>
          {detail}
          <Switch>
            <Route path='/signin' render={() => <Login login={this.loginHandler} />} />
            <Route path='/personalInformation' component={PersonalInformation} />
            <Route path='/educationalInformation' component={EducationalInformation} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
