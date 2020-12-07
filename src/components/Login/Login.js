import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Login.module.css';
import { login, removeAuthErrorMessage } from '../../store/actionCreator';

const Login = props => {
    useEffect(() => {
        setTimeout(() => {
            props.removeErrorMessage();
        }, 5000)
    }, [props.errorCode || props.errorMessage])
    return (
        <>
        {props.errorCode && <div className={styles.error}>
            <h2 className={styles.err_code}>{props.errorCode}</h2>
            <h2 className={styles.err_message}>{props.errorMessage}</h2>
        </div>}

        <div className={styles.form_container}>
            <form onSubmit={e => {
                e.preventDefault(); 
                props.login(e.target.email.value, e.target.password.value);
                e.target.email.value = '';
                e.target.password.value = '';
            }}
            className={styles.form}>
                <input type="text" name="email" className={styles.input} placeholder="email"/>
                <input type="password" name="password" className={styles.input} placeholder="password"/>
                <div>
                    {/* <button className={styles.btn}>sign in</button> */}
                    {/* <input type="submit" value="sign in" className={styles.btn}/>
                    <span>or</span> */}
                    <input type="submit" value="log in" className={styles.btn}/>
                </div>
            </form>
        </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        errorCode: state.auth.error.code,
        errorMessage: state.auth.error.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        removeErrorMessage: () => dispatch(removeAuthErrorMessage())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);