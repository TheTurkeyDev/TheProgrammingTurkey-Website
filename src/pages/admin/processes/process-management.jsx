import { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as authAPI from '../../../network/auth-network';
import { ProcessEntry } from './process-entry';

const ProcessManagerWrapper = styled.div`
    text-align: center;
`;

const ProcessWrapper = styled.div`
    display: grid;
    grid-template-columns: 75px 300px 350px 1fr;
    gap: 8px;
    margin: 16px 0 0 16px;
`

export const ProcessManagement = () => {
    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        async function getInfo() {
            authAPI.getAllProcessHealth().then(json => {
                setProcesses(json);
            });
        }
        getInfo();
    }, []);

    return (
        <ProcessManagerWrapper>
            <h2>Process Manager</h2>
            <ProcessWrapper>
                <span>Actions</span>
                <span>Process ID</span>
                <span>Last Execution</span>
                <span>Status</span>
                {processes.map(process => <ProcessEntry key={process.process_id} process={process} />)}
            </ProcessWrapper>
        </ProcessManagerWrapper>
    );
}