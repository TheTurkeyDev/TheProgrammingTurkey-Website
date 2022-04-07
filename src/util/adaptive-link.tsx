import { Anchor, WithChildren } from '@theturkeydev/gobble-lib-react';
import { IntLink } from '../styles/common-styles';

type AdaptiveLinkProps = WithChildren & {
    readonly link: string
}
export const AdaptiveLink = ({ link, children }: AdaptiveLinkProps) => {
    return link.startsWith('http') ?
        <Anchor href={link} openInNewTab={true}>{children} </Anchor> :
        <IntLink to={link} > {children} </IntLink>;
};