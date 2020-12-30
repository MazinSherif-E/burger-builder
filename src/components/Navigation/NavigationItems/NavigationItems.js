import React from 'react';
import classes from '../../../convertion/App.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props =>{

    return(<div>
        <ul className={classes.navItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated?<NavigationItem link="/orders" >Orders</NavigationItem> : null}
            {!props.isAuthenticated ? <NavigationItem link="/auth" >Authentication</NavigationItem> :
                <NavigationItem link="/logout" >Logout</NavigationItem>
                }
        </ul>
    </div>)
}

export default navigationItems;