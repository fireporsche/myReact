/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-16.
 */
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import todoReducers from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
    const store = createStore(
        todoReducers,
        initialState,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );

    console.log('module.hot', module.hot);

    if (module.hot) {
        console.log('module.hot', module.hot);
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
