import { Loading } from '@theturkeydev/gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as api from '../../network/network';

const support = [
    { bg: '#7CFC00', text: 'S-A', desc: 'Supported with active development' },
    {
        bg: '#006400',
        text: 'S-NA',
        desc:
            'Supported, but no active development; Will only receive bug fixes if critical.',
    },
    {
        bg: '#FFFF00',
        text: 'IP',
        desc: 'Port currently being developed for this version',
    },
    {
        bg: '#00BFFF',
        text: 'NS-PS',
        desc: 'Not supported, but a port is planned for this version',
    },
    {
        bg: '#8B0000',
        text: 'NS-NP',
        desc: 'Not supported and this version is not planned to recieve a port',
    },
    {
        bg: '#E24C00',
        text: 'NS-M',
        desc:
            'Not supported and this version might recieve a port in the future, but is unknown',
    },
];

const ProjectVersionCell = styled.td`
    background: ${({ color }) => color};
`;

const SupportKey = styled.div`
    display: inline-block;
    background: ${({ color }) => color};
    color: #111111;
    width: 60px;
    margin-top: 8px;
    text-align: center;
`;

type ProjectStatusMap = {
    // eslint-disable-next-line functional/prefer-readonly-type
    [key: string]: { [key: string]: number }
}

export const MCModSupport = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectStatusMap>({});
    const [versions, setVersions] = useState<readonly string[]>([]);

    useEffect(() => {
        api.getModStatus().then(json => {
            const proj: ProjectStatusMap = {};
            // eslint-disable-next-line functional/prefer-readonly-type
            const vs: string[] = [];
            json.forEach(status => {
                if (!proj[status.mod_name])
                    proj[status.mod_name] = {};
                proj[status.mod_name][status.version] = status.status;
                if (!vs.includes(status.version))
                    vs.push(status.version);
            });
            setProjects(proj);
            setVersions(vs);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className='m-2'>
                <table className='table'>
                    <thead>
                        <tr className='text-center text-light'>
                            <th scope='col'>Mod/ Version</th>
                            {
                                [...versions].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).map(v => (
                                    <th key={v} scope='col'>
                                        {v}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(projects).map(mod => {
                                return (
                                    <tr key={mod}>
                                        <th scope='row' className='p-1 text-light'>
                                            {' '}{mod}{' '}
                                        </th>
                                        {
                                            versions.map((v, index) => {
                                                const supportID = projects[mod][v];
                                                return (
                                                    <ProjectVersionCell key={`${mod}-${index}`} className='p-1 text-center' color={support[supportID].bg}>
                                                        {
                                                            support[supportID].text
                                                        }
                                                    </ProjectVersionCell>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                {
                    support.map(status => (
                        <div key={status.text}>
                            <SupportKey color={status.bg}>
                                <span> {status.text}</span>
                            </SupportKey>
                            <span>= {status.desc}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
