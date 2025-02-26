import { useQuery, WithChildren } from 'gobble-lib-react';
import { useState, useEffect, createContext, useContext } from 'react';
import { getDevAPIBase } from '../network/network-helper';
import { getParams, postParams } from '../network/auth-network';
import { Platform } from '../types/platform';
import { User } from '../types/user';

type AuthContextType = {
    readonly authChecked: boolean
    readonly platforms: readonly Platform[]
    readonly permissions: readonly string[]
    readonly userName: string
    readonly userID: string
    readonly avatar: string
    readonly authState: boolean
    readonly logout: () => void
    readonly reloadUser: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth)
        throw new Error('Auth is undefined! Must be used from within a Auth Provider!');
    return auth;
};

export const AuthWrapper = ({ children }: WithChildren) => {

    const [userInfoQuery] = useQuery<User>(`${getDevAPIBase()}/user/info`, { requestData: getParams });
    const [logoutQuery] = useQuery(`${getDevAPIBase()}/auth/logout`, { requestData: postParams });

    const [authChecked, setAuthChecked] = useState(false);
    const [authState, setAuthState] = useState(false);
    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [permissions, setPermissions] = useState<readonly string[]>([]);
    const [platforms, setPlatforms] = useState<readonly Platform[]>([]);

    const setUserData = (userInfo: User) => {
        setUserName(userInfo.displayName);
        setUserID(userInfo.userID);
        setUserAvatar(userInfo.avatar);
        setPermissions(userInfo.permissions);
        setPlatforms(userInfo.platforms);
        setAuthState(true);
    };

    useEffect(() => {
        if (authChecked)
            return;
        userInfoQuery().then(userInfo => {
            if (!!userInfo)
                setUserData(userInfo);
            setAuthChecked(true);
        });
    }, [authChecked]);

    const logout = () => {
        logoutQuery().then(() => {
            setUserName('');
            setUserID('-1');
            setUserAvatar('');
            setPermissions([]);
            setAuthState(false);
        });
    };

    const reloadUser = () => {
        setAuthChecked(false);
    };

    return (
        <AuthContext.Provider value={{ authChecked, permissions, platforms, userName, userID, avatar: userAvatar, authState, logout, reloadUser }}>
            {children}
        </AuthContext.Provider>
    );
};