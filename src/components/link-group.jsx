import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
                        <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
                            {link.text}
                        </a>
                    ) : (
                        <Link key={link.href} to={link.to}>
                            {link.text}
                        </Link>
                    )
                )).reduce((acc, x) => acc === null ? [x] : [acc, '|', x], null)
            }
        </ProjectLinksWrapper>
    )
}