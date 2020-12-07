import React from 'react';
import { connect } from 'react-redux';
import styles from './Phonebook.module.css';

import Header from '../Header/Header';
import Contacts from '../Contacts/Contacts';
import AddContact from '../AddContact/AddContact';
import Details from '../Details/Details';
import { Switch, Route } from 'react-router-dom';

const Phonebook = props => {
    return (
        <>
            <Header/>
            <div className={styles.main}>
                <Switch>
                    <Route path="/contacts">
                        <Contacts/>
                        <Details/>
                    </Route>
                    <Route path="/add">
                        <AddContact/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        uid: state.auth.uid,
        view: state.view
    }
}

export default connect(mapStateToProps)(Phonebook);