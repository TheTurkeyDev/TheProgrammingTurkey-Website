import { Body1, ButtonRow, Headline2, Headline5, OutlinedButton, TextToast, useToast } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { deleteParams, postParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase, getSiteURLBase } from '../../../network/network-helper';
import { SteamKeyClaimGroup } from '../claim-key/steam-key-claim-group';
import { SteamKeyClaimGroupMapping } from '../claim-key/steam-key-claim-group-mapping';
import { SteamKeyManagementAddClaimGroupModal } from './steam-key-management-add-claim-group-modal';

const Wrapper = styled.div`
    max-width: 1000px;
    margin-inline: auto;
    display: grid;
    gap: 8px;
`;

const GroupsWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    row-gap: 8px;
    column-gap: 16px;
`;

export const SteamKeyManageClaimGroups = () => {
    const nav = useNavigate();
    const { pushToast } = useToast();
    const { id } = useParams();

    const [data, _, { setData }] = useFetch<readonly SteamKeyClaimGroup[]>('/steamkeys/claimgroups');
    const url = `${getDevAPIBase()}/steamkeys/list/${id}/claimgroup`;
    const [addGroup, addGroupQuerying] = useQuery<SteamKeyClaimGroupMapping>(url, { requestData: postParams });
    const [removeGroup, removeGroupQuerying] = useQuery<SteamKeyClaimGroupMapping>(url, { requestData: deleteParams });


    const [showAddNewClaimGroup, setShowAddNewClaimGroup] = useState(false);

    const copyToClipBoard = (id: string) => {
        navigator.clipboard.writeText(`${getSiteURLBase()}/steamkeys/claim/${id}`);
        pushToast(<TextToast text='URL copied to clipboard!' />);
    };

    const addNewClaimGroup = (claimGroup: SteamKeyClaimGroup) => {
        if (data) {
            setData([
                ...data,
                claimGroup
            ]);
            setShowAddNewClaimGroup(false);
        }
    };

    const toggleClaimGroup = (groupId: string) => {
        const group = data?.find(g => g.id === groupId);
        if (data && group) {
            group.keyLists.find(kl => kl.id === id)
                ? removeGroup('', groupId).then(() => {
                    const changedGroup = data.find(g => g.id === groupId);
                    if (changedGroup) {
                        setData([
                            ...data.filter(g => g.id !== groupId),
                            {
                                ...changedGroup,
                                keyLists: changedGroup.keyLists.filter(kl => kl.id !== id)
                            }
                        ]);
                    }
                })
                : addGroup('', groupId).then(() => {
                    const changedGroup = data.find(g => g.id === groupId);
                    if (changedGroup) {
                        setData([
                            ...data.filter(g => g.id !== groupId),
                            {
                                ...changedGroup,
                                keyLists: [...changedGroup.keyLists, { id: id ?? '', creator: '', title: '', serverRoles: [], keys: [] }]
                            }
                        ]);
                    }
                });
        }
    };

    return (
        <Wrapper>
            <Headline2>Steam Key Claim Groups</Headline2>
            <ButtonRow>
                <OutlinedButton onClick={() => nav(`/steamkeys/list/${id}`)}>Back To List</OutlinedButton>
                <OutlinedButton onClick={() => setShowAddNewClaimGroup(true)}>New Group</OutlinedButton>
            </ButtonRow>
            <GroupsWrapper>
                {
                    [...data ?? []].sort((a, b) => a.name.localeCompare(b.name)).map(group => {
                        return (
                            <Fragment key={group.id}>
                                <OutlinedButton onClick={() => copyToClipBoard(group.id)}>
                                    Copy Link
                                </OutlinedButton>
                                <OutlinedButton disabled={addGroupQuerying || removeGroupQuerying} onClick={() => toggleClaimGroup(group.id)}>
                                    {group.keyLists.find(kl => kl.id === id) ? 'Remove' : 'Add'}
                                </OutlinedButton>
                                <Headline5>{group.name}</Headline5>
                            </Fragment>
                        );
                    })
                }
            </GroupsWrapper>
            {
                showAddNewClaimGroup && <SteamKeyManagementAddClaimGroupModal show={showAddNewClaimGroup} requestClose={() => setShowAddNewClaimGroup(false)} listId={id ?? ''} addNewClaimGroup={addNewClaimGroup} />
            }
        </Wrapper>
    );
};