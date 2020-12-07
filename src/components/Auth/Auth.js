import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { authState, setLoader } from '../../store/actionCreator';
import { auth } from '../../db/firebase';
import { Route, Redirect } from 'react-router-dom';

import Loader from '../Loader/Loader';
import Login from '../Login/Login';
import Phonebook from '../Phonebook/Phonebook';



const Auth = ({ email, loader, authState, setLoader})=> {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user);
            }
            setLoader(false);
        });
    }, [])

    useEffect(() => {
        authState(currentUser.email, currentUser.uid);
    }, [currentUser]);

    return (
        <>
            {loader && <Loader/>}
            {email  && <Phonebook/>}
            {(!loader && !email) && <Login/>}
            <Route exact path="/">
                {email && <Redirect to="/contacts"/>}
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
        authState: (email, uid) => dispatch(authState(email, uid)),
        setLoader: (bool) => dispatch(setLoader(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
