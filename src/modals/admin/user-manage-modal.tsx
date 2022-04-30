import { Body1, ContainedButton, Headline3, Headline5, Input, InputsWrapper, Modal, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../network/auth-network';
import { AddUserPermissionModal } from './add-user-permission-modal';

const ContentWrapper = styled.div`
    display: grid;
    justify-items: center;
    gap: 12px;
`;

const PermissionsWrapper = styled.div`
    width: 500px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px;
`;

type UserManageModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly userId: string
}
export const UserManageModal = ({ show, requestClose, userId }: UserManageModalProps) => {
    const { pushToast } = useToast();

    const [update, setUpdate] = useState(false);
    const [showPermModal, setShowPermModal] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [permissions, setPermissions] = useState<readonly string[]>([]);

    useEffect(() => {
        authAPI.getUserAdmin(userId).then(json => {
            setDisplayName(json.display_name);
            setPermissions(json.permissions);
        });
    }, [update]);

    const removePerm = (perm: string) => {
        authAPI.removeUserPermission(userId, perm).then(json => {
            if (json.message)
                pushToast(<TextToast text={json.message} />);
            setUpdate(old => !old);
        });
    };

    return (
        <>
            <Modal show={show} requestClose={requestClose}>
                <ContentWrapper>
                    <Headline3>Manage User: {displayName}</Headline3>
                    <InputsWrapper>
                        <Input name='userId' label='User Id' value={userId} disabled={true} />
                        <Input name='displayName' label='DisplayName' value={displayName} onChange={e => setDisplayName(e.target.value)} />
                    </InputsWrapper>
                    <Headline5>Permissions</Headline5>
                    <PermissionsWrapper>
                        {
                            permissions.map(perm => {
                                return (
                                    <Fragment key={perm}>
                                        <i className='fas fa-user-minus' onClick={() => removePerm(perm)} />
                                        <Body1>{perm}</Body1>
                                    </Fragment>
                                );
                            })
                        }
                    </PermissionsWrapper>
                    <ContainedButton onClick={() => setShowPermModal(true)}>
                        Add Permission
                    </ContainedButton>
                </ContentWrapper >
            </Modal>
            {
                showPermModal &&
                <AddUserPermissionModal
                    show={showPermModal}
                    requestClose={() => setShowPermModal(false)}
                    userId={userId}
                    assignedPerms={permissions}
                    update={() => setUpdate(old => !old)}
                />
            }
        </>
    );
};