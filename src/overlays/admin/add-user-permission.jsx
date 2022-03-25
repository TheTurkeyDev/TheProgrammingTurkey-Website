import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/inputs/input';
import { useOverlay } from '../../contexts/overlay-context';
import { useToast } from '../../contexts/toast-context';
import * as authAPI from '../../network/auth-network';
import { TextToast } from '../../toasts/text-toast';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const InputWrapper = styled.div`
    width: 300px;
`;

export const AddUserPermission = props => {
    const { pushToast } = useToast();
    const { popCurrentOverlay } = useOverlay();

    const [permissionList, setPermissionList] = useState([]);

    const [filter, setFilter] = useState('');

    useEffect(() => {
        authAPI.getAllPermissions(filter).then(json => {
            setPermissionList(
                json.filter(
                    perm => !props.assignedPerms.includes(perm.permission)
                )
            );
        });
    }, []);

    const givePerm = perm => {
        authAPI.giveUserPermission(props.userId, perm).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            popCurrentOverlay();
            props.update();
        });
    };

    return (
        <ContentWrapper>
            <InputWrapper>
                <Input name='filter' label='Filter' value={filter} onChange={e => setFilter(e.target.value)} />
            </InputWrapper>
            <table className='table text-light text-center '>
                <thead>
                    <tr>
                        <th scope='col-auto'></th>
                        <th scope='col-auto'>Permission</th>
                        <th scope='col'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        permissionList.map(perm => (
                            <tr key={perm.permission}>
                                <th scope='row'>
                                    <i className='fas fa-plus clickable' onClick={() => givePerm(perm.permission)} />
                                </th>
                                <td>{perm.permission}</td>
                                <td>{perm.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </ContentWrapper>
    );
};
