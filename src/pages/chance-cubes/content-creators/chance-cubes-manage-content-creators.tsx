import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../contexts/auth-context';
import { ChanceCubesContentCreatorModal } from '../../../modals/chance-cubes/chance-cubes-content-creator-modal';
import { ContainedButton, Input, Table, TH, useFetch } from 'gobble-lib-react';
import { CCContentCreator } from '../../../types/chance-cubes/chance-cubes-content-creator';
import { ChanceCubesContentCreatorItem } from './chance-cubes-content-creator-item';
import { getParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';

const PageWrapper = styled.div`
    padding: 8px 8px 0 8px;
`;

const InputBard = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 16px;
    margin-bottom: 18px;
    align-items: center;
`;

export const ChanceCubesManageContentCreators = () => {
    const { authChecked } = useAuth();

    const [data] = useFetch<readonly CCContentCreator[]>(`${getDevAPIBase()}/chancecubes/userlist`, {
        skip: !authChecked,
        requestData: getParams
    });
    const [searchText, setSerachText] = useState('');

    const [showModal, setShowModal] = useState(false);


    const userList = [...(data ?? [])].sort((a, b) => a.Name.localeCompare(b.Name));

    return (
        <PageWrapper>
            <InputBard>
                <ContainedButton onClick={() => setShowModal(true)}>New Content Creator</ContainedButton>
                <Input type='text' name='search' label='Search' value={searchText} onChange={e => setSerachText(e.target.value)} />
            </InputBard>
            <Table>
                <thead>
                    <tr>
                        <TH>Actions</TH>
                        <TH>MC UUID</TH>
                        <TH>Name</TH>
                        <TH>Type</TH>
                        <TH>Twitch</TH>
                    </tr>
                </thead>
                <tbody>
                    {userList
                        .filter(
                            user =>
                                user.UUID.includes(searchText) ||
                                user.Name.includes(searchText) ||
                                user.Type.includes(searchText) ||
                                (user.Twitch &&
                                    user.Twitch.includes(searchText))
                        )
                        .map(user => <ChanceCubesContentCreatorItem key={user.UUID} user={user} />)}
                </tbody>
            </Table>
            <ChanceCubesContentCreatorModal show={showModal} requestClose={() => setShowModal(false)} user={undefined} />
        </PageWrapper>
    );
};
