import { Link } from 'react-router-dom';

export const AdaptiveLink = ({ link, children }) => {
    return link.startsWith('http') ?
        <a href={link} target='_blank' rel='noopener noreferrer'>{children} </a> :
        <Link to={link} > {children} </Link>
}