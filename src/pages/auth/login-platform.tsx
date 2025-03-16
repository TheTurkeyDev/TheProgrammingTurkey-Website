import { Elevation, Opacity, useQuery, useUrlParams } from 'gobble-lib-react';
import styled from 'styled-components';
import { PlatformLogin } from './platform-login';
import { getDevAPIBase, getSiteURLBase } from '../../network/network-helper';

const BadgeWrapper = styled.a`
    width: 200px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;

    padding: 2px 0 2px 16px;
    color: #ffffff;
    background-color: ${({ color }) => color};
    border: 1px solid ${({ theme }) => theme.background.on};
    border-radius: 5px;
    box-shadow: ${Elevation.medium};

    &:hover{
        text-decoration: none;
        opacity: ${Opacity.HOVER_MEDIUM};
        cursor: pointer;
    }
`;

const PlatformIcon = styled.i`
    color: white;
    align-self: center;
    font-size: 22px;
`;

const PlatformText = styled.span`
    color: white;
    align-self: center;
    font-size: 26px;
`;

type LoginURL = {
    readonly url: string
}

export function LoginPlatform({ platform, color, icon }: PlatformLogin) {
    const params = useUrlParams();

    const [getLoginURL] = useQuery<LoginURL>(`${getDevAPIBase()}/auth/platformlogins`);

    const login = () => {
        getLoginURL(undefined, platform, `returnurl=${params.from ?? getSiteURLBase()}`)
            .then(resp => { if (!!resp) location.href = resp.url; });
    };

    return (
        <BadgeWrapper color={color} onClick={login}>
            <PlatformIcon className={icon} />
            <PlatformText>{platform}</PlatformText>
        </BadgeWrapper>
    );
}
