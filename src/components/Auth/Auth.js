import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authState, getContacts, setLoader } from '../../store/actionCreator';
import { auth } from '../../db/firebase';
import { Route, Redirect } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Login from '../Login/Login';
import Phonebook from '../Phonebook/Phonebook';



const Auth = props => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user);
            }
            props.setLoader(false);
        });
    }, [])

    useEffect(() => {
        props.auth(currentUser.email, currentUser.uid);
    }, [currentUser]);

    return (
        <>
            {props.loader && <Loader/>}
            {props.email  && <Phonebook/>}
            {(!props.loader && !props.email) && <Login/>}
            <Route exact path="/">
                {props.email && <Redirect to="/contacts"/>}
            </Route>
        </>
    );
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        uid: state.auth.uid,
        loader: state.contacts.loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, uid) => dispatch(authState(email, uid)),
        getContacts: (id) => dispatch(getContacts(id)),
        setLoader: (bool) => dispatch(setLoader(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
