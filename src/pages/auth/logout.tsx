import { Headline2 } from '@theturkeydev/gobble-lib-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

export const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //TODO: logout on backend
        logout();
        navigate('/');
    }, []);

    return (
        <Headline2>Logging Out!</Headline2>
    );
};
