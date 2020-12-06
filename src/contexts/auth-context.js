import React, { useState, useEffect, createContext } from 'react';
import * as authAPI from '../network/auth-network';

export const AuthContext = createContext(null);

export function AuthWrapper(props) {
    const [authChecked, setAuthChecked] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(-1);
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
                    //TODO: refresh access token?
                    sessionStorage.setItem("access_token", "");
                    sessionStorage.setItem("refresh_token", "");
                    setAuthChecked(true);
                }
                setAuthState(json.loggedin);
            })
        }
        checkLogin();
    }, []);

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
        setUserName("");
        setUserID(-1);
        setAuthState(false);
    }

    return (
        <AuthContext.Provider value={{ authChecked, permissions, userName, userID, authState, logout, login }}>
            {props.children}
        </AuthContext.Provider>
    );
}