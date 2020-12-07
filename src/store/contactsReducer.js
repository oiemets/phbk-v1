import * as Types from './actionTypes';

const init = {
    contacts: [],
    currentContact: {},
    error: null,
    loader: true
}

export default function contactsReducer(state = init, {type, contacts, currentContact, error, loader}) {
    switch(type){
        case Types.GET_CONTACTS: return {...state, contacts};
        case Types.ADD_CONTACT: return {...state, contacts};
        case Types.ADD_CONTACT_ERROR: return {...state, error};
        case Types.ADD_CURRENT_CONTACT: return {...state, currentContact};
        case Types.AUTH_LOGOUT: return {...state, contacts: [], currentContact: {}};
        case Types.SET_LOADER: return {...state, loader};
        case Types.UPDATE_CONTACT: return {...state, contacts, currentContact};
        case Types.REMOVE_CONTACT: return {...state, contacts, currentContact};
        case Types.REMOVE_CONTACT_ERROR: return {...state, error};
        default: return state;
    }
}