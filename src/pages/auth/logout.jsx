import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth-context';

export const Logout = (props) => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        //TODO: logout on backend
        auth.logout();
        props.history.push('/');
    }, []);

    return (
        <h1>Logging Out!</h1>
    );
}
