import styled from 'styled-components';

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

export const UserPlatformAccount = (props) => {
    const disabled = props.disabled ? props.disabled : false;
    const connected = props.accounts.filter((a) => a.platform === props.platform_name.toUpperCase()).length > 0;

    return (
        <div className='row m-0 mb-3'>
            <PlatformLabelWrapper className='col'>
                <PlatformIcon className={`${props.icon} mr-1`} color={props.color} />
                <span className='ml-2'>{props.platform_name}</span>
            </PlatformLabelWrapper>
            <LinkPlatformButton className='col' disabled={connected || disabled} onClick={() => props.onClick()}>
                {disabled ? 'Coming Soon!' : (connected ? 'Connected!' : 'Connect')}
            </LinkPlatformButton>
        </div>
    );
}
