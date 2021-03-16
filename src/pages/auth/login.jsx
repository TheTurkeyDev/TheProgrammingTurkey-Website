import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import * as authAPI from '../../network/auth-network';
import { PageWrapper } from '../base/page-wrapper';
import { LoginPlatform } from './login-platform';

export const Login = (props) => {
    const auth = useContext(AuthContext);

    const [logins, setLogins] = useState([]);

    useEffect(() => {
        authAPI.getLogins().then(logins => setLogins(logins));
    }, []);

    return (
        <PageWrapper>
            {auth.authState && props.history.push('/')}
            {!auth.authState && (
                <div className='text-center fluid container'>
                    <h2 className='mb-4'>Login with a method below:</h2>
                    {
                        logins.map(login => (
                            <LoginPlatform
                                key={login.platform}
                                url={login.url}
                                platform={login.platform}
                                color={login.color}
                                icon={login.icon}
                            />
                        ))
                    }
                </div>
            )}
        </PageWrapper>
    );
}
