import { Headline2, OutlinedButton } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr;
    margin-inline: auto;
    gap: 8px;
    justify-items: center;
`;

export const VideoGenBuilder = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Headline2>Video Builder</Headline2>
            <OutlinedButton onClick={() => navigate('/videogen/codehighlight')}>Code Highlight</OutlinedButton>
            <OutlinedButton onClick={() => navigate('/videogen/scoreboard')}>Scoreboard</OutlinedButton>
        </Wrapper>
    );
};