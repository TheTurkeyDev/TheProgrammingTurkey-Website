import { CenterContent } from '../styles/common-styles';
import { ProjectSectionWrapper } from '../styles/project-styles';
import { LinkGroup } from './link-group';

export const ProjectWrapper = ({ title, subTittle, links, videos, children }) => {
    return (
        <CenterContent>
            <h1>{title}</h1>
            <h3>{subTittle}</h3>
            {children}
            <LinkGroup links={links} />
            {
                videos.map(vid => (
                    <ProjectSectionWrapper key={vid.title}>
                        <h1>{vid.title}</h1>
                        {
                            vid.url ?
                                <iframe
                                    width='560'
                                    height='315'
                                    src={`https://www.youtube.com/embed/${vid.url}`}
                                    frameBorder='0'
                                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                ></iframe> :
                                <span>Coming Soon!</span>
                        }

                    </ProjectSectionWrapper>
                ))
            }
        </CenterContent>
    );
}
