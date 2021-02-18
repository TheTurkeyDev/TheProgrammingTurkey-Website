import React, { useState, useEffect, createContext } from 'react';
import * as authAPI from '../network/auth-network';

export const AuthContext = createContext(null);

export function AuthWrapper(props) {
    const [authChecked, setAuthChecked] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        async function checkLogin() {
            authAPI.isLoggedIn().then(json => {
                if (json.loggedin) {
                    setUserName(json.username);
                    setUserID(json.user_id);
                    authAPI.getUserPerms().then(json => {
                        setPermissions(json);
                        setAuthChecked(true);
                    });
                }
                else {
                    setAuthChecked(true);
                }
                setAuthState(json.loggedin);
            })
        }
        if (!authChecked)
            checkLogin();
    }, [authChecked]);

    const login = () => {
        authAPI.getUserInfo().then(json => {
            if (json.user_id) {
                setUserName(json.display_name);
                setUserID(json.user_id);
                authAPI.getUserPerms().then(json => {
                    setPermissions(json);
                    setAuthState(true);
                });
            }
            else {
                logout();
            }
        });
    }

    const logout = () => {
        authAPI.logout().then(json => {
            if (json.success) {
                setUserName('');
                setUserID('-1');
                setAuthState(false);
            }
        });
    }

    const checkAuth = () => {
        setAuthChecked(false);
    }

    return (
        <AuthContext.Provider value={{ authChecked, permissions, userName, userID, authState, logout, login, checkAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
}