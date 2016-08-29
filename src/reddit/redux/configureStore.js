/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-16.
 */
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import consoleReducers from "./reducers";
import {createStore, applyMiddleware} from "redux";

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    const store = createStore(
        consoleReducers,
        initialState,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
