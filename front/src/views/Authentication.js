import React, { Component } from "react";
import SignUp from "../components/Authentification/SignUp";
import Login from "../components/Authentification/Login";
import { Redirect, Route, Switch } from "react-router";

class Authentication extends Component {
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Switch>
                    <Route path="/auth/login">
                        <Login />
                    </Route>
                   <Route path="/auth/signup">
                      <SignUp />
                    </Route>
                    <Redirect to={"/auth/login"} />
                </Switch>
            </div>
        );
    }
}

export default Authentication;
