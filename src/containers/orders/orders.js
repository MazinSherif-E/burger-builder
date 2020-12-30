import React, { useEffect } from 'react';
import classes from '../../convertion/App.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Order from '../../components/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axio-orders';
import { connect } from 'react-redux';
import * as indexActions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const orders = props => {

    useEffect(()=>{
        props.onFetchOrders()
    }, [])

    let orders=<Redirect to="/"/>
    if(props.ings){
        orders=(
        <div className={classes.orders}>
            {props.orders.map(order =>(
                <Order 
                    ingredients={order.ingredients}
                    price={+order.price}
                    key={order.id}
                    />
            ))}
        </div>)
        }
        return (
            <React.Fragment>
                <Toolbar auth={props.isAuthenticated}/>
                {orders}
            </React.Fragment>
        )
    
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        orders: state.order.orders,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders:()=> dispatch(indexActions.fetchOrderSucces()),
        onDeleteOrder:(orderId)=> dispatch(indexActions.delete_order(orderId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));