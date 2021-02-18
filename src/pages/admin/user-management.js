import React, { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import * as authAPI from '../../network/auth-network';
import { UserManageOverlay } from '../../overlays/admin/user-manage-overlay';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

export function UserManagement(props) {
    const overlay = useContext(OverlayContext);

    const [userList, setUserList] = useState([]);

    const [updateUsers, setUpdateUsers] = useState(false);
    const [usernameFilter, setUsernameFilter] = useState('');

    useEffect(() => {
        authAPI.getAllUsers(usernameFilter, ['twitch']).then((json) => {
            setUserList(json);
        });
    }, [updateUsers]);

    const editUser = (user) => {
        overlay.pushCurrentOverlay(<UserManageOverlay userId={user.user_id} />);
    };

    return (
        <AuthPageWrapper
            history={props.history}
            perm="admin.usermanage"
            parent="/user/profile"
        >
            <div className="mr-5 ml-5 mt-2">
                <div className="mt-3 fluid-container">
                    <div className="row">
                        <div className="col mr-2">
                            <button
                                onClick={() => setUpdateUsers((old) => !old)}
                            >
                                Update
                            </button>
                        </div>
                        <div className="col">
                            <label>Username</label>
                            <input
                                className="ml-2"
                                type="text"
                                value={usernameFilter}
                                onChange={(e) =>
                                    setUsernameFilter(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <table className="table text-light text-center ">
                    <thead>
                        <tr>
                            <th scope="col-2">Platform</th>
                            <th scope="col-3">Username</th>
                            <th scope="col-3">Platform ID</th>
                            <th scope="col-5">User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {
                            return (
                                <tr
                                    key={`${user.user_id}-${user.platform_id}`}
                                    className="clickable"
                                    onClick={() => editUser(user)}
                                >
                                    <th scope="row">
                                        <i className="fab fa-twitch" />
                                    </th>
                                    <td>{user.platform_display_name}</td>
                                    <td>{user.platform_id}</td>
                                    <td>{user.user_id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthPageWrapper>
    );
}
