import * as actionTypes from './actionTypes';
import axios from '../../axio-orders';

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchError = ()=>{
    return{
        type: actionTypes.FETCH_ERROR
    }
}

export const fetchIngredients = ()=>{
    return dispatch =>{
            axios.get('https://burger-builder-6fbe2.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err=>{
                dispatch(fetchError())
            })
    }
}

