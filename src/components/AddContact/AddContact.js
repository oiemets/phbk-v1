import React, { useEffect } from 'react';
import styles from './AddContact.module.css';
import { connect } from 'react-redux';
import { addContact,removeAddContactErrorMessage } from '../../store/actionCreator';
import { v4 as uuidv4 } from 'uuid';


const AddContact = ({ uid, contacts, error, addContact, removeErrorMessage }) => {
    useEffect(() => {
        setTimeout(() => {
            removeErrorMessage();
        }, 3000)
    }, [error, removeErrorMessage])
    return (
            <form 
                className={styles.add_contact_form}
                onSubmit={e => 
                    {e.preventDefault();
                    addContact(uid, contacts, {
                        id: uuidv4(),
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
                }}>
                    {error && 
                    <div className={styles.error}>
                        <h2>{error}</h2>
                    </div>}
                <div className={styles.inp_container}>
                    <label htmlFor="firstname" className={styles.add_label}>firstname:</label>
                    <input type="text" name="firstname" className={`${styles.add_input} ${styles.firstname_inp}`} required/>
                </div>

                <div className={styles.inp_container}>
                    <label htmlFor="lastname" className={styles.add_label}>lastname:</label>
                    <input type="text" name="lastname" className={`${styles.add_input} ${styles.lastname_inp}`} required/>
                </div>

                <div className={styles.inp_container}>
                    <label htmlFor="phone" className={styles.add_label}>phone:</label>
                    <input type="text" name="phone" className={`${styles.add_input} ${styles.phone_inp}`} required/>
                </div>

                <div className={styles.inp_container}>
                    <label htmlFor="email" className={styles.add_label}>email:</label>
                    <input type="text" name="email" className={`${styles.add_input} ${styles.email_inp}`} required/>
                </div>
                
                <div className={styles.inp_container}>
                    <label htmlFor="address" className={styles.add_label}>address:</label>    
                    <input type="text" name="address" className={`${styles.add_input} ${styles.address_inp}`} required/>
                </div>

                <input type="submit" value="add" className={styles.add_btn}/>
            </form>
        );
    }

const mapStateToProps = state => {
    return {
        uid: state.auth.uid,
        contacts: state.contacts.contacts,
        error: state.contacts.error
    };
}


const mapDispatchToProps = dispatch => {
    return {
        addContact: (uid, contacts, newContact) => dispatch(addContact(uid, contacts, newContact)),
        removeErrorMessage: () => dispatch(removeAddContactErrorMessage()) 
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddContact);