import styled from 'styled-components';

const BadgeWrapper = styled.a`
    width: 250px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;

    padding: 2px 0 2px 16px;
    color: #ffffff;
    background-color: ${props => props.color};
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    box-shadow: 3px 5px #111314;

    &:hover{
        text-decoration: none;
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

export function LoginPlatform({ platform, color, icon, url }) {
    return (
        <BadgeWrapper color={color} href={url}>
            <PlatformIcon className={icon} />
            <PlatformText>{platform}</PlatformText>
        </BadgeWrapper>
    );
}
