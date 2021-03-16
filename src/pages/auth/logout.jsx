import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { PageWrapper } from '../base/page-wrapper';

export const Logout = (props) => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        //TODO: logout on backend
        auth.logout();
        props.history.push('/');
    }, []);

    return (
        <PageWrapper>
            <h1>Logging Out!</h1>
        </PageWrapper>
    );
}
