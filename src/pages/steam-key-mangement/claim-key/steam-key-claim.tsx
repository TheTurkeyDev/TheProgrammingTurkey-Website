import { Anchor, Body1, Headline2, Loading } from 'gobble-lib-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { SteamKeyClaimGroup } from './steam-key-claim-group';
import { SteamKeyClaimItem } from './steam-key-claim-item';

export const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 16px;
`;

export const SteamKeyClaim = () => {
    const { id } = useParams();
    const [data, fetching, { error }] = useFetch<SteamKeyClaimGroup>(`/steamkeys/getKeys/${id}`);

    if (fetching)
        return <Loading />;
    return (
        <Wrapper>
            <Headline2>{data?.name} Keys</Headline2>
            <Body1>
                For help with redeeming codes visit <Anchor href='https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870'>Steam Support</Anchor>
            </Body1>
            {
                error === 'You must login or connect with your Discord Account!' &&
                <Body1>{error}</Body1>
            }
            {
                data?.keyLists?.length === 0 &&
                <Body1>Sorry, there are no keys that you are eligible to claim!</Body1>
            }
            {data?.keyLists?.map(list => <SteamKeyClaimItem key={list.id} list={list} />)}
        </Wrapper>
    );
};