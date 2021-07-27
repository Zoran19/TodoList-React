import './App.css';
import { Redirect, Switch } from "react-router";
import React from "react";
import Platform from "./views/Platform";
import Authentication from "./views/Authentication";
import RouteGuard from "./components/hoc/RouteGuard";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">

        <Switch>
            <RouteGuard
                path="/app"
                component={Platform}
                auth={props.token}
                redirection="/auth"
            />
            <RouteGuard
                path="/auth"
                component={Authentication}
                auth={!props.token}
                redirection="/app"
            />
            <Redirect to={"/auth"} />
        </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
    };
};



export default connect(mapStateToProps,null)(App);