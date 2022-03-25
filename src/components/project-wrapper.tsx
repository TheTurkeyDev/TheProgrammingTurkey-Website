import { Body1, Headline2, Headline4, WithChildren } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { CenterContent } from '../styles/common-styles';
import { ProjectSectionWrapper } from '../styles/project-styles';
import { LinkType } from '../types/link-type';
import { LinkGroup } from './link-group';

const ContentWrapper = styled(CenterContent)`
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

type Video = {
    readonly url: string
    readonly title: string
}

type ProjectWrapperProps = WithChildren & {
    readonly title: string
    readonly subTittle: string
    readonly links: readonly LinkType[]
    readonly videos: readonly Video[]
}

export const ProjectWrapper = ({ title, subTittle, links, videos, children }: ProjectWrapperProps) => {
    return (
        <ContentWrapper>
            <Headline2>{title}</Headline2>
            <Headline4>{subTittle}</Headline4>
            {children}
            <LinkGroup links={links} />
            {
                videos.map(vid => (
                    <ProjectSectionWrapper key={vid.title}>
                        <Headline2>{vid.title}</Headline2>
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
                                <Body1>Coming Soon!</Body1>
                        }

                    </ProjectSectionWrapper>
                ))
            }
        </ContentWrapper>
    );
};
