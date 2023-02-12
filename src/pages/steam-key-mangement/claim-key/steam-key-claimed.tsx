import { Anchor, Body1, Headline2, Loading } from 'gobble-lib-react';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyClaimItem } from './steam-key-claim-item';

export const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    gap: 16px;
`;

export const SteamKeysClaimed = () => {
    const [data, fetching, { error }] = useFetch<readonly SteamKeyList[]>('/steamkeys/getclaimedkeys');

    return (
        <Wrapper>
            <Headline2>Your Keys</Headline2>
            <Body1>
                For help with redeeming codes visit <Anchor href='https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870'>Steam Support</Anchor>
            </Body1>
            {
                error === 'You must login or connect with your Discord Account!' &&
                <Body1>{error}</Body1>
            }
            {
                fetching && <Loading />
            }
            {data?.map(list => {
                return <SteamKeyClaimItem key={list.id} list={list} />;
            })}
        </Wrapper>
    );
};