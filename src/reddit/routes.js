/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-16.
 */
import React, {Component} from "react";
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory} from "react-router";
import withBasename from "../withBasename";
import LoginForm from "./components/sign/LoginForm";

const ACTIVE = {color: 'red'};

const App = ({children}) => (
    <div>
        <h1>APP!</h1>
        <ul>
            <li><Link to="/" activeStyle={ACTIVE}>/</Link></li>
            <li><IndexLink to="/" activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

            <li><Link to="/users" activeStyle={ACTIVE}>/users</Link></li>
            <li><IndexLink to="/users" activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

            <li><Link to="/users/ryan" activeStyle={ACTIVE}>/users/ryan</Link></li>
            <li><Link to={{pathname: '/users/ryan', query: {foo: 'bar'}}}
                      activeStyle={ACTIVE}>/users/ryan?foo=bar</Link></li>

            <li><Link to="/login" activeStyle={ACTIVE}>/login</Link></li>
            <li><Link to="/about" activeStyle={ACTIVE}>/about</Link></li>
        </ul>

        {children}
    </div>
);

const Index = () => (
    <div>
        <h2>Index!</h2>
    </div>
);

const Users = ({children}) => (
    <div>
        <h2>Users</h2>
        {children}
    </div>
);

const UsersIndex = () => (
    <div>
        <h3>UsersIndex</h3>
    </div>
);

class User extends Component {
    render() {
        return (
            <div>
                <h3>User {this.props.params.id}&nbsp;
                    <small>query: {JSON.stringify(this.props.location.query)}</small>
                </h3>
            </div>
        )
    }
}

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

const routes = (
    <Router history={withBasename(browserHistory, 'console')}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="about" component={About}/>
            <Route path="users" component={Users}>
                <IndexRoute component={UsersIndex}/>
                <Route path=":id" component={User}/>
            </Route>
            <Route path="login" component={LoginForm}/>
            <Route path="about" component={About}/>
        </Route>
    </Router>
)

export default routes;
