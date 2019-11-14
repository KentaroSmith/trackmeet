import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import userReducer from "./updateUser";
import roomReducer from "./updateRoom";
import timesReducer from "./updateTimes";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    counter: counterReducer,
    logged: loggedReducer,
    user: userReducer,
    room: roomReducer,
    times: timesReducer
});

export default allReducers;