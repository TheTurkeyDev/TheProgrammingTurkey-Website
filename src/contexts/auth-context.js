import React, { useState, useEffect, createContext } from 'react';
import { getDevAPIBase } from '../network/network';

export const AuthContext = createContext(null);

export function AuthWrapper(props) {
    const [authChecked, setAuthChecked] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState(-1);
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        async function isLoggedin() {
            fetch(getDevAPIBase() + "/auth/loggedin", {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("access_token")
                }
            }).then(response => {
                return response.json();
            }).then(json => {
                if (json.loggedin) {
                    setUserName(json.username);
                    setUserID(json.user_id);
                    fetch(getDevAPIBase() + "/user/perms", {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': sessionStorage.getItem("access_token")
                        },
                    }).then(resp => {
                        if (resp.status == 200) {
                            return resp.json();
                        }
                        return [];
                    }).then(json => {
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
        isLoggedin();
    }, []);

    const login = () => {
        fetch(getDevAPIBase() + "/user/info", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem("access_token")
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.user_id) {
                setUserName(json.display_name);
                setUserID(json.user_id);
                fetch(getDevAPIBase() + "/user/perms", {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("access_token")
                    },
                }).then(resp => {
                    if (resp.status == 200) {
                        return resp.json();
                    }
                    return [];
                }).then(json => {
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