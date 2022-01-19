import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth-context';

export const Logout = (props) => {
    const { logout } = useAuth();

    useEffect(() => {
        //TODO: logout on backend
        logout();
        props.history.push('/');
    }, []);

    return (
        <h1>Logging Out!</h1>
    );
}
