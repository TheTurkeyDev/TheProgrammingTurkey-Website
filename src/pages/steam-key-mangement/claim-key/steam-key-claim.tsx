import { Headline2 } from 'gobble-lib-react';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';

export const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;

export const SteamKeyClaim = () => {

    const { data, fetching } = useFetch('');
    return (
        <Wrapper>
            <Headline2>Claiming Your Key</Headline2>
        </Wrapper>
    );
};