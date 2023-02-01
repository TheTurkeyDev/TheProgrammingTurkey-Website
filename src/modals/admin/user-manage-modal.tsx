import { Body1, ContainedButton, Headline3, Headline5, Icon, Input, InputsWrapper, Loading, Modal, TextToast, useToast } from 'gobble-lib-react';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useFetch } from '../../hooks/use-fetch';
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

type UserData = {
    readonly user_id: string,
    readonly display_name: string,
    readonly permissions: readonly string[]
}

type UserManageModalProps = {
    readonly show: boolean
    readonly requestClose: () => void
    readonly userId: string
}
export const UserManageModal = ({ show, requestClose, userId }: UserManageModalProps) => {
    const { pushToast } = useToast();

    const [update, setUpdate] = useState(false);
    const [showPermModal, setShowPermModal] = useState(false);


    const { data, fetching, error, setData } = useFetch<UserData>(`/admin/getuser?user=${userId}`);

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
                <>
                    {fetching && <Loading />}
                    {!fetching && data &&
                        <ContentWrapper>
                            <Headline3>Manage User: {data.display_name}</Headline3>
                            <InputsWrapper>
                                <Input name='userId' label='User Id' value={userId} disabled={true} />
                                <Input name='displayName' label='DisplayName' value={data.display_name} onChange={e => setData({ ...data, display_name: e.target.value })} />
                            </InputsWrapper>
                            <Headline5>Permissions</Headline5>
                            <PermissionsWrapper>
                                {
                                    data.permissions.map(perm => {
                                        return (
                                            <Fragment key={perm}>
                                                <Icon className='fas fa-user-minus' onClick={() => removePerm(perm)} />
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
                    }
                </>
            </Modal>
            {
                showPermModal &&
                <AddUserPermissionModal
                    show={showPermModal}
                    requestClose={() => setShowPermModal(false)}
                    userId={userId}
                    assignedPerms={data?.permissions ?? []}
                    update={() => setUpdate(old => !old)}
                />
            }
        </>
    );
};
