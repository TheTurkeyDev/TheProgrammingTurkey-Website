import { Headline3, ProjectTile, ProjectTilesList } from '@theturkeydev/gobble-lib-react';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as API from '../../network/network';
import { ProjectGroup } from '../../types/project.group';

const ProjectsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 64px;
`;

const ProjectGroupWrapper = styled.div`
    text-align: center;
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
                        <ProjectTilesList>
                            {[...groupedProjects[g].projects].sort((a, b) => a.order - b.order).map(proj => (
                                <ProjectTile key={proj.id} link={proj.link} image={proj.image} title={proj.title} subtitle={proj.subtitle} />
                            ))}
                        </ProjectTilesList>
                    </ProjectGroupWrapper>
                    : <Fragment key={g} />
                )}
        </ProjectsWrapper>
    );
};
