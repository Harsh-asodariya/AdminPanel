import React, { Component } from 'react';
import Input from '../InputFields/Input';

class changePassword extends Component {

    state = {
        changePassword: {
            email: {
                label: 'E-mail',
                elementType: 'Input',
                elementConfig: {
                    type: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/,
                    taken: false
                },
                valid: false,
                touched: false
            },
            oldPassword: {
                label: 'Old Password',
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
            newPassword: {
                label: 'New Password',
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
            confirmPassword: {
                label: 'Confirm password',
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
        formIsValid: false,
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
        const updatedChangePassword = {
            ...this.state.changePassword
        }
        const updatedFormElement = {
            ...updatedChangePassword[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedChangePassword[inputIdentifier] = updatedFormElement
        updatedFormElement.touched = true;

        if (inputIdentifier === 'confirmPassword') {
            let password = updatedChangePassword['newPassword'].value
            let confirmPassword = updatedChangePassword['confirmPassword'].value
            if (password === confirmPassword && confirmPassword.trim() !== '') {
                updatedFormElement.valid = true;
            }
        }
        else {
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        }

        let formIsValid = true
        for (let inputIdentifier in updatedChangePassword) {

            formIsValid = updatedChangePassword[inputIdentifier].valid && formIsValid
        }

        this.setState({ changePassword: updatedChangePassword, formIsValid: formIsValid })
    }

    eventHandler = (event) =>{
        event.preventDefault();
        if(event.target.id === 'cancel'){
            let access = window.confirm('are you sure?');
            if(access){
                this.props.history.push('/loggedin')
            }
        }
        
        if(event.target.id === 'changePassword'){
            let access = window.confirm('are you sure?');
            if(access){
                event.preventDefault()
                let emailIn = false
                const email = this.state.changePassword['email'].value;
                const password = this.state.changePassword['oldPassword'].value;
                let verified = false
                let stored_users = JSON.parse(localStorage.getItem('users'))
                if (stored_users) {
                    for (let u = 0; u < stored_users.length; u++) {
                        if (email === stored_users[u].email){
                            emailIn = true
                            if(password === stored_users[u].password) {
                            verified = true;
                            stored_users[u].password = this.state.changePassword.newPassword.value
                            localStorage.setItem('users',JSON.stringify(stored_users))
                            break;
                            }
                        }
                    }
                    if (verified) {
                        this.props.history.push('/loggedin')    
                    }
                    else if(emailIn){
                        alert('Enter valid old password')
                    }
                    else{
                        alert('Enter Valid Email')
                    }
            }
        }
    }
}

    render() {

        let formElements = [];
        for (let key in this.state.changePassword) {
            formElements.push({
                id: key,
                config: this.state.changePassword[key]
            })
        }

        let form = (
            <form style={{ textAlign: 'left' }} id='EducationInformation'>
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
            <button className='Success btn pink lighten-1 z-depth-0' id='cancel' onClick={this.eventHandler}>CANCEL</button>
            <button className='Success btn pink lighten-1 z-depth-0' id='changePassword' onClick={this.eventHandler} disabled={!this.state.formIsValid}>CHANGE PASSWORD</button>
                
           </form>
        )

        return (
            <div className='container' style={{ textAlign: 'center' }}>
                {form}

            </div>);
    }
}

export default changePassword;