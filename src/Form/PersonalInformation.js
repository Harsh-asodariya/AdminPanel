import React, { Component } from 'react';
import Input from '../InputFields/Input';

class PersonalInformation extends Component {

    state = {
        personalInformation: {
            firstname: {
                label: 'First Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            lastname: {
                label: 'Last Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            gender: {
                label: 'Gender',
                elementType: 'Select',
                elementConfig: {
                    options: [
                        { value: 'male', displayValue: 'Male' },
                        { value: 'female', displayValue: 'female' },
                        { value: 'other', displayValue: 'other' },
                    ]
                },
                value: 'male',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
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
            phone: {
                label: 'Phone',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                defaultValue: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){10}$/
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
        formIsValid: false
    }

    componentDidMount() {
        let Preinfo = JSON.parse(sessionStorage.getItem('PersonalInformation'))
        if (Preinfo) {

            const updatedPersonalInformation = {
                ...this.state.personalInformation
            }
            for (let inputIdentifier in updatedPersonalInformation) {
                updatedPersonalInformation[inputIdentifier].value = Preinfo[inputIdentifier]
                updatedPersonalInformation[inputIdentifier].touched = true
                updatedPersonalInformation[inputIdentifier].valid = true
            }

            this.setState({ personalInformation: updatedPersonalInformation, formIsValid: true })
        }
    }


    dataHandler = (event) => {
        event.preventDefault()
        const formData = {};
        for (let formElement in this.state.personalInformation) {
            formData[formElement] = this.state.personalInformation[formElement].value;
        }
        sessionStorage.setItem('PersonalInformation', JSON.stringify(formData))
        this.props.history.push('/educationalInformation')

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (rules.regex) {
                isValid = rules.regex.test(value) && isValid;
            }
            if (!rules.taken) {
                let email = value;
                let stored_users = JSON.parse(localStorage.getItem('users'))
                if (stored_users) {
                    for (let u = 0; u < stored_users.length; u++) {
                        if (email === stored_users[u].email) {
                            isValid = false
                            alert('user mail already taken')
                            break;
                        }
                        
                    }
                } 
                
            }
        }
        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedPersonalInformation = {
            ...this.state.personalInformation
        }
        const updatedFormElement = {
            ...updatedPersonalInformation[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedPersonalInformation[inputIdentifier] = updatedFormElement
        updatedFormElement.touched = true;

        if (inputIdentifier === 'confirmPassword') {
            let password = updatedPersonalInformation['password'].value
            let confirmPassword = updatedPersonalInformation['confirmPassword'].value
            if (password === confirmPassword && confirmPassword.trim() !== '') {
                updatedFormElement.valid = true;
            }
        }
        else {
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        }



        let formIsValid = true
        for (let inputIdentifier in updatedPersonalInformation) {

            formIsValid = updatedPersonalInformation[inputIdentifier].valid && formIsValid
        }

        this.setState({ personalInformation: updatedPersonalInformation, formIsValid: formIsValid })
    }

    render() {

        let formElements = [];
        for (let key in this.state.personalInformation) {
            formElements.push({
                id: key,
                config: this.state.personalInformation[key]
            })
        }

        let form = (
            <form onSubmit={this.dataHandler}>
                <h5 className='gery-text text-darken-3'>Personal Information</h5>
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
                <button className='Success btn pink lighten-1 z-depth-0' disabled={!this.state.formIsValid}>Next</button>
            </form>
        )

        return (
            <div className='container'>

                {form}
            </div>);
    }
}

export default PersonalInformation;