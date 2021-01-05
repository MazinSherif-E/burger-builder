import React from 'react';
import classes from '../../convertion/App.css';
import Burger from '../../components/Burger/Burger';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const checkout = props => {

        let burger = <Redirect to="/"/>;
        if(props.ings){
            burger= <Burger ingredients={props.ings}/>;              
        }
        return(
            <div className={classes.checkout}>
                <div className={classes.checkout__content}>
                    <h1 className={classes.checkout__header}>We hope it tastes well</h1>
                    <div className={classes.checkout__burger}>
                        {burger}
                    </div> 
                    <Link to="/orders" className={classes.checkout__ok} >OK!</Link>
                </div>
            </div>
        )/*onClick={submit}*/ 
    
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(withRouter(checkout));
