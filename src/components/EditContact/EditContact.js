import React from 'react';
import styles from './EditContact.module.css';
import { updateContact, removeContact } from '../../store/actionCreator';
import { connect } from 'react-redux';

const EditContact = ({uid, contacts, contact, update, remove, setEdit}) => {
    let {firstname, lastname, phone, email, address, id} = contact;

    return (
        <>
            <form 
                className={styles.edit_form}
                onSubmit={e => {
                    e.preventDefault();
                    update(uid, contacts, {
                        ...contact,
                        firstname: e.target.firstname.value,
                        lastname: e.target.lastname.value,
                        phone: e.target.phone.value,
                        email: e.target.email.value,
                        address: e.target.address.value
                    });
                    e.target.firstname.value = '';
                    e.target.lastname.value = '';
                    e.target.phone.value = '';
                    e.target.email.value = '';
                    e.target.address.value = '';
                    setEdit(false);

            }}>
                <input type="text" className={styles.edit_input} name="firstname" defaultValue={firstname}/>
                <input type="text" className={styles.edit_input} name="lastname" defaultValue={lastname}/>
                <input type="text" className={styles.edit_input} name="phone" defaultValue={phone}/>
                <input type="text" className={styles.edit_input} name="email" defaultValue={email}/>
                <input type="text" className={styles.edit_input} name="address" defaultValue={address}/>
                <input type="submit" value="save" className={`${styles.edit_form_btn} ${styles.save_btn}`}/>
                
                <button onClick={() => {remove(uid, contacts, id); setEdit(false)}} className={`${styles.edit_form_btn} ${styles.remove_btn}`}>remove</button>
                <button onClick={() => setEdit(false)} className={`${styles.edit_form_btn} ${styles.remove_btn}`}>cancel</button>
            </form>

        </>
    );
}

const mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        contacts: state.contacts.contacts,
        contact: state.contacts.currentContact
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: (uid, contacts, update) => dispatch(updateContact(uid, contacts, update)),
        remove: (uid, contacts, id) => dispatch(removeContact(uid, contacts, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);