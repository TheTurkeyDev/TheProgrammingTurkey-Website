import { Table, WithChildren } from 'gobble-lib-react';

export const HScrollTable = ({ children }: WithChildren) => {
    return (
        <div style={{ overflow: 'auto' }}>
            <Table>
                {children}
            </Table>
        </div>
    );
};