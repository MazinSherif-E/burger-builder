import React, { useEffect, useState } from 'react';
import classes from '../../convertion/App.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Order from '../../components/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axio-orders';
import { connect } from 'react-redux';
import * as indexActions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import SideBar from '../../components/Navigation/SideDrawer/SideDrawer';
import Layout from '../../components/Layout/Layout';

const orders = props => {
    const [sideDrawer, setSideDrawer] = useState(false);
    useEffect(()=>{
        props.onFetchOrders()
    }, [])
    
    const showSideDrawer = () =>{
            setSideDrawer(!sideDrawer)
    }


    let orders=<Redirect to="/"/>
    if(props.ings){
        orders=(
        <div className={classes.orders__content}>
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
            <div className={classes.orders}>
                <Layout open={showSideDrawer} />
                <SideBar 
                    click={showSideDrawer}
                    show={sideDrawer}/>
                {orders}
            </div >
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