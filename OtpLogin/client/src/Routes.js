import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import OtpPage from "./Signup/OtpPage";
import SignUp from "./Signup/Signup";
import Login from "./Login/Login";
import Success from "./Signup/Success";
import UserDetails from "./Signup/UserDetails";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={SignUp} />
                    <Route exact path="/verifyotp" component={OtpPage} />
                    <Route exact path="/userdetails" component={UserDetails} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/success" component={Success} />
                </Switch>
            </Router>
        )
    }
}