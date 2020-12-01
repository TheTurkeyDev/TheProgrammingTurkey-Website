import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import { getDevAPIBase } from '../../network/network';
import { PageLoading } from '../base/page-loading';

import { PageWrapper } from "../base/page-wrapper";

export function UserProfile(props) {
    const auth = useContext(AuthContext);


    if (!auth.authChecked) {
        return <PageLoading />;
    }

    if (!auth.authState) {
        props.history.push("/login");
        return <></>;
    }

    console.log(auth.permissions);

    return (
        <PageWrapper>
            <div>
                <h2 className="ml-2 mt-1">Hello {auth.userName}!</h2>
                <div className="fluid-container mx-auto text-center" style={{ maxWidth: "500px" }}>
                    <div className="row m-0">
                        <h5 className="col">Beta Access</h5>
                    </div>
                    <hr />
                    {
                        auth.permissions.includes("streamtimer.dashboard") &&
                        <div className="row m-0">
                            <Link className="col" to="/streamtimer">Stream Timer Dashboard</Link>
                        </div>
                    }
                </div>
            </div>
        </PageWrapper >
    );
}