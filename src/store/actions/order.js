import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const purchaseBurger = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFali = (error)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseLoading = () =>{
    return{
        type: actionTypes.PURCHASE_BURGER_LOADING
    }
}

export const purchaseBurgerSuccess = (orderData)=>{
    return dispatch=>{
        dispatch(purchaseLoading())
        axios.post('/orders.json' , orderData)
              .then(res => {
                    dispatch(purchaseBurger(res.data.name, orderData))
              })
              .catch(error=> {
                    dispatch(purchaseBurgerFali(error))
              });
    }
}

export const fetchOrders = (orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersLoading =()=>{
    return{
        type: actionTypes.FETCH_ORDERS_LOADING
    }
}

export const fetchOrderSucces = ()=>{
    return dispatch=>{
        axios.get('/orders.json' )
            .then(res=>{
                const fetchOorders = [];
                for(let key in res.data){
                    fetchOorders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrders(fetchOorders))
            })
            .catch(err=>{
                dispatch(fetchOrdersFail(err))
            })
    }
}