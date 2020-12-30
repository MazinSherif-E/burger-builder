import React, { useEffect, useState } from 'react';
import classes from '../../convertion/App.css';

const withErrorHandler = (WrappedComponent, axios)=>{

    return props =>{

        const [error, setError] = useState(null)

        //istead of componentWillMount we romeve it 

        const reqInterceptors= axios.interceptors.request.use(req=>{
            setError(null)
            return req;
            })
        const resInterceptor= axios.interceptors.response.use(res=> res, err=>{
            setError(err);
        })
        
        //instead of componentWillUnmount we useEffect inckuding return as a cleanup

        useEffect(()=>{
            return ()=>{
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptors, resInterceptor])

        return(
            <div >   
                {error ? <p className={classes.error}>
                    <p className={classes.error__message}>
                        {error.message}
                    </p>
                </p> : null}
                <WrappedComponent {...props}/>
            </div>  
            );
    }

}

export default withErrorHandler;