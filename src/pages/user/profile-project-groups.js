import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { ProfileProjectLink } from './profile-project-link';

export function ProfileProjectGroup(props) {
    const auth = useContext(AuthContext);

    return (
        <>
            <div className='row m-0 mt-5'>
                <h5 className='col'>{props.groupTitle}</h5>
            </div>
            <hr />
            <div className='row m-0'>
                <div className='w-100' style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
                    {
                        props.apps.map(app => {
                            if (app.permission === '' || auth.permissions.includes(app.permission)) {
                                return <ProfileProjectLink key={app.title} app={app} />;
                            }
                        })
                    }
                </div>
            </div>
        </>
    );
}
