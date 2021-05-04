import { startStopProcess } from '../../../network/auth-network';


const toggleProcess = (process) => {
    startStopProcess(process).then(json => {
        console.log(json);
    });
}

export const ProcessEntry = ({ process }) => {
    return (
        <>
            <i className={`clickable fas ${process.state === 'RUNNING' ? 'fa-stop' : 'fa-play'}`} onClick={() => toggleProcess(process)} />
            <span>{process.process_id}</span>
            <span>{new Date(process.last_run + ' UTC').toLocaleString()}</span>
            {process.state}
        </>
    );
}