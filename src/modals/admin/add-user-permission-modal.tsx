import { Input, Modal, Table, TD, TextToast, TH, useToast } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../network/auth-network';
import { Permission } from '../../types/permission';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const InputWrapper = styled.div`
    width: 300px;
`;

type AddUserPermissionModalType = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly assignedPerms: readonly string[]
    readonly userId: string
    readonly update: () => void
}

export const AddUserPermissionModal = ({ show, requestClose, assignedPerms, userId, update }: AddUserPermissionModalType) => {
    const { pushToast } = useToast();

    const [permissionList, setPermissionList] = useState<readonly Permission[]>([]);

    const [filter, setFilter] = useState('');

    useEffect(() => {
        authAPI.getAllPermissions(filter).then(json => {
            setPermissionList(
                [...json].filter(
                    perm => !assignedPerms.includes(perm.permission)
                )
            );
        });
    }, []);

    const givePerm = (perm: string) => {
        authAPI.giveUserPermission(userId, perm).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            update();
            requestClose();
        });
    };

    return (
        <Modal show={show} requestClose={requestClose}>
            <ContentWrapper>
                <InputWrapper>
                    <Input name='filter' label='Filter' value={filter} onChange={e => setFilter(e.target.value)} />
                </InputWrapper>
                <Table>
                    <thead>
                        <tr>
                            <TH></TH>
                            <TH>Permission</TH>
                            <TH scope='col'>Description</TH>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            permissionList.map(perm => (
                                <tr key={perm.permission}>
                                    <TD>
                                        <i className='fas fa-plus clickable' onClick={() => givePerm(perm.permission)} />
                                    </TD>
                                    <TD>{perm.permission}</TD>
                                    <TD>{perm.description}</TD>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </ContentWrapper>
        </Modal>
    );
};
