import React, { Component } from 'react';
import Input from '../InputFields/Input';

class EducationalInformation extends Component {

    state = {
        EducationalInformation: {
            school: {
                label: 'Institute/School',
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

            course: {
                label: 'Course',
                elementType: 'Input',
                elementConfig: {
                    type: 'text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            percentage: {
                label: 'Percentage/CGPA',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/
                },
                valid: false,
                touched: false
            },
            startDate: {
                label: 'Start Date',
                elementType: 'Date',
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
            endDate: {
                label: 'End Date',
                elementType: 'Date',
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
        },

        EducationalData: [],
        formIsValid: false,
    }

    dataHandler = () => {
        let formData = {}
        for (let formElement in this.state.EducationalInformation) {
            formData[formElement] = this.state.EducationalInformation[formElement].value;
        }
        const updatedEducationForm = {
            ...this.state.EducationalInformation
        }
        const updatedEducationData = [
            ...this.state.EducationalData
        ]
        updatedEducationData.push(formData)
        sessionStorage.setItem('EducationalInformation', JSON.stringify(updatedEducationData))
        for (let inputIdentifier in updatedEducationForm) {
            updatedEducationForm[inputIdentifier].value = '';
            updatedEducationForm[inputIdentifier].valid = false;
            updatedEducationForm[inputIdentifier].touched = false;
        }
        document.getElementById('EducationInformation').reset()
        this.setState({ EducationalInformation: updatedEducationForm, EducationalData: updatedEducationData, formIsValid: false })
    }

    eventHandler = (event) => {
        if (event.target.id === 'previous') {
            this.props.history.push('/personalInformation')
        }
        if (event.target.id === 'add') {
            this.dataHandler()
        }
        if (event.target.id === 'register') {
            this.dataHandler()
            alert('Registered Successfully')
            const personalInformation = JSON.parse(sessionStorage.getItem('PersonalInformation'))
            const educationalInformation = JSON.parse(sessionStorage.getItem('EducationalInformation'))
            var email = personalInformation['email'];
            var password = personalInformation['password'];
            let stored_users = JSON.parse(localStorage.getItem('users'));
            if (stored_users) {
                stored_users.push({ email: email, password: password });
                localStorage.setItem('users', JSON.stringify(stored_users));
            } else {
                localStorage.setItem('users', JSON.stringify([{ email: email, password: password }]));
            }

            let user_information = JSON.parse(localStorage.getItem('userInformation'));
            if (user_information) {
                user_information.push({ personalInformation: personalInformation, educationalInformation: educationalInformation });
                localStorage.setItem('userInformation', JSON.stringify(user_information));
            } else {
                localStorage.setItem('userInformation', JSON.stringify([{ personalInformation: personalInformation, educationalInformation: educationalInformation }]));
            }
            sessionStorage.clear()
            this.props.history.push('/')
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
        const updatedEducationForm = {
            ...this.state.EducationalInformation
        }
        const updatedFormElement = {
            ...updatedEducationForm[inputIdentifier]
        }
        if (inputIdentifier === 'startDate' || inputIdentifier === 'endDate') {
            if (event) {
                updatedFormElement.value = event.toLocaleDateString();
            }
        }
        else {
            updatedFormElement.value = event.target.value;
        }

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedEducationForm[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifier in updatedEducationForm) {
            formIsValid = updatedEducationForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ EducationalInformation: updatedEducationForm, formIsValid: formIsValid })
    }

    render() {

        let formElements = [];
        for (let key in this.state.EducationalInformation) {
            formElements.push({
                id: key,
                config: this.state.EducationalInformation[key]
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
                <button className='Success btn pink lighten-1 z-depth-0' onClick={this.eventHandler} id='previous'>Previous</button>
                <button className='Success btn pink lighten-1 z-depth-0' onClick={this.eventHandler} id='add' disabled={!this.state.formIsValid}>Add More</button>
                <button className='Success btn pink lighten-1 z-depth-0' disabled={!this.state.formIsValid} id='register' onClick={this.eventHandler}>Register</button>
            </form>
        )

        return (
            <div className='container' style={{ textAlign: 'center' }}>
                {form}

            </div>);
    }
}

export default EducationalInformation;