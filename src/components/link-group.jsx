import styled from 'styled-components'
import { ExtLink, IntLink } from '../styles/common-styles'

const ProjectLinksWrapper = styled.div`
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    gap: 8px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
`

export const LinkGroup = ({ links }) => {
    return (
        <ProjectLinksWrapper>
            {
                links.map(link => (
                    link.href ? (
                        <ExtLink key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
                            {link.text}
                        </ExtLink>
                    ) : (
                        <IntLink key={link.to} to={link.to}>
                            {link.text}
                        </IntLink>
                    )
                )).reduce((acc, x) => acc === null ? [x] : [acc, '|', x], null)
            }
        </ProjectLinksWrapper>
    )
}