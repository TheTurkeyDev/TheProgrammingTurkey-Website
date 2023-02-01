import { TD } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { UserManageModal } from '../../../modals/admin/user-manage-modal';
import { UserAndPlatform } from '../../../types/user-and-platform';
import { UserManagementPlatforms } from './user-management-platforms';

const TR = styled.tr`
    &:hover{
        cursor: pointer;
    }
`;

type UserManagementUserItemProps = {
    readonly user: UserAndPlatform
}

export const UserManagementUserItem = ({ user }: UserManagementUserItemProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <TR onClick={() => { setShowModal(true); }}>
                <TD>
                    <UserManagementPlatforms platfroms={user.platforms} />
                </TD>
                <TD>
                    <img src={user.user_info.avatar} width={32} height={32} />
                    {user.user_info.display_name}
                </TD>
                <TD>{user.user_info.user_id}</TD>
                <TD>{user.user_info.created_at}</TD>
            </TR>
            {showModal && <UserManageModal show={showModal} requestClose={() => setShowModal(false)} userId={user.user_info.user_id} />}
        </>
    );
};