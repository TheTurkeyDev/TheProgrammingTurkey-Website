import { Body1, Headline3, useFetch } from 'gobble-lib-react';
import styled from 'styled-components';
import { ProcessHealth } from '../../../types/process-health';
import { ProcessEntry } from './process-entry';
import { getDevAPIBase } from '../../../network/network-helper';
import { getParams } from '../../../network/auth-network';

const ProcessManagerWrapper = styled.div`
    text-align: center;
`;

const ProcessWrapper = styled.div`
    display: grid;
    grid-template-columns: 75px 300px 350px 1fr;
    gap: 8px;
    margin: 16px 0 0 16px;
`;

export const ProcessManagement = () => {
    const [processes] = useFetch<readonly ProcessHealth[]>(`${getDevAPIBase()}/admin/processes`, { requestData: getParams });

    return (
        <ProcessManagerWrapper>
            <Headline3>Process Manager</Headline3>
            <ProcessWrapper>
                <Body1>Actions</Body1>
                <Body1>Process ID</Body1>
                <Body1>Last Execution</Body1>
                <Body1>Status</Body1>
                {processes?.map(process => <ProcessEntry key={process.process_id} process={process} />)}
            </ProcessWrapper>
        </ProcessManagerWrapper>
    );
};