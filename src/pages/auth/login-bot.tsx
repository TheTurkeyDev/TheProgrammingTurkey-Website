import { Headline3, useFetch, useUrlParams } from 'gobble-lib-react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { getDevAPIBase, getSiteURLBase } from '../../network/network-helper';
import { PlatformLoginType } from '../../types/platform-login';
import { LoginPlatform } from './login-platform';
import { getGetAuthParams } from '../../network/auth-network';

const LoginPlatformsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    margin-top: 16px;
    gap: 16px;
    justify-items: center;
`;


export const BotLogin = () => {
    const { authState } = useAuth();
    const { from } = useUrlParams();

    const [logins, loading] = useFetch<readonly PlatformLoginType[]>(`${getDevAPIBase()}/auth/botlogins?returnurl=${from ?? getSiteURLBase()}`, { requestData: getGetAuthParams() });

    return (
        <LoginPlatformsWrapper>
            <Headline3>Login with a method below:</Headline3>
            {
                logins?.map(login => (
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
