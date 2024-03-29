import { Body1, TextHoverCss } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getSiteURLBase } from '../../network/network-helper';

const LoginButtonWrapper = styled(Body1)`
    ${TextHoverCss}
`;

export function LoginButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/login?from=${getSiteURLBase()}${location.pathname}`);
    }

    return (
        <LoginButtonWrapper onClick={handleClick}>
            Login
        </LoginButtonWrapper>
    );
}