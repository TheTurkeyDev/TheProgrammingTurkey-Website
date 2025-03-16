import { Headline3, useFetch } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { getDevAPIBase } from '../../network/network-helper';
import { LoginPlatform } from './login-platform';
import { PlatformLogin } from './platform-login';

const LoginPlatformsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    margin-top: 16px;
    gap: 16px;
    justify-items: center;
`;


export const Login = () => {
    const { authState } = useAuth();
    const navigate = useNavigate();

    const [logins] = useFetch<readonly PlatformLogin[]>(`${getDevAPIBase()}/auth/platformlogins`);

    if (authState) {
        navigate('/');
        return <></>;
    }

    return (
        <LoginPlatformsWrapper>
            <Headline3>Login with a method below:</Headline3>
            {
                logins?.map(login => (
                    <LoginPlatform
                        key={login.platform}
                        platform={login.platform}
                        color={login.color}
                        icon={login.icon}
                    />
                ))
            }
        </LoginPlatformsWrapper>
    );
};
