import React from 'react';
import classes from '../../../convertion/App.css';
import logo from '../../../images/burger-logo.png';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props =>(
    <header className={classes.toolbar}>
        <div className={classes.toolbar__items}>
            <button className={classes.nav_btn} onClick={props.click}></button>
            <div className={classes.toolbar__logo}>
                <img src={logo} alt="logo" className={classes.toolbar__img}/>
            </div>
            <div className={classes.navi}>
                <NavigationItems isAuthenticated={props.auth}/>
            </div>
        </div>
    </header>
)

export default toolbar;