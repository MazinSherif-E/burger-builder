import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import BurgerBuilderReducer from './store/reducers/burgerBuider';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;    

const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

{/*const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('{Middleware] next state', store.getState());
            return result;
        }
    }
}*/}


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
