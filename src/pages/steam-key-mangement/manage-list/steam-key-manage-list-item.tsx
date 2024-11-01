import { Body1, ConfirmationModal, Icon, useQuery } from 'gobble-lib-react';
import { useState } from 'react';
import { deleteParams } from '../../../network/auth-network';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKey } from '../steam-key';

type SteamKeyManageListItemProps = {
    readonly listId: string
    readonly steamKey: SteamKey
    readonly deleteSteamKey: (key: SteamKey, deleted: readonly string[]) => void
}

export const SteamKeyManageListItem = ({ steamKey, listId, deleteSteamKey }: SteamKeyManageListItemProps) => {

    const [deleteKey] = useQuery<readonly string[]>(`${getDevAPIBase()}/steamkeys/list/${listId}/keys`, {
        requestData: deleteParams
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const confirmDeleteSteamKey = () => {
        deleteKey(undefined, steamKey.key).then(deleted => {
            deleteSteamKey(steamKey, deleted ?? []);
            setShowDeleteConfirm(false);
        });
    };

    return (
        <>
            <div>
                <Icon className='fas fa-trash' onClick={() => setShowDeleteConfirm(true)} />
            </div>
            <Body1>{steamKey.key}</Body1>
            <Body1>{steamKey.added_at}</Body1>
            <Body1>{steamKey.claimer_name ?? '--'}</Body1>
            <Body1>{steamKey.claimed_at ?? '--'}</Body1>
            <ConfirmationModal
                show={showDeleteConfirm}
                text={`Are you sure you want to delete steam key '${steamKey.key}' claimed by '${steamKey.claimer_name ?? 'None'}'`}
                yesText='Yes'
                onYesClick={() => confirmDeleteSteamKey()}
                noText='No'
                onNoClick={() => setShowDeleteConfirm(false)} />
        </>
    );
};