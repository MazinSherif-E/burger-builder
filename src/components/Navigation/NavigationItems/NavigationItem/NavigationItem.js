import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../../../convertion/App.css'

const navigationItem = props =>(
    <div className={classes.navItem}>
        <li><NavLink 
                activeClassName={classes.navItem__linkActive}
                className={classes.navItem__link} 
                to={props.link}
                exact
                >
            {props.children}</NavLink></li>
    </div>
)

export default navigationItem;