import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { PageLoading } from './page-loading';
import { PageWrapper } from './page-wrapper';

export function AuthPageWrapper(props) {
    const auth = useContext(AuthContext);

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