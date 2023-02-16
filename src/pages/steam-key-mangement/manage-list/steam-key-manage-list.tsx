import { ButtonRow, Headline2, Headline5, Loading, OutlinedButton, useFetch } from 'gobble-lib-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKey } from '../steam-key';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyManageImportKeysModal } from './steam-key-manage-import-keys-modal';
import { SteamKeyManageListItem } from './steam-key-manage-list-item';

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

    const [data, fetching, { setData }] = useFetch<SteamKeyList>(`${getDevAPIBase()}/steamkeys/list/${id}`, {
        requestData: getParams
    });

    const [showImportKeys, setShowImportKeys] = useState(false);

    const getDate = (str: string) => {
        const date = new Date(str ?? '');
        return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    const addKeys = (keys: readonly SteamKey[]) => {
        if (data)
            setData({ ...data, keys: [...data.keys, ...keys] });
    };

    const deleteSteamKey = (key: SteamKey, deleted: readonly string[]) => {
        if (data)
            setData({ ...data, keys: data.keys.filter(k => !deleted?.includes(k.key)) });
    };

    if (fetching)
        return <Loading />;

    return (
        <Wrapper>
            <Headline2>{data?.title} Steam Keys</Headline2>
            <ButtonRow>
                <OutlinedButton onClick={() => navigate('/steamkeys/list')}>Back To Lists</OutlinedButton>
                <OutlinedButton onClick={() => navigate(`/steamkeys/listserverroles/${id}`)}>Manage Server Roles</OutlinedButton>
                <OutlinedButton onClick={() => navigate(`/steamkeys/listclaimgroup/${id}`)}>Manage Claim Groups</OutlinedButton>
                <OutlinedButton onClick={() => setShowImportKeys(true)}>Import Keys</OutlinedButton>
            </ButtonRow>
            <KeysWrapper>
                <Headline5></Headline5>
                <Headline5>Key</Headline5>
                <Headline5>Added At</Headline5>
                <Headline5>Claimed By</Headline5>
                <Headline5>Claimed At</Headline5>
                {
                    [...data?.keys ?? []].sort((a, b) => getDate(b.claimed_at) - getDate(a.claimed_at)).map(key => (
                        <SteamKeyManageListItem key={key.key} steamKey={key} listId={id ?? ''} deleteSteamKey={deleteSteamKey} />
                    ))
                }
            </KeysWrapper>
            <SteamKeyManageImportKeysModal show={showImportKeys} requestClose={() => setShowImportKeys(false)} id={id ?? ''} addKeys={addKeys} />
        </Wrapper>
    );
};