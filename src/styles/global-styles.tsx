import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html, body, #root {
        height: 100vh;
        overflow: hidden;
    }

    body {
        background: ${({ theme }) => theme.background.color};
        color: ${({ theme }) => theme.background.on};
        transition: .25s;
    }
`;