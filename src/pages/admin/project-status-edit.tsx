import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainedButton, Select, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import * as api from '../../network/network';
import * as authAPI from '../../network/auth-network';


const ContentWrapper = styled.div`
    height: 80vh;
`;

type MappedProjects = {
    readonly [modName: string]: {
        readonly [version: string]: number
    }
}

export const ProjectStatusEdit = () => {
    const { pushToast } = useToast();

    const [projects, setProjects] = useState({});
    const [versions, setVersions] = useState<readonly string[]>([]);

    const [filter, setFilter] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('-1');
    const [selectedStatus, setSelectedStatus] = useState('-1');
    const [projectsVisible, setProjectsVisible] = useState(false);

    useEffect(() => {
        api.getModStatus().then(json => {
            const vs = json.reduce((prev: readonly string[], status) => {
                if (prev.includes(status.version))
                    return [...prev];
                return [...prev, status.version];
            }, []);
            setVersions(vs);

            const proj = json.reduce((prev: MappedProjects, status) => {
                return { ...prev, [status.mod_name]: { ...(prev[status.mod_name] ?? {}), [status.version]: status.status } };
            }, {});
            setProjects(proj);
        });
    }, []);

    const updateProject = () => {
        if (!selectedProject) {
            pushToast(<TextToast text='Missing Project!' />);
            return;
        }
        if (!selectedVersion || selectedVersion === '-1') {
            pushToast(<TextToast text='Missing Version!' />);
            return;
        }
        if (!selectedStatus || selectedStatus === '-1') {
            pushToast(<TextToast text='Missing Status!' />);
            return;
        }

        authAPI
            .setProjectStatus(selectedProject, selectedVersion, selectedStatus)
            .then(json => {
                pushToast(<TextToast text={json.response} />);
            })
            .catch(e => {
                pushToast(<TextToast text={e.toString()} />);
            });
    };

    const newVersion = () => {
        //TODO: Overlay w/ custom endpoint
    };

    const setProject = (project: string) => {
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
        <ContentWrapper className='fluid-container text-center mt-4'>
            <div className='row m-0'>
                <h1 className='col'>Project Status Edit</h1>
            </div>
            <div className='row m-0 mt-2'>
                <div className='dropdown col ml-auto'></div>
                <div className='dropdown col-auto'>
                    <button className='dropbtn' id='project_button' onClick={() => showProjects()}>
                        {selectedProject ? selectedProject : 'Project'}
                    </button>
                    <div id='projects' className='dropdown-menu' style={{ display: projectsVisible ? 'block' : 'none' }}>
                        <input className='dropdown-item' type='text' placeholder='Search..' value={filter} onChange={e => setFilter(e.target.value)} />
                        {
                            Object.keys(projects)
                                .sort((a, b) => a.localeCompare(b))
                                .filter(a => a.toLowerCase().indexOf(filter.toLowerCase()) > -1)
                                .map(proj => (
                                    <span key={proj} className='dropdown-item' onClick={() => setProject(proj)}>
                                        {proj}
                                    </span>
                                ))
                        }
                    </div>
                </div>
                <Select value={selectedVersion} onChange={e => setSelectedVersion(e.target.value)}>
                    <option value='-1'>Game Version</option>
                    {
                        [...versions].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(v => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                </Select>
                <Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                    <option value='-1'>Project Status</option>
                    <option value='0'>Support - Active</option>
                    <option value='1'>Support - Not Active</option>
                    <option value='2'>In Progress</option>
                    <option value='3'>Not Supported - Planned</option>
                    <option value='4'>Not Supported - Not Planned</option>
                    <option value='5'>Not Supported - Maybe</option>
                </Select>
                <ContainedButton onClick={() => updateProject()}>
                    Update
                </ContainedButton>
                <ContainedButton onClick={() => newVersion()}>
                    AddVersion
                </ContainedButton>
            </div>
        </ContentWrapper>
    );
};
