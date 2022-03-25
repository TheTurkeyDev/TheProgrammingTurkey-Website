import { Headline5, WithChildren } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';

type ContainedListWrapperProps = {
    readonly gap: number
}
const ContainedListWrapper = styled.div<ContainedListWrapperProps>`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ gap }) => gap}px;
    justify-items: center;
`;

const ContainedListHeader = styled(Headline5)`
    text-decoration: underline;
`;

const ContainedListItemWrapper = styled.div`
`;

type ContainedListProps = WithChildren & {
    readonly title: string
    readonly gap?: number
}
export const ContainedList = ({ children, title, gap = 4 }: ContainedListProps) => {
    return (
        <ContainedListWrapper gap={gap}>
            <ContainedListHeader>{title}</ContainedListHeader>
            {children}
        </ContainedListWrapper>
    );
};

export const ContainedListItem = ({ children }: WithChildren) => (
    <ContainedListItemWrapper>{children}</ContainedListItemWrapper>
);