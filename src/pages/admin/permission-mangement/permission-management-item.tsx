import { ConfirmationModal, TD } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../components/icon';
import { Permission } from '../../../types/permission';

const TDIcons = styled(TD)`
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 8px;
`;

type PermissionManagementItemProps = {
    readonly perm: Permission
    readonly deletePerm: (perm: Permission) => void
}

export const PermissionManagementItem = ({ perm, deletePerm }: PermissionManagementItemProps) => {
    const [showDeletePermModal, setShowDeletePermModal] = useState(false);
    return (
        <tr key={perm.permission}>
            <TDIcons>
                <Icon name='fas fa-edit' />
                <Icon name='fas fa-trash' onClick={() => setShowDeletePermModal(true)} />
            </TDIcons>
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