import { Body1, ButtonRow, ContainedButton, Headline2, Loading, useFetch } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyManagementAddListModal } from './steam-key-management-add-list-modal';
import { SteamKeyManagementListItem } from './steam-key-management-list-item';

const ContentWrapper = styled.div`
    max-width: 1000px;
    margin-inline: auto;
    display: grid;
    gap: 16px;
`;

const ListItems = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
`;

const CenterText = styled.div`
    text-align: center;
`;

export const SteamKeyManagementList = () => {
    const [items, setItems] = useState<readonly SteamKeyList[]>([]);
    const [data, fetching] = useFetch<readonly SteamKeyList[]>(`${getDevAPIBase()}/steamkeys/list`, {
        requestData: getParams
    });
    const [showNewList, setShowNewList] = useState(false);

    useEffect(() => {
        if (data)
            setItems(data);
    }, [data]);

    const addNewList = (list: SteamKeyList) => {
        setItems(old => [...old, list]);
        setShowNewList(false);
    };

    const deleteList = (list: SteamKeyList) => {
        setItems(old => [...old.filter(li => li.id !== list.id)]);
    };

    return (
        <ContentWrapper>
            <Headline2>Steam Key Mangement</Headline2>
            <ButtonRow>
                <ContainedButton onClick={() => setShowNewList(true)}>New List</ContainedButton>
            </ButtonRow>
            {
                fetching && <Loading />
            }
            <ListItems>
                {
                    items?.map(list => <SteamKeyManagementListItem list={list} deleteList={() => deleteList(list)} />)
                }
            </ListItems>
            {
                (items?.length ?? 0) === 0 && <CenterText><Body1>You currently have no lists!</Body1></CenterText>
            }
            {
                showNewList && <SteamKeyManagementAddListModal show={showNewList} requestClose={() => setShowNewList(false)} addNewList={addNewList} />
            }
        </ContentWrapper>
    );
};