import { BaseTheme } from '@theturkeydev/gobble-lib-react';
import { createGlobalStyle, ThemeProps } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html, body, #root {
        height: 100vh;
    }

    #root {
        overflow: hidden;
    }

    body {
        background: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.color};
        color: ${({ theme }: ThemeProps<BaseTheme>) => theme.background.on};
    }
`;