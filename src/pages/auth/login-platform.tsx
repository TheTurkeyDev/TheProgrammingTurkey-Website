import { BaseTheme, Elevation, Opacity } from '@theturkeydev/gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';
import { PlatformLoginType } from '../../types/platform-login';

const BadgeWrapper = styled.a`
    width: 200px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;

    padding: 2px 0 2px 16px;
    color: #ffffff;
    background-color: ${({ color }) => color};
    border: 1px solid ${({ theme }: ThemeProps<BaseTheme>) => theme.background.on};
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

export function LoginPlatform({ platform, color, icon, url }: PlatformLoginType) {
    return (
        <BadgeWrapper color={color} href={url}>
            <PlatformIcon className={icon} />
            <PlatformText>{platform}</PlatformText>
        </BadgeWrapper>
    );
}
