import React from 'react';
import classes from '../../../convertion/App.css';
import img from '../../../images/ingredients.jpg';

const orderSummary = props => {

    //shouldComponentUpdate (nextProps, nextState) {
      //  return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    //}
    
    const ingredientsSummary = Object.keys(props.ingredients).map(igKey=>{
        return <li 
                    className={classes.modal__items}
                    key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })
        
        return(
            <div className={classes.modal}
                style={{
                display: props.show ? "block" : "none",
                    visibility: props.show ? "visible" : "hidden" 
            }}>
            <div className={classes.modal__content}>
                <div className={classes.modal__leftSide}>
                    <h3 className={classes.modal__heading}>Your Order</h3>

                        <p className={classes.modal__subheading}>A delicious burger with the following ingredients:</p>
                       
                        <ul className={classes.modal__list}>
                            {ingredientsSummary}
                        </ul>
                        <button 
                            onClick={props.continue}
                            className={classes.modal__continue}>COUNTINUE</button>
                            
                    </div>
                    <div className={classes.modal__rigthSide}>
                            <button onClick={props.closed} className={classes.modal__close}>&times;</button>
                            <img src={img} className={classes.modal__photo} alt="ingredients"/>
                    </div>
                    
                </div>
            </div>
    
    

)};

export default React.memo(
    orderSummary, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
);