import { Body1, ButtonRow, Headline2, Headline5, Loading, OutlinedButton } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../../hooks/use-fetch';
import { SteamKeyList } from '../steam-key-list';
import { SteamKeyServerRole } from '../steam-key-server-role';
import { SteamKeyManagementAddSeverRoleModal } from './steam-key-management-add-server-role-modal';

const Wrapper = styled.div`
    max-width: 1000px;
    margin-inline: auto;
    display: grid;
    gap: 8px;
`;

const RolesWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    row-gap: 8px;
    column-gap: 16px;
`;

export const SteamKeyListServerRoles = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const [listData, fetching, { setData }] = useFetch<SteamKeyList>(`/steamkeys/list/${id}`);

    const [showAddServerRoleModal, setShowAddServerRoleModal] = useState(false);

    const addNewServerRole = (serverRole: SteamKeyServerRole) => {
        if (listData) {
            setData({
                ...listData,
                serverRoles: [
                    ...listData.serverRoles,
                    serverRole
                ]
            });
            setShowAddServerRoleModal(false);
        }
    };

    if (fetching)
        return <Loading />;

    return (
        <Wrapper>
            <Headline2>{listData?.title} Discord Servers & Roles</Headline2>
            <ButtonRow>
                <OutlinedButton onClick={() => nav(`/steamkeys/list/${id}`)}>Back To List</OutlinedButton>
                <OutlinedButton onClick={() => setShowAddServerRoleModal(true)}>Add Server Role</OutlinedButton>
            </ButtonRow>
            <RolesWrapper>
                <Headline5></Headline5>
                <Headline5>Discord Server Id</Headline5>
                <Headline5>Discord Role Id</Headline5>
                {
                    [...listData?.serverRoles ?? []].map((key, i) => {
                        return (
                            <Fragment key={i}>
                                <div></div>
                                <Body1>{key.discordServer}</Body1>
                                <Body1>{key.discordRole}</Body1>
                            </Fragment>
                        );
                    })
                }
            </RolesWrapper>
            {
                showAddServerRoleModal && <SteamKeyManagementAddSeverRoleModal show={showAddServerRoleModal} requestClose={() => setShowAddServerRoleModal(false)} listId={id ?? ''} addNewServerRole={addNewServerRole} />
            }
        </Wrapper>
    );
};