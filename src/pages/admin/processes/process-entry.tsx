import { Body1 } from 'gobble-lib-react';
import { Icon } from '../../../components/icon';
import { startStopProcess } from '../../../network/auth-network';
import { ProcessHealth } from '../../../types/process-health';


const toggleProcess = (process: ProcessHealth) => {
    startStopProcess(process).then(json => {
        console.log(json);
    });
};

type ProcessEntryProps = {
    readonly process: ProcessHealth
}

export const ProcessEntry = ({ process }: ProcessEntryProps) => {
    return (
        <>
            <Icon name={process.state === 'RUNNING' ? 'fas fa-stop' : 'fas fa-play'} onClick={() => toggleProcess(process)} />
            <Body1>{process.process_id}</Body1>
            <Body1>{new Date(process.last_run + ' UTC').toLocaleString()}</Body1>
            {process.state}
        </>
    );
};