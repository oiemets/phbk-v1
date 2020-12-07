import React, { useState } from 'react';
import styles from './Details.module.css';
import { connect } from 'react-redux';
import EditContact from '../EditContact/EditContact';

const Details = props => {
    let [editView, setEditView] = useState(false);
    let {firstname, lastname, phone, email, address} = props.currentContact;

    return (
        <>
        {props.currentContact.email && 
        (editView ? <EditContact setEdit={setEditView}/> :
        <div className={styles.details}>
                <div className={styles.edit_btn} onClick={() => setEditView(true)}>Edit</div>
                <div className={styles.current_contact}>
                    <h3>{firstname} {lastname}</h3>
                    <h3>{phone}</h3>
                    <h3>{email}</h3>
                    <h3>{address}</h3>
                </div>
            </div>)}
        </>
    );
}

const mapStateToProps = state => {
    return {
        currentContact: state.contacts.currentContact
    };
}

export default connect(mapStateToProps)(Details);
