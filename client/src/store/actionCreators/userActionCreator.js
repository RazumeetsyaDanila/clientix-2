import { Dispatch } from "react"

export const setUser = (login, role) => {
    return (dispatch) => {
        try{
            dispatch({ type: 'SET_USER', payload: {login: login, role: role}})
        } catch (e){
            console.log("ba");
        }        
    }
}

export const unsetUser = () => {
    return (dispatch) => {
        dispatch({ type: 'UNSET_USER'})
    }
}