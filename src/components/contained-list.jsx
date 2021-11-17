import styled from 'styled-components';

const ContainedListWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${({ gap }) => gap}px;
    justify-items: center;
`;

const ContainedListHeader = styled.h4`
    text-decoration: underline;
`;

const ContainedListItemWrapper = styled.div`
`;

export const ContainedList = ({ children, title, gap = 4 }) => {
    return (
        <ContainedListWrapper gap={gap}>
            <ContainedListHeader>{title}</ContainedListHeader>
            {children}
        </ContainedListWrapper>
    );
}

export const ContainedListItem = ({ children }) => (
    <ContainedListItemWrapper>{children}</ContainedListItemWrapper>
);