import { Loading, WithChildren } from '@theturkeydev/gobble-lib-react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { getSiteURLBase } from '../network/network-helper';

type AuthRouteProps = WithChildren & {
    readonly perm?: string
}
export const AuthRoute = ({ perm, children }: AuthRouteProps) => {
    const { authChecked, authState, permissions } = useAuth();

    const loading = !authChecked;

    if (!loading && !authState) {
        return <Navigate to={`/login?from=${getSiteURLBase()}${location.pathname}`} replace />;
    }

    if (!loading && perm && !permissions.includes(perm)) {
        return <Navigate to='/user/profile' replace />;
    }

    return loading ? <Loading /> : <>{children}</>;
};