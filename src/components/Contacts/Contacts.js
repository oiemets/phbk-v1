import React, { useEffect } from 'react';
import styles from './Contacts.module.css';
import { connect } from 'react-redux';
import { addCurrentContact, getContacts } from '../../store/actionCreator';


const Contacts = props => {
    useEffect(() => {
        if(props.uid) {
            props.getContacts(props.uid)
        }
    }, [props.uid]);
    useEffect(() => {
        if(props.contacts[0]) {
            props.addCurrentContact(props.contacts[0])
        }
    }, [props.contacts])
    return (
        <div className={styles.contacts_container}>
            <ul className={styles.contacts_list}>
                {props.contacts.map(c => {
                    return <li 
                        key={c.id} 
                        className={`${styles.contacts_item} ${props.currentContact.id === c.id && styles.active_contact}`}
                        onClick={() => props.addCurrentContact(c)}
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
