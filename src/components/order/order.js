import React from 'react';
import classes from '../../convertion/App.css';

const order = (props) =>{
    const ingredients =[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
    return <span className={classes.order__ingredients}
                 key={ig.key}>{ig.name} ({ig.amount})</span>
    })
    return(
    <div className={classes.order}>
        <div className={classes.order__para}>
            <p>Ingredients: {ingredientOutput} </p>
        </div>
        <p className={classes.order__price}>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
)}

export default order;

