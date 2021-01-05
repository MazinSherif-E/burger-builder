import React from 'react'
import classes from '../../../convertion/App.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label: 'Salad' , type: 'salad'},
    {label: 'Cheese' , type: 'cheese'},
    {label: 'Bacon' , type: 'bacon'},
    {label: 'Meat' , type: 'meat'}
]

const BuildControls = (props) =>(
    
    <div className={classes.BuildControls}> 
        <p className={classes.BuildControls__price}>Burger Price:<strong> {props.price.toFixed(2)} $</strong></p>
        <div className={classes.BuildControls__ings}>
            {controls.map(ctr=>(
                <BuildControl 
                    removed={() => props.ingredientRemoved(ctr.type)}
                    added={() => props.ingredientAdded(ctr.type)} 
                    key={ctr.controls} 
                    label={ctr.label} 
                    disable={props.disabled[ctr.type]}/>
            ))}       
        </div>
    </div>
)

export default BuildControls;