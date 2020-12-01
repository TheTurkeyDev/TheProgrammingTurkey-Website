import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { PageWrapper } from '../base/page-wrapper';

export function Logout(props) {

    const auth = useContext(AuthContext);

    useEffect(() => {
        sessionStorage.setItem("access_token", "");
        sessionStorage.setItem("refresh_token", "");
        auth.logout();
        props.history.push("/");
    }, []);

    return (
        <PageWrapper>
            <h1>Logging Out!</h1>
        </PageWrapper>
    );
}