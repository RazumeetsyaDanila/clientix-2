import { ClientsInitialState } from '../initialState';

export const clientsReducer = (state = ClientsInitialState, action) => {
    switch (action.type){
        case 'FETCH_CLIENTS':
            return {...state, loading: true}
        case 'FETCH_CLIENTS_SUCCESS':
            return {...state, loading: false, clients: action.payload, error: ''}
        case 'FETCH_CLIENTS_ERROR':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}