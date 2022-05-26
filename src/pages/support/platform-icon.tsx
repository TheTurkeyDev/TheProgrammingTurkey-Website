import { BaseTheme, TextHoverCss } from 'gobble-lib-react';
import styled, { ThemeProps } from 'styled-components';

const PlatformLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`;

const PlatformI = styled.i`
    font-size: 64px;
    color: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.on};

    ${TextHoverCss}
`;

type PlatformIcon = {
    readonly href: string
    readonly icon: string
}
export const PlatformIcon = ({ href, icon }: PlatformIcon) => {
    return (
        <PlatformLink href={href}>
            <PlatformI className={icon} />
        </PlatformLink>
    );
};