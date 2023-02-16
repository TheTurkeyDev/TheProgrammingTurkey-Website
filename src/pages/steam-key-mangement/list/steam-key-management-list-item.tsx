import { Body1, ConfirmationModal, Icon, TextToast, useQuery, useToast } from 'gobble-lib-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteParams } from '../../../network/auth-network';
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

    const [query] = useQuery<void>(`${getDevAPIBase()}/steamkeys/list`, { requestData: deleteParams });


    const confirmDelete = () => {
        query('', list.id).then(() => {
            deleteList();
            setShowDelete(false);
        }).catch(e => pushToast(<TextToast text={`Failed to delete! ${e.message}`} />));
    };

    return (
        <>
            <Icon className='fas fa-arrow-alt-circle-right' onClick={() => nav(`/steamkeys/list/${list.id}`)} />
            <Body1>{list.title}</Body1>
            <Icon className='fas fa-trash-alt' onClick={() => setShowDelete(true)} />
            <ConfirmationModal
                show={showDelete}
                requestClose={() => setShowDelete(false)}
                text='Are you sure you want to delete this list?'
                yesText='Yes'
                onYesClick={confirmDelete}
                noText='No'
                onNoClick={() => setShowDelete(false)}
            />
        </>
    );
};