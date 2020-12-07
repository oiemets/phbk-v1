import React from 'react';
import { connect } from 'react-redux';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actionCreator';


const Header = props => {
    return (
        <div className={styles.header}>
            <nav className={styles.nav}>
                <div>
                    <ul className={styles.menu_list}>
                        <li>
                            <NavLink 
                                to="/contacts" 
                                className={styles.menu_item} 
                                activeClassName={styles.active}>
                                contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/add" 
                                className={styles.menu_item} 
                                activeClassName={styles.active}>
                                add contact
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
            <div className={styles.log_container}>
                <h3 className={styles.current_user}>{props.currentUserEmail}</h3>
                <button onClick={() => props.logout()} className={styles.logout}>log out</button>
            </div>
    </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUserEmail: state.auth.email,
        currentUserUid: state.auth.uid,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);