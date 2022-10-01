import { Body1, ButtonRow, Headline2, Headline5, Loading, OutlinedButton, TextToast, useToast } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase, getSiteURLBase } from '../../../network/network-helper';
import { SteamKey } from '../steam-key';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyManageImportKeysModal } from './steam-key-manage-import-keys-modal';

const Wrapper = styled.div`
    max-width: 1000px;
    margin-inline: auto;
    display: grid;
    gap: 8px;
`;

const KeysWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto 1fr;
    row-gap: 8px;
    column-gap: 16px;
`;

export const SteamKeyManageList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pushToast } = useToast();

    const { data, fetching, setData } = useFetch<SteamKeyList>(`/steamkeys/list/${id}`);

    const [showImportKeys, setShowImportKeys] = useState(false);

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${getSiteURLBase()}/steamkeys/claim/${id}`);
        pushToast(<TextToast text='URL copied to clipboard!' />);
    };

    const getDate = (str: string) => {
        const date = new Date(str ?? '');
        return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    const addKeys = (keys: readonly SteamKey[]) => {
        if (data)
            setData({ ...data, keys: [...(data.keys ?? []), ...keys] });
    };

    if (fetching)
        return <Loading />;

    return (
        <Wrapper>
            <Headline2>{data?.title} Steam Keys</Headline2>
            <ButtonRow>
                <OutlinedButton onClick={() => navigate('/steamkeys/list')}>Back To Lists</OutlinedButton>
                <OutlinedButton onClick={() => copyToClipBoard()}>Claim Link</OutlinedButton>
                <OutlinedButton onClick={() => setShowImportKeys(true)}>Import Keys</OutlinedButton>
            </ButtonRow>
            <KeysWrapper>
                <Headline5></Headline5>
                <Headline5>Key</Headline5>
                <Headline5>Added At</Headline5>
                <Headline5>Claimed By</Headline5>
                <Headline5>Claimed At</Headline5>
                {
                    [...data?.keys ?? []].sort((a, b) => getDate(b.claimed_at) - getDate(a.claimed_at)).map(key => {
                        return (
                            <Fragment key={key.key}>
                                <div></div>
                                <Body1>{key.key}</Body1>
                                <Body1>{key.added_at}</Body1>
                                <Body1>{key.claimer_name ?? '--'}</Body1>
                                <Body1>{key.claimed_at ?? '--'}</Body1>
                            </Fragment>
                        );
                    })
                }
            </KeysWrapper>
            <SteamKeyManageImportKeysModal show={showImportKeys} requestClose={() => setShowImportKeys(false)} id={id ?? ''} addKeys={addKeys} />
        </Wrapper>
    );
};