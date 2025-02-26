import { Headline3, useUrlParams } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import * as authAPI from '../../network/auth-network';
import { getSiteURLBase } from '../../network/network-helper';
import { PlatformLoginType } from '../../types/platform-login';
import { LoginPlatform } from './login-platform';

const LoginPlatformsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    margin-top: 16px;
    gap: 16px;
    justify-items: center;
`;


export const Login = () => {
    const { authState } = useAuth();
    const { from } = useUrlParams();

    const [logins, setLogins] = useState<readonly PlatformLoginType[]>([]);

    useEffect(() => {
        authAPI.getLogins(from ?? getSiteURLBase()).then(logins => setLogins(logins));
    }, []);

    return authState ?
        <Navigate to={from ?? '/'} /> :
        (
            <LoginPlatformsWrapper>
                <Headline3>Login with a method below:</Headline3>
                {
                    logins.map(login => (
                        <LoginPlatform
                            key={login.platform}
                            url={login.url}
                            platform={login.platform}
                            color={login.color}
                            icon={login.icon}
                        />
                    ))
                }
            </LoginPlatformsWrapper>
        );
};
