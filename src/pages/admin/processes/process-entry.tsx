import { Body1, Icon, useQuery } from 'gobble-lib-react';
import { ProcessHealth } from '../../../types/process-health';
import { getDevAPIBase } from '../../../network/network-helper';
import { postParams } from '../../../network/auth-network';

type ProcessEntryProps = {
    readonly process: ProcessHealth
}

export const ProcessEntry = ({ process }: ProcessEntryProps) => {

    const [startStopProcess] = useQuery(`${getDevAPIBase()}/admin/processes/${process.process_id}`, { requestData: postParams });

    const toggleProcess = () => startStopProcess(undefined, process.state === 'RUNNING' ? 'stop' : 'start');

    return (
        <>
            <Icon className={process.state === 'RUNNING' ? 'fas fa-stop' : 'fas fa-play'} onClick={toggleProcess} />
            <Body1>{process.process_id}</Body1>
            <Body1>{new Date(process.last_run + ' UTC').toLocaleString()}</Body1>
            {process.state}
        </>
    );
};