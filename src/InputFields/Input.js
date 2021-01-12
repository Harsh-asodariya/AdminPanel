import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = []
    let labelClasses = []
    if(props.touched){
        labelClasses.push('active')
    }
    if(props.invalid && props.touched) {
        inputClasses.push('invalid')
    }

    switch (props.elementType) {
        case 'Input':
            inputElement =
                <div className='input-field'>
                    <label htmlFor={props.label} className={labelClasses.join(' ')}>{props.label}</label>
                    <input
                        id={props.label}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                </div>
            break;
        case 'Select':
            inputElement =
                <div className=''>
                    <label>{props.label}</label>
                    <select
                        className={inputClasses.join(' ') + ' browser-default'}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>


                </div>
            break;
        case 'Date':
            inputElement = <div >
                <label style={{ display: 'inline', paddingRight: '20px' }}>{props.label}</label>
                <DayPickerInput

                    onChange={props.changed}
                    onDayChange={props.changed}
                    value={props.value} />

            </div>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
            />
    }

    return (
        <div>

            {inputElement}
        </div>
    )
}

export default input;