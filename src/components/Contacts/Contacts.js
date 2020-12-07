import React, { useEffect } from 'react';
import styles from './Contacts.module.css';
import { connect } from 'react-redux';
import { addCurrentContact, getContacts } from '../../store/actionCreator';


const Contacts = ({ uid, contacts, currentContact, getContacts, addCurrentContact }) => {

    useEffect(() => {
        if(uid) {
            getContacts(uid)
        }
    }, [uid, getContacts]);

    useEffect(() => {
        if(contacts[0]) {
            addCurrentContact(contacts[0])
        }
    }, [contacts, addCurrentContact])
    return (
        <div className={styles.contacts_container}>
            <ul className={styles.contacts_list}>
                {contacts.map(c => {
                    return <li 
                        key={c.id} 
                        className={`${styles.contacts_item} ${currentContact.id === c.id && styles.active_contact}`}
                        onClick={() => addCurrentContact(c)}
                    >{c.firstname} {c.lastname}</li>
                })}
            </ul>
        </div> 
    );
}


const mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        contacts: state.contacts.contacts,
        currentContact: state.contacts.currentContact
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: (uid) => dispatch(getContacts(uid)),
        addCurrentContact: (contact) => dispatch(addCurrentContact(contact))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
