import Navbar from "../components/Navbar";
import CreateTodo from "../views/CreateTodo";
import ListTodo from "../views/ListTodo";
import { Redirect, Route, Switch } from "react-router";
import React from "react";
import ModifyTodo from "./ModifyTodo";
import ShowOneTodo from "./ShowOneTodo";


function App() {

    return (
        <div className="App">
            <Navbar/>
            <Switch>
                <Route exact path="/app/home">
                    <ListTodo />
                </Route>
                <Route exact path="/app/todo/create/:list">
                    <CreateTodo />
                </Route>
                <Route exact path={`/app/todos/modify/:id`}>
                    <ModifyTodo />
                </Route>
                <Route exact path={`/app/todos/:id`}>
                    <ShowOneTodo />
                </Route>
                <Redirect to="/app/home" />
            </Switch>
        </div>
    );
}

export default App;
