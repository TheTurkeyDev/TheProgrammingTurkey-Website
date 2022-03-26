import { ConfirmationModal, TD } from '@theturkeydev/gobble-lib-react';
import { useState } from 'react';
import { Persmission } from '../../../types/permission';

type PermissionManagementItemProps = {
    readonly perm: Persmission
    readonly deletePerm: (perm: Persmission) => void
}

export const PermissionManagementItem = ({ perm, deletePerm }: PermissionManagementItemProps) => {
    const [showDeletePermModal, setShowDeletePermModal] = useState(false);
    return (
        <tr key={perm.permission}>
            <TD>
                <i className='fas fa-edit clickable mr-2' />
                <i className='fas fa-trash clickable' onClick={() => setShowDeletePermModal(true)} />
            </TD>
            <TD>{perm.permission}</TD>
            <TD>{perm.description}</TD>
            <ConfirmationModal
                show={showDeletePermModal}
                text={`Are you sure you want to delete the permission ${perm.permission}?`}
                yesText='Yes'
                onYesClick={() => {
                    setShowDeletePermModal(false);
                    deletePerm(perm);
                }}
                noText='No'
                onNoClick={() => setShowDeletePermModal(false)}
            />
        </tr>
    );
};