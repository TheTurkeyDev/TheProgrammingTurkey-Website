import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import * as API from '../../network/network';
import { ProjectTile } from './project-tile';

const ProjectsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 64px;
`

const ProjectGroupWrapper = styled.div`
    text-align: center;
`;

const ProjectGroupProjectsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
`;

export const Projects = ({ location }) => {

    const [group, setGroup] = useState(undefined);
    const [groupedProjects, setGroupedProjects] = useState({});

    useEffect(() => {
        let found = false;
        if (location && location.search) {
            let params = location.search.substring(1).split('&');
            params.forEach(element => {
                let keyVal = element.split('=');
                if (keyVal[0] === 'type') {
                    setGroup(decodeURI(keyVal[1]));
                    found = true;
                }
            });
        }

        if (!found)
            setGroup('');

        API.getProjects('').then(json => {
            if (json.success)
                setGroupedProjects(json.data);
        })
    }, []);

    return (
        <ProjectsWrapper>
            {/* TODO: Add project group filter */}
            {
                Object.keys(groupedProjects).sort((a, b) => groupedProjects[a].order - groupedProjects[b].order).map(g =>
                    (group === '' || group === g) ?
                        <ProjectGroupWrapper key={g}>
                            <h1>
                                <u>{groupedProjects[g].display}</u>
                            </h1>
                            <ProjectGroupProjectsWrapper>
                                {groupedProjects[g].projects.sort((a, b) => a.order - b.order).map(proj => (
                                    <ProjectTile key={proj.id} title={proj.title} subtitle={proj.subtitle} link={proj.link} image={proj.image} />
                                ))}
                            </ProjectGroupProjectsWrapper>
                        </ProjectGroupWrapper>
                        : <Fragment key={g} />
                )}
        </ProjectsWrapper>
    );
}
