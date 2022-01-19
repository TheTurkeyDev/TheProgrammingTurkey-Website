import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import * as authAPI from '../../network/auth-network';
import { getSiteURLBase } from '../../network/network-helper';
import { getURLParams } from '../../util/get-url-params';
import { LoginPlatform } from './login-platform';

const LoginPlatformsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    margin-top: 16px;
    gap: 16px;
    justify-items: center;
`;


export const Login = ({ history }) => {
    const { authState } = useAuth();

    const [logins, setLogins] = useState([]);
    const params = getURLParams(window.location.search);

    useEffect(() => {
        authAPI.getLogins(params.from ?? getSiteURLBase()).then(logins => setLogins(logins));
    }, []);

    return authState ?
        history.push(params.from ?? '/') :
        (
            <LoginPlatformsWrapper>
                <h2>Login with a method below:</h2>
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
}
