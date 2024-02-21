import { UserInitialState } from '../initialState';

export const userReducer = (state = UserInitialState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {isAuth: true, login: action.payload.login, role: action.payload.role} 
        case 'UNSET_USER':
            return {isAuth: false, login: '', role: ''}
        default:
            return state
    }
}