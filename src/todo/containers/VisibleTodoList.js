/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-14.
 */
import {connect} from "react-redux";
import {toggleTodo} from "../actions";
import TodoList from "../components/TodoList";

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
        default:
            return todos.filter(t => !t.completed)
    }
}

/**
 *
 * @param state 新状态
 * @param ownProps 当前用户Props(更新之前), 当父组件有props传下时也将调用此函数
 * @returns {{todos}}
 */
const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(toggleTodo(id))
        }
    }
}

// 连接state处理函数和action处理函数到 TodoList 组件
const VisibleTodoList = connect(
    mapStateToProps, // mapStateToProps
    mapDispatchToProps // mapDispatchToProps
)(TodoList)

export default VisibleTodoList
