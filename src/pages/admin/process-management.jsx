import { useState, useEffect } from 'react';
import { AuthPageWrapper } from '../base/auth-page-wrapper';
import * as authAPI from '../../network/auth-network';

export const ProcessManagement = (props) => {

    const [processes, setProcesses] = useState([]);

    const startStopProcess = (process) => {
        authAPI.startStopProcess(process).then(json => {
            console.log(json);
        });
    }

    useEffect(() => {
        async function getInfo() {
            authAPI.getAllProcessHealth().then(json => {
                setProcesses(json);
            });
        }
        getInfo();
    }, []);

    return (
        <AuthPageWrapper history={props.history} perm='admin.manageprocesses' parent='/user/profile'>
            <div className='container'>
                <div className='row mt-2 mb-2 text-center'>
                    <h2 className='col'>Process Manager</h2>
                </div>
                <div className='row'>
                    <div className='col p-0' style={{ maxWidth: '75px' }}>
                        Actions
                    </div>
                    <div className='col-auto p-0' style={{ width: '300px' }}>
                        Process ID
                    </div>
                    <div className='col-auto p-0' style={{ width: '350px' }}>
                        Last Execution
                    </div>
                    <div className='col-1 p-0'>
                        Status
                    </div>
                    <div className='col p-0'>
                    </div>
                </div>
                {
                    processes.map((process) => {
                        return (
                            <div key={process.process_id} className='row mt-1'>
                                <div className='col p-0' style={{ maxWidth: '75px' }}>
                                    <i className={`clickable fas ${process.state == 1 ? 'fa-stop' : 'fa-play'}`} onClick={() => startStopProcess(process)} />
                                </div>
                                <div className='col-auto p-0' style={{ width: '300px' }}>
                                    <span>{process.process_id}</span>
                                </div>
                                <div className='col-auto p-0' style={{ width: '350px' }}>
                                    <span>{new Date(process.last_run + ' UTC').toLocaleString()}</span>
                                </div>
                                <div className='col-1 p-0'>
                                    {process.state}
                                </div>
                                <div className='col p-0'>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </AuthPageWrapper>
    );
}