import React from 'react';
import classes from '../../convertion/App.css';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    let transformedIngredients=Object.keys(props.ingredients)
            .map(igKey=>{
                return [...Array(props.ingredients[igKey])].map(( _ , i )=>{
                    return <BurgerIngredients key={igKey + i} type={igKey} />;
            })
        } 
        ).reduce((pre,cur) => {
            return pre.concat(cur)
        },[]);


//        const ingredientsArray = [];
//        for(let ingName in props.ingredients){
//            transformedIngredients.push({
//                name: ingName,
//                amount: props.ingredients[igName]
//            })
//        }
//        
//        let transformedIngredients = ingredientsArray.map(igKey=>{
//            <BurgerIngredients type={igKey.name} key={igKey}/>
//        }).reduce((pre,cur) => {
//            return pre.concat(cur)
//        },[]);
        
        if (transformedIngredients.length === 0 ){
            transformedIngredients = <p className={classes.Burger__add}>Please start adding ingredients</p>
        }
        {transformedIngredients}
        
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}            
            <BurgerIngredients type='bread-bottom'/>
        </div>
    )
}
                                       
export default burger;