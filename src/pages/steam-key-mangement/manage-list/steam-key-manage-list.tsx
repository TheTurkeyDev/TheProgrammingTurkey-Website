import { Body1, ButtonRow, Headline2, Headline5, Loading, OutlinedButton, Subtitle1 } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
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

    const { data, fetching } = useFetch<SteamKeyList>(`/steamkeys/list/${id}`);
    const { query } = useQuery<void>(`${getDevAPIBase()}/steamkeys/list/${id}/addkeys`, {
        requestData: postParams
    });

    const [showImportKeys, setShowImportKeys] = useState(false);

    const importKeys = (keys: string) => {
        const keysArr = keys.split('\n');
        query(JSON.stringify(keysArr)).then(() => {
            setShowImportKeys(false);
        });
    };

    const getDate = (str: string) => {
        const date = new Date(str ?? '');
        return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    if (fetching)
        return <Loading />;

    return (
        <Wrapper>
            <Headline2>{data?.title} Steam Keys</Headline2>
            <ButtonRow>
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
            <SteamKeyManageImportKeysModal show={showImportKeys} requestClose={() => setShowImportKeys(true)} importKeys={importKeys} />
        </Wrapper>
    );
};