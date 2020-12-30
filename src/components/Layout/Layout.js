import React from 'react' ;
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilliary';
import classes from '../../convertion/App.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => {
        return(
        <Aux >
            <div className={classes.layout}>
                <Toolbar click={props.open} auth={props.isAuthenticated}/>
                <main className={classes.content}>
                    {props.children}
                </main>
            </div>
        </Aux>
        )
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);