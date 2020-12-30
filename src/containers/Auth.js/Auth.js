import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from '../../convertion/App.css';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { Link } from 'react-router-dom';
import * as indexActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const auth = props => {
    const [inputs, setInputs ] = useState({
            email: indexActions.form("email", "E-mail", "email"),    
            password: indexActions.form("password", "Password", "password")})
    const [formIsValid, setFormIsValid] = useState(true);
    const [isSignup, setIsSignup] = useState(true);
    

    useEffect(()=>{
        if(!props.building && props.authRedirectPath !== '/'){
            props.onSetAuthredirectPath()
        }
    })

    const inputChangedHandler = (event, identifier) =>{
        const updatedInputs = {
            ...inputs
        };
        const updatedInputElements = {
            ...updatedInputs[identifier]
        };
        updatedInputElements.value = event.target.value;
        updatedInputElements.valid = indexActions.checkValidity(updatedInputElements.value, updatedInputElements.validation);
        updatedInputs[identifier] = updatedInputElements;
        
        
        let formIsValid = true;
        for(let inputIdentifier in updatedInputs){
            formIsValid = updatedInputs[inputIdentifier].valid && formIsValid
        }
        setInputs(updatedInputs);
        setFormIsValid(formIsValid);
    }

    const submitHandler =()=>{
        props.onAuth(inputs.email.value, inputs.password.value, isSignup);
        props.history.push({
            pathname: "/",
            search: props.location.search
        })
    }

    const switchAuthmodeHandler = () =>{
        setIsSignup(!isSignup)
    }

    const formElementArray = [];
    for (let key in inputs){
            formElementArray.push({
            id: key,
            config: inputs[key]
        })
        }
    let form= (
        <form className={classes.ContactData__form} >                    
            {formElementArray.map(formElement=>{
                return(<Input type={formElement.config.type} 
                                placeholder={formElement.config.placeholder}
                               id={formElement.config.id}    
                               for={formElement.config.for}
                               label={formElement.config.label}
                               key={formElement.id}
                               value={formElement.config.value}
                               options={formElement.config.options}
                               change={(event) => inputChangedHandler(event, formElement.id)}
                               invalid={formElement.config.valid}
                                style={{
                                   backgroundColor: "white"
                               }}/>)
            })}
        </form>)
            
        let errorMessage = null;
        if(props.error){
            errorMessage = <p className={classes.Message}>{props.error.message}!</p>
            } 

            
    return (
        <div className={classes.auth}>
            <Toolbar auth={props.isAuthenticated}/>
            {props.loading ? <Spinner/> :
            <div className={classes.auth__flex}>
                <div className={classes.auth__content}>
                    {errorMessage}
                    {form}
                    <div className={classes.auth__buttons}>
                        <Link 
                            className={classes.auth__sign}
                            onClick={submitHandler}>
                            SUBMIT
                        </Link> 
                        <Link 
                            className={classes.auth__submit}
                            onClick={switchAuthmodeHandler}>
                            SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
                        </Link>
                    </div>
                </div>
            </div>}
        </div>
    );
}


const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null ,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth:(email, password, isSignup)=>dispatch(indexActions.auth(email, password, isSignup)),
        onSetAuthredirectPath: ()=> dispatch(indexActions.setAuthRediretPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);