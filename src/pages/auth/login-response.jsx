import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useOverlay } from '../../contexts/overlay-context';
import * as authAPI from '../../network/auth-network';
import { AccountMergeOverlay } from '../../overlays/auth/account-merge-overlay';
import { IntLink } from '../../styles/common-styles';

export const LoginResponse = (props) => {
    const { platform } = useParams();
    const { pushCurrentOverlay } = useOverlay();

    let code = '';
    let state = {};
    if (props.location && props.location.search) {
        let params = props.location.search.substring(1).split('&');
        params.forEach((element) => {
            let keyVal = element.split('=');
            if (keyVal[0] === 'code')
                code = keyVal[1];
            else if (keyVal[0] === 'state')
                state = JSON.parse(atob(decodeURIComponent(keyVal[1])));
        });
    }

    //TODO: check nonce

    const [message, setMessage] = useState('');
    const { login } = useAuth();

    useEffect(() => {
        async function sendCode() {
            authAPI.loginWithPlatform(platform, code, state.action).then(json => {
                if (json.success) {
                    setMessage('Logged In!');
                    login();
                    location.href = state.redir_url;
                }
                else if (json.already_linked) {
                    pushCurrentOverlay(<AccountMergeOverlay platform={json.platform} username={json.platform_username} redir={state.redir_url} />);
                }
                else {
                    setMessage(json.message);
                }
            });
        }
        sendCode();
    }, []);

    return (
        <>
            <h1>{message}</h1>
            <IntLink to='/'> Click here if you do not get redirected!</IntLink>
        </>
    );
}