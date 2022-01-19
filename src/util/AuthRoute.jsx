import { Route, useHistory } from 'react-router'
import { useAuth } from '../contexts/auth-context';
import { getSiteURLBase } from '../network/network-helper';
import { PageLoading } from '../pages/base/page-loading';

export const AuthRoute = ({ path, exact = false, component, perm, location }) => {
    const { authState, authChecked, permissions } = useAuth();

    const history = useHistory();

    const loading = !authChecked;

    if (!loading && !authState) {
        history.push(`/login?from=${getSiteURLBase()}${location.pathname}`);
        return <> </>;
    }

    if (!loading && perm && !permissions.includes(perm)) {
        history.push('/user/profile');
        return <> </>;
    }


    return loading ? <PageLoading /> : <Route exact={exact} path={path} component={component} />;

}