import { BrowserRouter as Router } from 'react-router-dom';
import { AuthWrapper } from './contexts/auth-context';
import { GlobalStyles } from './styles/global-styles';
import { Routing } from './router';
import { ThemeContextProvider, Toast } from '@theturkeydev/gobble-lib-react';
import { PageWrapper } from './pages/base/page-wrapper';

export const App = () => {
    return (
        <ThemeContextProvider>
            <GlobalStyles />
            <AuthWrapper>
                <Toast>
                    <Router>
                        <PageWrapper>
                            <Routing />
                        </PageWrapper>
                    </Router>
                </Toast>
            </AuthWrapper>
        </ThemeContextProvider>
    );
};