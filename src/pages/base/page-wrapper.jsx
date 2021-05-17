import styled from 'styled-components';

import { TopNav } from './top-nav';

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`
const MainContent = styled.div`
     overflow-y: auto;
     flex-grow: 1;
`;

export const PageWrapper = ({ children }) => {
    return (
        <Wrapper>
            <TopNav />
            <MainContent>
                {children}
            </MainContent>
        </Wrapper>
    );
}
