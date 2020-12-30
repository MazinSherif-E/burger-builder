import React from 'react';
import classes from '../../../../convertion/App.css';

const BuildControl = (props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.BuildControl__Label}>{props.label}</div>
        <button 
            className={classes.BuildControl__Less} 
            onClick={props.removed} 
            disabled={props.disable}> Less </button>
        <button
            className={classes.BuildControl__More} 
            onClick={props.added}> More </button>
    </div>
)

export default BuildControl;