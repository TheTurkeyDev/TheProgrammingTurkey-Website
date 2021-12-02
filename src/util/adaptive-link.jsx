import { ExtLink, IntLink } from '../styles/common-styles';

export const AdaptiveLink = ({ link, children }) => {
    return link.startsWith('http') ?
        <ExtLink href={link} target='_blank' rel='noopener noreferrer'>{children} </ExtLink> :
        <IntLink to={link} > {children} </IntLink>
}