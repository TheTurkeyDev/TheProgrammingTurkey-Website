import { Body1, ContainedButton, OutlinedButton } from 'gobble-lib-react';
import styled from 'styled-components';
import { UserConnection } from '../../types/user-connection';

const PlatformAccountWrapper = styled.div`
    display: grid;
    grid-template-columns: 32px 1fr max-content;
    gap: 8px;
    align-items: center;
`;

const PlatformIcon = styled.i`
    color: ${props => props.color};
    font-size: 24px;
`;

const PlatformName = styled(Body1)`
    font-size: 24px;
`;

const LinkPlatformButton = styled(OutlinedButton)`
    font-size: 24px;
`;

type UserPlatformAccountProps = {
    readonly disabled?: boolean
    readonly accounts: readonly UserConnection[]
    readonly platform_name: string
    readonly icon: string
    readonly color: string
    readonly onClick: () => void
}
export const UserPlatformAccount = ({ disabled = false, accounts, platform_name, icon, color, onClick }: UserPlatformAccountProps) => {
    const connected = accounts.filter(a => a.platform === platform_name.toUpperCase()).length > 0;
    const hasButton = disabled || connected;

    return (
        <PlatformAccountWrapper>
            <PlatformIcon className={icon} color={color} />
            <PlatformName>{platform_name}</PlatformName>
            {
                hasButton
                    ? <Body1> {disabled ? 'Coming Soon!' : 'Connected!'}</Body1>
                    : (
                        <LinkPlatformButton onClick={onClick}>
                            Connect
                        </LinkPlatformButton>
                    )
            }

        </PlatformAccountWrapper>
    );
};
