import React, { useState, useEffect } from 'react';
import axios from '../../axio-orders';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import classes from '../../convertion/App.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { GiKnifeFork } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import Modal from '../../components/UI/Modal/Modal';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Layout from '../../components/Layout/Layout';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as indexActions from '../../store/actions/index';

const burgerBuilder = props =>{

    const [sideDrawer, setSideDrawer] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(()=>{
        props.onFetchingredients(); 
    }, [])

    const showSideDrawer = () =>{
        setSideDrawer(!sideDrawer)
    }

    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients).map( igkey=>{
            return ingredients[igkey]
        }).reduce((sum, el)=>{
            return sum + el
        },0);//the previous sum and the current element and an initial value of zero    
        return sum > 0 ;
    }

    const purchaseHandler =()=>{
        if(props.isAuthenticated){
        setPurchasing(!purchasing)
        
        }else{
            props.onSetAuthredirectPath('/');
            props.history.push('/auth');
        }
    }

    const cancelBurgerHandler =()=>{
        setPurchasing(false)
    }

    const purchaseContinueHandler =()=>{
        //alert("You continued !!")
              props.history.push('/contactdata');
              {/*props.history.push('/contactdata');*/}
            }   

    const disabledInfo = {
        ...props.ings
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0  //true or false
    }

    let burger =  props.error ? <div></div> : <Spinner/>
    let orderSummary = null;
    let button = null;
    if (props.ings) {
        burger =  <Burger  ingredients={props.ings}/>;
            
        orderSummary= <Modal 
        continue={purchaseContinueHandler}
        closed={cancelBurgerHandler}
        ingredients={props.ings}
        show={purchasing} />;

        button=<button className={classes.ORDERbtn}
        disabled={!updatePurchaseState(props.ings)} 
        onClick={purchaseHandler}>{props.isAuthenticated? "ORDER NOW" : "SIGNUP TO ORDER"}</button>;
        }

        
        if (props.loading) {
            orderSummary= <Spinner/>
        } 

        return(
        <div>
            {orderSummary}
            <div className={classes.burgerIngredient}>
                <Layout open={showSideDrawer} />
                <SideDrawer 
                    click={showSideDrawer}
                    show={sideDrawer}/>
                <GiKnifeFork className={classes.burgerIngredient__fork}/>
                <ImSpoonKnife className={classes.burgerIngredient__knife}/>
                {burger}
                <BuildControls 
                        price ={props.price}
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        /> 
                    
                {button}
            </div> 
        </div>)
    
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loading,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
        onFetchingredients:()=> dispatch(indexActions.fetchIngredients()) ,
        onSetAuthredirectPath: (path)=> dispatch(indexActions.setAuthRediretPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));