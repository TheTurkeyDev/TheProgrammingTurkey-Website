import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { useOverlay } from '../../contexts/overlay-context';
import * as api from '../../network/network';
import { ChanceCubesContentCreatorOverlay } from '../../overlays/chance-cubes/chance-cubes-content-creator-overlay';
import { userListDeleteUser } from '../../network/chance-cubes-network';
import { ConfirmationOverlay } from '../../overlays/confirmation-overlay';

const PageWrapper = styled.div`
    padding: 8px 8px 0 8px;
`

const InputBard = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 16px;
    margin-bottom: 18px;
`

export const ChanceCubesManageContentCreators = () => {
    const { authState, authChecked } = useAuth();
    const { pushCurrentOverlay, popCurrentOverlay } = useOverlay();

    const [userList, setUserList] = useState([]);
    const [searchText, setSerachText] = useState('');

    useEffect(() => {
        async function loadUserList() {
            api.getChanceCubeUserList().then((json) => {
                setUserList(json);
            });
        }
        if (authState) loadUserList();
    }, [authChecked]);

    const newUser = () => {
        pushCurrentOverlay(<ChanceCubesContentCreatorOverlay />)
    };

    const editUser = (user) => {
        pushCurrentOverlay(<ChanceCubesContentCreatorOverlay user={user} />)
    };

    const deleteUser = (user) => {
        pushCurrentOverlay(<ConfirmationOverlay text={'Are you sure you want to delete this user?'} options={
            [
                { text: 'Yes', callback: () => { popCurrentOverlay(); userListDeleteUser(user); } },
                { text: 'No', callback: () => popCurrentOverlay() }
            ]
        } />);
    }

    return (
        <PageWrapper>
            <InputBard>
                <button onClick={() => newUser()}>New Content Creator</button>
                <div>
                    <label>Search</label>
                    <input
                        type='text'
                        value={searchText}
                        onChange={(e) => setSerachText(e.target.value)}
                    />
                </div>
            </InputBard>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th>Actions</th>
                        <th>MC UUID</th>
                        <th>Name</th>
                        <th >Type</th>
                        <th>Twitch</th>
                    </tr>
                </thead>
                <tbody>
                    {userList
                        .filter(
                            (user) =>
                                user.UUID.includes(searchText) ||
                                user.Name.includes(searchText) ||
                                user.Type.includes(searchText) ||
                                (user.Twitch &&
                                    user.Twitch.includes(searchText))
                        )
                        .map((user) => {
                            return (
                                <tr key={user.UUID}>
                                    <td>
                                        <i
                                            className='fas fa-edit clickable'
                                            onClick={() => editUser(user)}
                                        />
                                        <i
                                            className='fas fa-trash clickable'
                                            onClick={() => deleteUser(user)}
                                        />
                                    </td>
                                    <td>{user.UUID}</td>
                                    <td>{user.Name}</td>
                                    <td>{user.Type}</td>
                                    <td>
                                        {user.Twitch ? `#${user.Twitch}` : ''}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </PageWrapper>
    );
}
