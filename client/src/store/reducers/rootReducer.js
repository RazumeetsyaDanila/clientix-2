import { combineReducers } from "redux";
import { userReducer } from './userReducer';
import { usersReducer } from './usersReducer';
import { clientsReducer } from './clientsReducer';
import { tagsReducer } from './tagsReducer';


export const  rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    clients: clientsReducer,
    tags: tagsReducer
    
})

// export type rootState = ReturnType<typeof rootReducer>