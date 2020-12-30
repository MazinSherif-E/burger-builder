import React from 'react';
import classes from '../../../convertion/App.css';
import logo from '../../../images/burger-logo.png';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxilliary';

const sideDrawer = props => {
    {/*<div className={classes.sidebar}>
        <button className={classes.nav_btn}></button>
</div>*/}

    return (
        <Aux>
            <div 
                className={props.show ? [classes.sideDrawer, classes.sideDrawer__open].join(' ') : 
                [classes.sideDrawer, classes.sideDrawer__close].join(' ')}>
                <button onClick={props.click} className={classes.sideDrawer__X}>&times;</button>
                <img src={logo} alt="logo" className={classes.sideDrawer__img}/>
                <nav>
                    <NavigationItems />
            </nav>
            </div>
        </Aux>
        )
}

export default sideDrawer;