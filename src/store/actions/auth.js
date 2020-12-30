import * as acitonTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: acitonTypes.AUTH_START
    };
}

export const authFail = (error) => {
    return {
        type: acitonTypes.AUTH_FAIL,
        error: error
    };
}

export const authSuccess = (idToken, userId) => {
    return {
        type: acitonTypes.AUTH_SUCCES,
        idToken: idToken,
        userId: userId
    };
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: acitonTypes.AUTH_LOGOUT
    }
}

export const authTimout = () => {
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        }, 3600 * 1000)
    }
}

export const auth=(email, password, isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email: email,
            password: password,
            returnSecuretoken: true 
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvik27Ad0zpGDinxoT7eZHa209r8hrVpk';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvik27Ad0zpGDinxoT7eZHa209r8hrVpk'
        }
        axios.post(url, authData)
        .then(response=>{
            console.log(response.headers);
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authTimout())
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    };
};

export const setAuthRediretPath = (path) =>{
    return {
        type: acitonTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId))
                dispatch(authTimout((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }else{
                dispatch(logout())
            }
}
}}




export const form = (type, placeholder, id) =>{
    return({type:type, placeholder: placeholder, id: id, 
            for:id, label: placeholder, value:"", 
            validation: {
                required: true,
                minLength: 5,
                maxlength: 5
            }, valid:false})
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
        isValid = value.trim() !== "" && isValid;
    } 
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
}

