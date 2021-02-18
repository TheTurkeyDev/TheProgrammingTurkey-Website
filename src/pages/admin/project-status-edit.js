import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../../contexts/toast-context';
import * as api from '../../network/network';
import * as authAPI from '../../network/auth-network';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';

export function ProjectStatusEdit(props) {
    const toast = useContext(ToastContext);

    const [projects, setProjects] = useState({});
    const [versions, setVersions] = useState([]);

    const [filter, setFilter] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('-1');
    const [selectedStatus, setSelectedStatus] = useState('-1');
    const [projectsVisible, setProjectsVisible] = useState(false);

    useEffect(() => {
        api.getModStatus().then((json) => {
            let proj = {};
            let vs = [];
            json.forEach((status) => {
                if (!proj[status.mod_name]) proj[status.mod_name] = {};
                proj[status.mod_name][status.version] = status.status;
                if (!vs.includes(status.version)) vs.push(status.version);
            });
            setProjects(proj);
            setVersions(vs);
        });
    }, []);

    const updateProject = () => {
        if (!selectedProject) {
            toast.pushToast(<TextToast text='Missing Project!' />);
            return;
        }
        if (!selectedVersion || selectedVersion === '-1') {
            toast.pushToast(<TextToast text='Missing Version!' />);
            return;
        }
        if (!selectedStatus || selectedStatus === '-1') {
            toast.pushToast(<TextToast text='Missing Status!' />);
            return;
        }

        authAPI
            .setProjectStatus(selectedProject, selectedVersion, selectedStatus)
            .then((json) => {
                toast.pushToast(<TextToast text={json.response} />);
            })
            .catch((e) => {
                toast.pushToast(<TextToast text={e.toString()} />);
            });
    };

    const newVersion = () => {
        //TODO: Overlay w/ custom endpoint
    };

    const setProject = (project) => {
        setSelectedProject(project);
        setProjectsVisible(false);
    };

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    const showProjects = () => {
        if (projectsVisible) {
            setFilter('');
            setProjectsVisible(false);
        } else {
            setFilter('');
            setProjectsVisible(true);
        }
    };

    return (
        <AuthPageWrapper
            history={props.history}
            perm='projects.editstatus'
            parent='/user/profile'
        >
            <div
                className='fluid-container text-center mt-4'
                style={{ height: '80vh' }}
            >
                <div className='row m-0'>
                    <h1 className='col'>Project Status Edit</h1>
                </div>
                <div className='row m-0 mt-2'>
                    <div className='dropdown col ml-auto'></div>
                    <div className='dropdown col-auto'>
                        <button
                            className='dropbtn'
                            id='project_button'
                            onClick={() => showProjects()}
                        >
                            {selectedProject ? selectedProject : 'Project'}
                        </button>
                        <div
                            id='projects'
                            className='dropdown-menu'
                            style={{
                                display: projectsVisible ? 'block' : 'none',
                            }}
                        >
                            <input
                                className='dropdown-item'
                                type='text'
                                placeholder='Search..'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            {Object.keys(projects)
                                .sort((a, b) => a.localeCompare(b))
                                .filter(
                                    (a) =>
                                        a
                                            .toLowerCase()
                                            .indexOf(filter.toLowerCase()) > -1
                                )
                                .map((proj) => {
                                    return (
                                        <span
                                            key={proj}
                                            className='dropdown-item'
                                            onClick={() => {
                                                setProject(proj);
                                            }}
                                        >
                                            {proj}
                                        </span>
                                    );
                                })}
                        </div>
                    </div>
                    <select
                        className='col-auto mr-2'
                        value={selectedVersion}
                        onChange={(e) => {
                            setSelectedVersion(e.target.value);
                        }}
                    >
                        <option value='-1'>Game Version</option>
                        {versions
                            .sort((a, b) =>
                                a.localeCompare(b, undefined, { numeric: true })
                            )
                            .map((v) => {
                                return (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                );
                            })}
                    </select>
                    <select
                        className='col-auto mr-2'
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value='-1'>Project Status</option>
                        <option value='0'>Support - Active</option>
                        <option value='1'>Support - Not Active</option>
                        <option value='2'>In Progress</option>
                        <option value='3'>Not Supported - Planned</option>
                        <option value='4'>Not Supported - Not Planned</option>
                        <option value='5'>Not Supported - Maybe</option>
                    </select>
                    <button
                        className='col-auto mr-2'
                        onClick={() => updateProject()}
                    >
                        Update
                    </button>
                    <button className='col-auto' onClick={() => newVersion()}>
                        AddVersion
                    </button>
                    <div className='col mr-auto'></div>
                </div>
            </div>
        </AuthPageWrapper>
    );
}
