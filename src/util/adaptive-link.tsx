import { Anchor, LinkButton, WithChildren } from '@theturkeydev/gobble-lib-react';

type AdaptiveLinkProps = WithChildren & {
    readonly link: string
}
export const AdaptiveLink = ({ link, children }: AdaptiveLinkProps) => {
    return link.startsWith('http') ?
        <Anchor href={link} openInNewTab={true}>{children} </Anchor> :
        <LinkButton to={link} > {children} </LinkButton>;
};