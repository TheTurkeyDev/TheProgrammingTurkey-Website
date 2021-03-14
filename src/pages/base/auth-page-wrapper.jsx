import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { PageLoading } from './page-loading';
import { PageWrapper } from './page-wrapper';

export const AuthPageWrapper = (props) => {
    const auth = useContext(AuthContext);

    const [firstRun, setFirstRun] = useState(true);

    const loading = firstRun || !auth.authChecked || props.loading;

    if (firstRun) {
        auth.checkAuth();
        setFirstRun(false);
    }

    if (!loading && !auth.authState) {
        props.history.push('/login');
        return <> </>;
    }

    if (!loading && props.perm && !auth.permissions.includes(props.perm)) {
        props.history.push('/user/profile');
        return <> </>;
    }

    return (
        <PageWrapper parent={props.parent}>
            {loading && <PageLoading />}
            {!loading && props.children}
        </PageWrapper>
    );
}
