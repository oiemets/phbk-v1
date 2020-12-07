import * as Types from './actionTypes';


const init = {
    email: null,
    uid: null,
    error: {}
}


export default function authStateReducer(state = init, {type, payload}) {
    switch(type) {
        case Types.AUTH:
            return {...state, email: payload.email, uid: payload.uid};
        case Types.AUTH_LOGIN:
            return {...state, error: payload.error};
        case Types.AUTH_LOGOUT: 
            return {...state, email: payload.email, uid: payload.uid}
        case Types.REMOVE_AUTH_ERROR:
            return {...state, error: payload.error};
        default: return state;
    }
}