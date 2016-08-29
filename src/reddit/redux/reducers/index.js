/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-14.
 */
import {combineReducers} from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
    todos,
    visibilityFilter
})

export default todoApp
