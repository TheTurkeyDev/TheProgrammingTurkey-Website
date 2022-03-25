import styled from 'styled-components';
import { UserConnection } from '../../types/user-connection';

const PlatformLabelWrapper = styled.div`
    font-size: 24px;
`;

const PlatformIcon = styled.i`
    color: ${props => props.color};
`;

const LinkPlatformButton = styled.i`
    width: 100px;
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

    return (
        <div className='row m-0 mb-3'>
            <PlatformLabelWrapper className='col'>
                <PlatformIcon className={`${icon} mr-1`} color={color} />
                <span className='ml-2'>{platform_name}</span>
            </PlatformLabelWrapper>
            <LinkPlatformButton className='col' onClick={() => disabled && onClick()}>
                {disabled ? 'Coming Soon!' : (connected ? 'Connected!' : 'Connect')}
            </LinkPlatformButton>
        </div>
    );
};
