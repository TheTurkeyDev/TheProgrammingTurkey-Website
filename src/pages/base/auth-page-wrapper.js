import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { PageLoading } from './page-loading';
import { PageWrapper } from './page-wrapper';

export function AuthPageWrapper(props) {
    const auth = useContext(AuthContext);

    const [firstRun, setFirstRun] = useState(true);

    if (firstRun) {
        auth.checkAuth();
        setFirstRun(false);
        return <PageLoading />;
    }

    if (!auth.authChecked) {
        return <PageLoading />;
    }

    if (!auth.authState) {
        props.history.push("/login");
        return <> </>
    }

    if (props.perm && !auth.permissions.includes(props.perm)) {
        props.history.push("/user/profile");
        return <> </>
    }

    return (
        <PageWrapper>
            {props.children}
        </PageWrapper>
    );
}