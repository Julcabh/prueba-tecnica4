import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { google } from "../firebase/firebaseConfig";
import { types } from "../types/types";

//logout

export const loginEmailPassAsincrono = (email, pass) => {
    return (dispatch) => { 
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, pass)
        .then (({ user }) => {
            //dispatch(loginSincrono(user.uid, user.displayName))
            console.log("Hola, bienvenido")
            alert("Bienvenido "+email);
            console.log(user)
        })
        .catch (error => {
            console.log(error)
        })
    }
}


export const loginGoogleAsincrono = () => {
    return (dispatch) => { 
        const auth = getAuth()
        signInWithPopup(auth, google)
        .then (({ user }) => {
            dispatch(loginSincrono(user.uid, user.displayName))
            console.log(user)
        })
        .catch (error => {
            console.log(error)
        })
    }
}

export const loginSincrono = (id, displayname) => {
    return{
        type: types.login,
        payload: {
            id,
            displayname
        }
    }
}

export const logoutAsincrono = () => {
    return (dispatch) => { 
        const auth = getAuth()
        signOut(auth)
        .then (( user ) => {
            console.log("Se finalizo la sesion")
            console.log(user)
        })
        .catch (error => {
            console.log(error)
        })
    }
}