import React, { useState} from 'react';
import axios from '../../../axio-orders';
import { Route, withRouter}  from 'react-router-dom';
import { connect } from 'react-redux';
import classes from '../../../convertion/App.css';
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems';
import logo from '../../../images/burger-logo.png';
import Checkout from '../Checkout';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as indexActions from '../../../store/actions/index';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: indexActions.form("text", "Your Name", "name"),    
        email: indexActions.form("email", "Your Mail", "mail"),
        street: indexActions.form("text", "Street", "street"),
        country: indexActions.form("text", "Country", "country"), 
        postalcode: indexActions.form("text", "PostalCode", "postalcode"),
        deliveryMethod:{type:"select", 
                        options:[{value: "fastest", displayValue:"Fastest"}, {value: "cheapest", displayValue:"Cheapest"}],
                        value:"fastest", valid: true, validation:{}}
    })
    const [show, setShow] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
        
    

    const orderHandler =()=>{
        props.history.replace({ 
            pathname: props.match.path + '/checkout'
        })
        
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        }
        props.onOrderBurger(order)
    }


    const inputChangedHandler = (event, identifier) =>{
        const updatedInputs = {
            ...orderForm
        };
        const updatedInputElements = {
            ...updatedInputs[identifier]
        };
        updatedInputElements.value = event.target.value;
        updatedInputElements.valid = indexActions.checkValidity(updatedInputElements.value, updatedInputElements.validation)
        updatedInputs[identifier] = updatedInputElements;
        
        
        let formIsValid = true;
        for(let inputIdentifier in updatedInputs){
            formIsValid = updatedInputs[inputIdentifier].valid && formIsValid
        }
        setOrderForm(updatedInputs);
        setFormIsValid(formIsValid);
    }
    
        const formElementArray = [];
        for (let key in orderForm){
            formElementArray.push({
                id: key,
                config: orderForm[key]
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
                                   invalid={formElement.config.valid}/>)
                })}
            </form>
        )
        return (
            <div className={classes.ContactData}>
                <div className={classes.ContactData__logo}> 
                    <img src={logo} alt="logo" className={classes.ContactData__img} />
                </div>
                <div className={classes.ContactData__navigation}>
                    <NavigationItems />   
                </div>             
                <div className={classes.ContactData__container}>
                    <h4 className={classes.ContactData__heading}>Enter Your Contact Data</h4>
                        {form}
                    <button className={classes.order__button} disabled={!formIsValid} onClick={orderHandler}>Order</button>
                </div>
                <Route path={  props.match.path + '/checkout'} component={Checkout}/>
            </div>
        )
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData)=> dispatch(indexActions.purchaseBurgerSuccess(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(contactData, axios)));