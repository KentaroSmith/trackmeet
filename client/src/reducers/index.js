import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import userReducer from "./updateUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    logged: loggedReducer,
    user: userReducer
});

export default allReducers;