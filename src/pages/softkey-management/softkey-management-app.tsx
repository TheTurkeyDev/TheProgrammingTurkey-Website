import { ContainedButton, Headline2, Icon, Loading, OutlinedButton, Table, TD, TH, useFetch, useQuery } from 'gobble-lib-react';
import { SoftkeyKey } from './softkey-key';
import { getDevAPIBase } from '../../network/network-helper';
import { useNavigate, useParams } from 'react-router-dom';
import { getParams, postParams } from '../../network/auth-network';
import { SoftkeyApp } from './softkey-app';
import { HStack, VStack } from '../../components/stack';
import { TR } from '../../components/table-extended';
import { useState } from 'react';
import { SoftkeyKeyEditModal } from './softkey-key-edit-modal';

export const SoftkeyManagementApp = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [app, loadingApp] = useFetch<SoftkeyApp>(`${getDevAPIBase()}/softkey/${id}`, { requestData: getParams });
    const [keys, loadingKeys, { refetch }] = useFetch<readonly SoftkeyKey[]>(`${getDevAPIBase()}/softkey/${id}/keys`, { requestData: getParams });
    const [addKey, addingKey] = useQuery<SoftkeyKey>(`${getDevAPIBase()}/softkey/${id}/keys`, { requestData: postParams });

    const [editingKey, setEditingKey] = useState<SoftkeyKey>();

    if (loadingApp)
        return <Loading />;

    const onAddKeyClicked = () => {
        addKey().then(key => key && refetch());
    };

    return (
        <VStack>
            <HStack vCenter={true}>
                <OutlinedButton onClick={() => navigate('../apps')}>Back</OutlinedButton>
                <Headline2>{app?.name}</Headline2>
                <ContainedButton onClick={onAddKeyClicked} loading={addingKey}>New Key</ContainedButton>
            </HStack>
            <Table>
                <thead>
                    <tr>
                        <TH>Created</TH>
                        <TH>UUID</TH>
                        <TH>Owner</TH>
                        <TH>Active</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...(keys ?? [])].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(key => (
                            <TR onClick={() => setEditingKey(keys?.find(k => k.uuid === key.uuid))}>
                                <TD>{new Date(key.createdAt).toLocaleString()}</TD>
                                <TD>{key.uuid}</TD>
                                <TD>{key.owner}</TD>
                                <TD>
                                    <Icon className={`fas fa-${key.active ? 'check' : 'times'}`} style={{ color: key.active ? 'green' : 'red' }} />
                                </TD>
                            </TR>
                        ))
                    }
                </tbody>
            </Table>
            {loadingKeys && <Loading />}
            {(editingKey && id) && <SoftkeyKeyEditModal appId={id} softKey={editingKey} show={true} requestClose={() => setEditingKey(undefined)} onSave={() => {
                refetch();
                setEditingKey(undefined);
            }} />}
        </VStack>
    );
};