import { Body1, Headline3 } from 'gobble-lib-react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../../network/auth-network';
import { ProcessHealth } from '../../../types/process-health';
import { ProcessEntry } from './process-entry';

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
    const [processes, setProcesses] = useState<readonly ProcessHealth[]>([]);

    useEffect(() => {
        async function getInfo() {
            authAPI.getAllProcessHealth().then(setProcesses);
        }
        getInfo();
    }, []);

    return (
        <ProcessManagerWrapper>
            <Headline3>Process Manager</Headline3>
            <ProcessWrapper>
                <Body1>Actions</Body1>
                <Body1>Process ID</Body1>
                <Body1>Last Execution</Body1>
                <Body1>Status</Body1>
                {processes.map(process => <ProcessEntry key={process.process_id} process={process} />)}
            </ProcessWrapper>
        </ProcessManagerWrapper>
    );
};