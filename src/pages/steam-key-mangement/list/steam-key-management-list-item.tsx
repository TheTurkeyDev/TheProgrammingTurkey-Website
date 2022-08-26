import { Body1, ConfirmationModal } from 'gobble-lib-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../../hooks/use-query';
import { getDevAPIBase } from '../../../network/network-helper';
import { SteamKeyList } from '../steam-key-list';


type SteamKeyManagmentListItemProps = {
    readonly list: SteamKeyList;
}
export const SteamKeyManagmentListItem = ({ list }: SteamKeyManagmentListItemProps) => {

    const nav = useNavigate();
    const [showDelete, setShowDelete] = useState(false);

    const { query } = useQuery<void>(`${getDevAPIBase()}/steamkeys/list`, {
        requestData: {
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });


    return (
        <>
            <i className='clickable fas fa-arrow-alt-circle-right' onClick={() => nav(`/steamkeys/list/${list.id}`)} />
            <Body1>{list.title}</Body1>
            <i className='clickable fas fa-trash-alt' onClick={() => setShowDelete(true)} />

            <ConfirmationModal
                show={showDelete}
                requestClose={() => setShowDelete(false)}
                text={'Are you sure you want to delete this list?'}
                yesText={'Yes'}
                onYesClick={() => query(JSON.stringify(list))}
                noText={'No'}
                onNoClick={() => setShowDelete(false)}
            />
        </>
    );
};