import { TextHoverCss } from 'gobble-lib-react';
import styled from 'styled-components';

const PlatformLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`;

const PlatformI = styled.i`
    font-size: 64px;
    color: ${({ theme }) => theme.background.on};

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