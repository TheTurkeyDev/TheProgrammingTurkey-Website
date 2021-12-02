import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getSiteURLBase } from '../../network/network-helper';

const LoginButtonWrapper = styled.span`
    color: ${props => props.theme.color.textSecondary};
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
`

export function LoginButton() {
    const history = useHistory();

    function handleClick() {
        history.push(`/login?from=${getSiteURLBase()}${location.pathname}`);
    }

    return (
        <LoginButtonWrapper onClick={handleClick}>
            Login
        </LoginButtonWrapper>
    );
}