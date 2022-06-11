import { types } from "../types/types";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"

export const registroAsincrono = (email, pass, name) => {
    return (dispatch) => { 
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then (async({ user }) => {
            console.log(user)
            await updateProfile(auth.currentUser, {displayName: name} )
            alert("Se registro correctamente");
        })
        .catch (e => {
            console.log(e)
        })
    }
}

export const registroSincrono = (email, pass, name) => {
    return {
        type: types.registro,
        payload: {
            email,
            pass,
            name
        }
    }
}