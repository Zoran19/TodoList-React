import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { initialState } from "./reducers/user";

const composeEnhancers =
    (process.env.NODE_ENV !== "production" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const store = createStore(
    rootReducer,
    {
        user: { ...initialState, token: localStorage.getItem("token") },
    },
    composeEnhancers(applyMiddleware(thunk))
);
