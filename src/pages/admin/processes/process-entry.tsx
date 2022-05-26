import { Body1 } from 'gobble-lib-react';
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
            <i className={`clickable fas ${process.state === 'RUNNING' ? 'fa-stop' : 'fa-play'}`} onClick={() => toggleProcess(process)} />
            <Body1>{process.process_id}</Body1>
            <Body1>{new Date(process.last_run + ' UTC').toLocaleString()}</Body1>
            {process.state}
        </>
    );
};