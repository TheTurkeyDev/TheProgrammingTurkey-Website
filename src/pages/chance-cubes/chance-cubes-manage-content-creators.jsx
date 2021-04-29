import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import * as api from '../../network/network';

export const ChanceCubesManageContentCreators = () => {
    const auth = useContext(AuthContext);

    const [userList, setUserList] = useState([]);
    const [searchText, setSerachText] = useState('');

    useEffect(() => {
        async function loadUserList() {
            api.getChanceCubeUserList().then((json) => {
                setUserList(json);
            });
        }
        if (auth.authState) loadUserList();
    }, [auth.authChecked]);

    const editUser = (user) => {
        console.log(user);
    };

    return (
        <div className='mr-5 ml-5 mt-2'>
            <div className='mt-3'>
                <label>Search</label>
                <input
                    className='ml-2'
                    type='text'
                    value={searchText}
                    onChange={(e) => setSerachText(e.target.value)}
                />
            </div>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th scope='col-2'>Actions</th>
                        <th scope='col-4'>MC UUID</th>
                        <th scope='col-2'>Name</th>
                        <th scope='col-2'>Type</th>
                        <th scope='col-2'>Twitch</th>
                    </tr>
                </thead>
                <tbody>
                    {userList
                        .filter(
                            (user) =>
                                user.mc_uuid.includes(searchText) ||
                                user.name.includes(searchText) ||
                                user.type.includes(searchText) ||
                                (user.twitch &&
                                    user.twitch.includes(searchText))
                        )
                        .map((user) => {
                            return (
                                <tr key={user.mc_uuid}>
                                    <th scope='row'>
                                        <i
                                            className='fas fa-edit clickable'
                                            onClick={() => editUser(user)}
                                        />
                                    </th>
                                    <td>{user.mc_uuid}</td>
                                    <td>{user.name}</td>
                                    <td>{user.type}</td>
                                    <td>
                                        {user.twitch ? `#${user.twitch}` : ''}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
