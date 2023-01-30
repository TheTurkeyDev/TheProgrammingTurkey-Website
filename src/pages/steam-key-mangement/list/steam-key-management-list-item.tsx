import { Body1, ConfirmationModal, TextToast, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/icon';
import { deleteParams, useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKeyList } from '../steam-key-list';


type SteamKeyManagementListItemProps = {
    readonly list: SteamKeyList;
    readonly deleteList: () => void
}
export const SteamKeyManagementListItem = ({ list, deleteList }: SteamKeyManagementListItemProps) => {
    const nav = useNavigate();
    const { pushToast } = useToast();
    const [showDelete, setShowDelete] = useState(false);

    const { query } = useQuery<void>(`${getDevAPIBase()}/steamkeys/list`, { requestData: deleteParams });


    const confirmDelete = () => {
        query('', list.id).then(() => {
            deleteList();
            setShowDelete(false);
        }).catch(e => pushToast(<TextToast text={`Failed to delete! ${e.message}`} />));
    };

    return (
        <>
            <Icon name='fas fa-arrow-alt-circle-right' onClick={() => nav(`/steamkeys/list/${list.id}`)} />
            <Body1>{list.title}</Body1>
            <Icon name='fas fa-trash-alt' onClick={() => setShowDelete(true)} />

            <ConfirmationModal
                show={showDelete}
                requestClose={() => setShowDelete(false)}
                text={'Are you sure you want to delete this list?'}
                yesText={'Yes'}
                onYesClick={confirmDelete}
                noText={'No'}
                onNoClick={() => setShowDelete(false)}
            />
        </>
    );
};