import { Headline3, Headline5, Loading, ProjectTile, ProjectTilesList } from 'gobble-lib-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFetch } from '../../hooks/use-fetch';
import { ProjectGroup } from '../../types/project.group';

const ProjectsWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 64px;
`;

const ProjectGroupWrapper = styled.div`
    text-align: center;
`;

type ProjectGroups = { readonly [key: string]: ProjectGroup }

export const Projects = () => {
    const { type } = useParams();

    const group = '';

    const { data, fetching, error } = useFetch<ProjectGroups>(`/projects${!group ? '' : `?group=${group}`}`);

    return (
        <ProjectsWrapper>
            {/* TODO: Add project group filter */}
            {fetching && <Loading />}
            {!!error && <><Headline3>An error has occured!</Headline3><Headline5>{error}</Headline5></>}
            {!!data &&
                Object.keys(data)
                    .sort((a, b) => data[a].order - data[b].order)
                    .filter(g => (!type || type === g))
                    .map(g =>
                        <ProjectGroupWrapper key={g}>
                            <Headline3>
                                <u>{data[g].display}</u>
                            </Headline3>
                            <ProjectTilesList>
                                {[...data[g].projects].sort((a, b) => a.order - b.order).map(proj => (
                                    <ProjectTile key={proj.id} link={proj.link} image={proj.image} title={proj.title} subtitle={proj.subtitle} />
                                ))}
                            </ProjectTilesList>
                        </ProjectGroupWrapper>
                    )
            }
        </ProjectsWrapper>
    );
};
