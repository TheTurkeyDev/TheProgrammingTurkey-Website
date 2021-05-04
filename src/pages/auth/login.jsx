import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/auth-context';
import * as authAPI from '../../network/auth-network';
import { LoginPlatform } from './login-platform';

const LoginPlatformsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    margin-top: 16px;
    gap: 16px;
    justify-items: center;
`;


export const Login = (props) => {
    const auth = useContext(AuthContext);

    const [logins, setLogins] = useState([]);

    useEffect(() => {
        authAPI.getLogins().then(logins => setLogins(logins));
    }, []);

    return auth.authState ?
        props.history.push('/') :
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
