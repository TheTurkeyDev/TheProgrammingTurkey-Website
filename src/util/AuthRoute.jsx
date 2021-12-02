import { useContext } from 'react';
import { Route, useHistory } from 'react-router'
import { AuthContext } from '../contexts/auth-context';
import { getSiteURLBase } from '../network/network-helper';
import { PageLoading } from '../pages/base/page-loading';

export const AuthRoute = ({ path, exact = false, component, perm, location }) => {
    const auth = useContext(AuthContext);

    const history = useHistory();

    const loading = !auth.authChecked;

    if (!loading && !auth.authState) {
        history.push(`/login?from=${getSiteURLBase()}${location.pathname}`);
        return <> </>;
    }

    if (!loading && perm && !auth.permissions.includes(perm)) {
        history.push('/user/profile');
        return <> </>;
    }


    return loading ? <PageLoading /> : <Route exact={exact} path={path} component={component} />;

}