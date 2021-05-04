import styled from 'styled-components';
import { AdaptiveLink } from '../../util/adaptive-link';

const ProjectWrapper = styled.div`
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    height: 200px;
    min-height: 200px;
    max-height: 200px;
    position: relative;
    padding: 5px;
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

export const ProjectTile = ({ title, subtitle, link, image }) => {
    return (
        <ProjectWrapper className='clickable anim-slide-in'>
            <AdaptiveLink link={link} style={{ overflow: 'hidden' }}>
                <ProjectImage loading='lazy' src={image} width='190' height='190' />
                <ProjectName>
                    <span>{title}</span>
                    <span>{subtitle}</span>
                </ProjectName>
            </AdaptiveLink>
        </ProjectWrapper>
    )
}