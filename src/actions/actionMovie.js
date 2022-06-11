import { moviesTypes } from "../types/types"

export const registerMoviesAsincro = () => {
    return{

    }
}

export const registerMoviesSincro = (movies) => {
    return{
        type: moviesTypes.register,
        payload: movies

    }
}