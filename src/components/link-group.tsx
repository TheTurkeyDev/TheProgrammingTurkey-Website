import { Anchor, Body1, LinkButton } from 'gobble-lib-react';
import styled from 'styled-components';
import { LinkType } from '../types/link-type';
import { JSX } from 'react';

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
                        <Anchor key={link.href} href={link.href} openInNewTab={true}>
                            {link.text}
                        </Anchor>
                    ) : (
                        <LinkButton key={link.to} to={link.to!}>
                            {link.text}
                        </LinkButton>
                    )
                )).reduce((acc: readonly (JSX.Element | string)[], x) => acc.length === 0 ? [x] : [...acc, '|', x], [])
            }
        </ProjectLinksWrapper >
    );
};