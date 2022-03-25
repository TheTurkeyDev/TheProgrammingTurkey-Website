import { Headline3 } from '@theturkeydev/gobble-lib-react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as API from '../../network/network';
import { ProjectGroup } from '../../types/project.group';
import { ProjectTile } from './project-tile';

const ProjectsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 64px;
`;

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

export const Projects = () => {

    const { type } = useParams();
    const [groupedProjects, setGroupedProjects] = useState<{ readonly [key: string]: ProjectGroup }>({});

    useEffect(() => {
        API.getProjects('').then(json => {
            if (json.success)
                setGroupedProjects(json.data);
        });
    }, []);

    return (
        <ProjectsWrapper>
            {/* TODO: Add project group filter */}
            {
                Object.keys(groupedProjects).sort((a, b) => groupedProjects[a].order - groupedProjects[b].order).map(g => (!type || type === g) ?
                    <ProjectGroupWrapper key={g}>
                        <Headline3>
                            <u>{groupedProjects[g].display}</u>
                        </Headline3>
                        <ProjectGroupProjectsWrapper>
                            {[...groupedProjects[g].projects].sort((a, b) => a.order - b.order).map(proj => (
                                <ProjectTile key={proj.id} project={proj} />
                            ))}
                        </ProjectGroupProjectsWrapper>
                    </ProjectGroupWrapper>
                    : <Fragment key={g} />
                )}
        </ProjectsWrapper>
    );
};
