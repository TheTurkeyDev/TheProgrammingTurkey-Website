import { Anchor, Body1 } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { IntLink } from '../styles/common-styles';
import { LinkType } from '../types/link-type';

const ProjectLinksWrapper = styled.div`
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    gap: 8px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
`;
type LinkGroupProps = {
    readonly links: readonly LinkType[]
}
export const LinkGroup = ({ links }: LinkGroupProps) => {
    return (
        <ProjectLinksWrapper>
            {
                links.map(link => (
                    link.href ? (
                        <Body1 key={link.href}>
                            <Anchor href={link.href} openInNewTab={true}>
                                {link.text}
                            </Anchor>
                        </Body1>
                    ) : (
                        <Body1 key={link.to}>
                            <IntLink to={link.to!}>
                                {link.text}
                            </IntLink>
                        </Body1>
                    )
                )).reduce((acc: readonly (JSX.Element | string)[], x) => acc.length === 0 ? [x] : [...acc, '|', x], [])
            }
        </ProjectLinksWrapper >
    );
};