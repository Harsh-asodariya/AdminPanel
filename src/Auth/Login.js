import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Input from '../InputFields/Input';

class Login extends Component {
    state = {
        loginForm: {
            email: {
                label: 'E-mail',
                elementType: 'Input',
                elementConfig: {
                    type: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'password',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },


        },
        formIsValid: false
    }

    dataHandler = (event) => {
        event.preventDefault()

        const email = this.state.loginForm['email'].value;
        const password = this.state.loginForm['password'].value;
        let verified = false
        let stored_users = JSON.parse(localStorage.getItem('users'))
        if (stored_users) {
            for (let u = 0; u < stored_users.length; u++) {
                if (email === stored_users[u].email && password === stored_users[u].password) {
                    verified = true;
                    break;
                }
                
            }
        }
        if (verified) {
            this.props.login()
            sessionStorage.setItem('activeuser',email)
            alert('Login successfull')
            this.props.history.push('/loggedin')
        }
        else {
            alert('Enter valid email or password')
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (rules.regex) {
                isValid = rules.regex.test(value) && isValid;
            }
        }
        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid })
    }

    render() {

        let formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <form onSubmit={this.dataHandler} style={{ textAlign: 'left' }}>
                <h5 className='gery-text text-darken-3'>Educational Information</h5>

                {
                    formElements.map(element => (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            label={element.config.label}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangeHandler(event, element.id)} />
                    ))
                }
                <button className='Success btn pink lighten-1 z-depth-0' disabled={!this.state.formIsValid}>Login</button>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Link to='/'>Forgot password</Link>
                    <Link to='/personalInformation'>Do not have an account? create one</Link>
                </div>
            </form>
        )

        return (
            <div className='container' style={{ textAlign: 'center' }}>
                {form}
            </div>);
    }
}

export default withRouter(Login);