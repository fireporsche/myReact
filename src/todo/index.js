import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import configureStore from './configureStore';
import App from "./components/App";

// 创建store
let store = configureStore({});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
