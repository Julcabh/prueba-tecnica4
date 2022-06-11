import { moviesTypes } from "../types/types";

const initialState = {
    movies: []
}

export const moviesReducers = (state = initialState, action) => {
    switch (action.type) {
        case moviesTypes.register:
            return{
                movies: [action.payload]
            }
        case moviesTypes.list:
            return{

            }
        case moviesTypes.delete:
            return{
                
            }
        default:
            return state
    }
}