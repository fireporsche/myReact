/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-17.
 */
import React, {Component} from "react";
import {Provider} from "react-redux";
import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}

