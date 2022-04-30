import { TD } from '@theturkeydev/gobble-lib-react';
import { Fragment, useState } from 'react';
import { UserManageModal } from '../../../modals/admin/user-manage-modal';
import { UserAndPlatform } from '../../../types/user-and-platform';
import { UserManagementPlatforms } from './user-management-platforms';

type UserManagementUserItemProps = {
    readonly user: UserAndPlatform
}

export const UserManagementUserItem = ({ user }: UserManagementUserItemProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <tr className='clickable' onClick={() => { setShowModal(true); }}>
                <TD>
                    <UserManagementPlatforms platfroms={user.platforms} />
                </TD>
                <TD>{user.display_name}</TD>
                <TD>{user.user_id}</TD>
            </tr>
            {showModal && <UserManageModal show={showModal} requestClose={() => setShowModal(false)} userId={user.user_id} />}
        </>
    );
};