import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer  } from "../reducers/loginReducer";
import { moviesReducers } from "../reducers/moviesReducers";
import { registroReducer } from "../reducers/registroReducer";


const composeEnhancers = (typeof window !== 'undefined' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers ({
    login: loginReducer,
    registro: registroReducer,
    movies: moviesReducers
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)