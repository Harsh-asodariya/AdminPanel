import React, { Component } from 'react';
import Input from '../InputFields/Input';

class EducationaForm extends Component {

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
        formIsValid: false,
        user :'',
        education :''
    }


    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let user
        let education
        for (let param of query.entries()) {
            if(param[0]==='user'){
               user = param[1] 
            }
            if(param[0]==='education'){
                education = param[1]
            }  
        }
        this.setState({user : user, education : education})
        let Personalinfo = JSON.parse(localStorage.getItem('userInformation'))
        let Preinfo = Personalinfo[user].educationalInformation[education]


            const updatedEducationalInformation = {
                ...this.state.EducationalInformation
            }
            for (let inputIdentifier in updatedEducationalInformation) {
                updatedEducationalInformation[inputIdentifier].value = Preinfo[inputIdentifier]
                updatedEducationalInformation[inputIdentifier].touched = true
                updatedEducationalInformation[inputIdentifier].valid = true
            }

            this.setState({ EducationalInformation: updatedEducationalInformation, formIsValid: true })
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

    eventHandler = (event) =>{
        event.preventDefault();
        if(event.target.id === 'cancel'){
            let access = window.confirm('are you sure?');
            if(access){
                this.props.history.push('/usereducation')
            }
        }
        
        if(event.target.id === 'save'){
            let access = window.confirm('are you sure?');
            if(access){
                let Personalinfo = JSON.parse(localStorage.getItem('userInformation'))
                let Preinfo = Personalinfo[this.state.user].educationalInformation[this.state.education]
                for (let formElement in this.state.EducationalInformation) {
                    
                    Preinfo[formElement] = this.state.EducationalInformation[formElement].value;
                    
                }
                Personalinfo[this.state.user].educationalInformation[this.state.education] = Preinfo;
                localStorage.setItem('userInformation',JSON.stringify(Personalinfo))
                this.props.history.push('/usereducation')
            }
        }
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
            <button className='Success btn pink lighten-1 z-depth-0' id='cancel' onClick={this.eventHandler}>CANCEL</button>
            <button className='Success btn pink lighten-1 z-depth-0' id='save' onClick={this.eventHandler} disabled={!this.state.formIsValid}>SAVE</button>
                
           </form>
        )

        return (
            <div className='container' style={{ textAlign: 'center' }}>
                {form}

            </div>);
    }
}

export default EducationaForm;