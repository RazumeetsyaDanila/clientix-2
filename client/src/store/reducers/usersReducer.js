import { UsersInitialState } from '../initialState';


export const usersReducer = (state = UsersInitialState, action) => {
    switch (action.type){
        case 'FETCH_USERS':
            return {...state, loading: true}
        case 'FETCH_USERS_SUCCESS':
            return {...state, loading: false, users: action.payload}
        case 'FETCH_USERS_ERROR':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}