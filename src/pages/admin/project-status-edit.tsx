import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContainedButton, Headline2, Option, Select, TextToast, useToast } from 'gobble-lib-react';
import * as api from '../../network/network';
import * as authAPI from '../../network/auth-network';

const ContentWrapper = styled.div`
    display: grid;
    justify-items: center;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 8px;
    margin-inline: auto;
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
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('-1');
    const [selectedStatus, setSelectedStatus] = useState('-1');

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

    return (
        <ContentWrapper>
            <Headline2>Project Status Edit</Headline2>
            <Wrapper>
                <Select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                    {
                        Object.keys(projects).sort((a, b) => a.localeCompare(b)).map(proj => (
                            <Option key={proj} value={proj}>
                                {proj}
                            </Option>
                        ))}
                </Select>
                <Select value={selectedVersion} onChange={e => setSelectedVersion(e.target.value)}>
                    <Option value='-1'>Game Version</Option>
                    {
                        [...versions].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(v => (
                            <Option key={v} value={v}>
                                {v}
                            </Option>
                        ))}
                </Select>
                <Select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                    <Option value='-1'>Project Status</Option>
                    <Option value='0'>Support - Active</Option>
                    <Option value='1'>Support - Not Active</Option>
                    <Option value='2'>In Progress</Option>
                    <Option value='3'>Not Supported - Planned</Option>
                    <Option value='4'>Not Supported - Not Planned</Option>
                    <Option value='5'>Not Supported - Maybe</Option>
                </Select>
                <ContainedButton onClick={() => updateProject()}>
                    Update
                </ContainedButton>
                <ContainedButton onClick={() => newVersion()}>
                    Add Version
                </ContainedButton>
            </Wrapper>
        </ContentWrapper>
    );
};
