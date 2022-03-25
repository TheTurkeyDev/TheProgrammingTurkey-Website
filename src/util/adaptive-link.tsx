import { WithChildren } from '@theturkeydev/gobble-lib-react';
import { ExtLink, IntLink } from '../styles/common-styles';

type AdaptiveLinkProps = WithChildren & {
    readonly link: string
}
export const AdaptiveLink = ({ link, children }: AdaptiveLinkProps) => {
    return link.startsWith('http') ?
        <ExtLink href={link} target='_blank' rel='noopener noreferrer'>{children} </ExtLink> :
        <IntLink to={link} > {children} </IntLink>;
};