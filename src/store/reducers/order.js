import * as actionTypes from '../actions/actionTypes';

const initialState={
    orders: [],
    loading: false,

}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_LOADING:
            return{
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER:
            const newOrder= {
                ...action.orderData,
                    id: action.id
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading: false,

            }
        case actionTypes.FETCH_ORDERS_LOADING: 
            return{
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS:
            return{
                ...state,
                orders: action.orders,

            }
        case actionTypes.FETCH_ORDERS_FAIL: 
            return{
                ...state,
                loading:false
            }
        //case actionTypes.DELETE_ORDER:
          //  const id = state.orders.concat({id: new Date()})
            //const newArr = id.filter(order => order.id !== action.orderId);
            //return{
              //  ...state,
                //orders: newArr
            //}
        default:
            return state;
    }
}

export default reducer;