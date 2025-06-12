import { WithChildren } from 'gobble-lib-react';

type HStackProps = WithChildren & {
    readonly vCenter?: boolean
    readonly hCenter?: boolean
    readonly gap?: number
}

export const HStack = ({ children, vCenter = true, hCenter = true, gap = 8 }: HStackProps) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: `${gap}px`,
            alignItems: vCenter ? 'center' : '',
            justifyContent: hCenter ? 'center': ''
        }}>
            {children}
        </div>
    );
};

type VStackProps = WithChildren & {
    readonly hCenter?: boolean
    readonly gap?: number
}

export const VStack = ({ children, hCenter = true, gap = 8 }: VStackProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
            alignItems: hCenter ? 'center' : ''
        }}>
            {children}
        </div>
    );
};