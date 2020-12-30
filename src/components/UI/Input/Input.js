import React from 'react';
import classes from '../../../convertion/App.css';

const input = (props) => {
    let inputElement = null;

    let inputClass = [classes.ContactData__input]

    if (!props.invalid) {
        inputClass.push(classes.invalid)
    }else{
        inputClass.push(classes.valid)
    }

    switch (props.type) {
        case("text" || "email" || "password"):
            inputElement= (
            <div className={classes.ContactData__formGroup}>
                <input 
                    onChange={props.change}
                    type={props.type} 
                    for={props.for}
                    placeholder={props.placeholder} 
                    id={props.id} className={inputClass.join(' ')}  
                    required/>

                <label for={props.for} className={classes.ContactData__label}>{props.label}</label>
            </div>);
            break;
            case('select'):
            inputElement=( 
                <div className={classes.ContactData__formGroup}>
                    <select className={inputClass.join(' ')} 
                            value={props.value}
                            onChange={props.change}>
                        {props.options.map(option =>(
                            <option 
                                key={option.value}
                                value={option.value} 
                                className={classes.ContactData__option}>{option.displayValue}</option>
                        ))}
                    </select>
                </div>
            );
            break;
            default:
                inputElement= (
                    <div className={classes.ContactData__formGroup}>
                        <input 
                            onChange={props.change}
                            type={props.type} 
                            for={props.for}
                            placeholder={props.placeholder} 
                            id={props.id} className={inputClass.join(' ')}  
                            required/>

                        <label for={props.for} className={classes.ContactData__label}>{props.label}</label>
                    </div>
                )
    }

    return(
    <div>
        {inputElement}
    </div>
)
    }
export default input;