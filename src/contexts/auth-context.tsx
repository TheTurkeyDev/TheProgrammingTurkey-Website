import { WithChildren } from 'gobble-lib-react';
import { useState, useEffect, createContext, useContext } from 'react';
import * as authAPI from '../network/auth-network';

type AuthContextType = {
    readonly authChecked: boolean
    readonly permissions: readonly string[]
    readonly userName: string
    readonly userID: string
    readonly avatar: string
    readonly authState: boolean
    readonly logout: () => void
    readonly login: () => void
    readonly checkAuth: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth)
        throw new Error('Auth is undefined! Must be used from within a Auth Provider!');
    return auth;
};

export const AuthWrapper = ({ children }: WithChildren) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        async function checkLogin() {
            authAPI.isLoggedIn().then(json => {
                if (json.loggedin) {
                    setUserName(json.username);
                    setUserID(json.user_id);
                    setUserAvatar(json.avatar);
                    authAPI.getUserPerms().then(json => {
                        setPermissions(json);
                        setAuthChecked(true);
                    });
                }
                else {
                    setAuthChecked(true);
                }
                setAuthState(json.loggedin);
            }).catch(() => {
                setAuthChecked(true);
            });
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
    };

    const logout = () => {
        authAPI.logout().then(json => {
            if (json.success) {
                setUserName('');
                setUserID('-1');
                setUserAvatar('');
                setAuthState(false);
            }
        });
    };

    const checkAuth = () => {
        setAuthChecked(false);
    };

    return (
        <AuthContext.Provider value={{ authChecked, permissions, userName, userID, avatar: userAvatar, authState, logout, login, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};