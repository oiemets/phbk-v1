import * as Types from './actionTypes';
import { auth, db } from '../db/firebase';



export const authState = (email, uid) => {
    return {
            type: Types.AUTH,
            payload: {
            email,
            uid
        }
    }
}

export const login = (email, password) => {
    return dispatch => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((err) => {
            return dispatch({
                type: Types.AUTH_LOGIN,
                payload: {
                    error: {
                        code: err.code,
                        message: err.message
                    }
                }
            })
        })
    }
}

export const removeAuthErrorMessage = () => {
    return {
        type: Types.REMOVE_AUTH_ERROR,
        payload: {
            error: {}
        }
    }
}

export const getContacts = (id) => {
    return async dispatch => {
        let getContacts = await db.ref('users/' + id + '/contacts').once('value');
        let getValue = await getContacts.val();
        if(getValue){
            return dispatch({
                type: Types.GET_CONTACTS,
                contacts: getValue
            });
        }
    }
}


export const addContact = (uid, contacts, newContact) => {
    if(contacts.find(c => c.email === newContact.email)) {
        return {
            type: Types.ADD_CONTACT_ERROR,
            error: `contact ${newContact.email} already exists!`
        }
    }
    contacts.push(newContact);
    db.ref('users/' + uid + '/contacts').set([...contacts]);
    return {
        type: Types.ADD_CONTACT,
        contacts
    }
}

export const addCurrentContact = (currentContact) => {
    return {
        type: Types.ADD_CURRENT_CONTACT,
        currentContact
    }
}

export const logOut = () => {
    auth.signOut();
    return {
        type: Types.AUTH_LOGOUT,
        payload: {
            email: null,
            uid: null
        }
    }
}

export const setLoader = (bool) => {
    return {
        type: Types.SET_LOADER,
        loader: bool
    };
}

export const updateContact = (uid, contacts, update) => {
    let contactIndex = contacts.findIndex(c => c.id === update.id);
    contacts.splice(contactIndex, 1, update);
    db.ref('users/' + uid + '/contacts').set([...contacts]);
    return {
        type: Types.UPDATE_CONTACT,
        contacts,
        currentContact: update
    }
}

export const removeContact = (uid, contacts, id) => {
    let contactIndex = contacts.findIndex(c => c.id === id);
    contacts.splice(contactIndex, 1);
    db.ref('users/' + uid + '/contacts').set([...contacts]);
    return {
        type: Types.REMOVE_CONTACT,
        contacts,
        currentContact: contacts[0]
    }
}

export const removeAddContactErrorMessage = () => {
    return {
        type: Types.REMOVE_CONTACT_ERROR,
        error: null
    }
}