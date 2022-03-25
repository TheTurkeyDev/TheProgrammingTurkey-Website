import { Headline6, Subtitle2 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { Project } from '../../types/project';
import { AdaptiveLink } from '../../util/adaptive-link';

const ProjectWrapper = styled.div`
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    position: relative;
`;

const ProjectName = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition-duration: 0.5s;
    color: #ffffff;
    ${ProjectWrapper}:hover & {
        opacity: 1;
        bottom: 40px;
    }
    
    display: grid;
    grid-template-rows: auto auto;
`;

const ProjectImage = styled.img`
    opacity: 1;
    transition-duration: 0.5s;
    object-fit: contain;
    ${ProjectWrapper}:hover & {
        opacity: 0.2;
    }
`;

type ProjectTileProps = {
    readonly project: Project
}

export const ProjectTile = ({ project }: ProjectTileProps) => {
    return (
        <ProjectWrapper className='clickable anim-slide-in'>
            <AdaptiveLink link={project.link}>
                <ProjectImage loading='lazy' src={project.image} width='190' height='190' />
                <ProjectName>
                    <Headline6>{project.title}</Headline6>
                    <Subtitle2>{project.subtitle}</Subtitle2>
                </ProjectName>
            </AdaptiveLink>
        </ProjectWrapper>
    );
};