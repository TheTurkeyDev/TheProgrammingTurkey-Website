import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth-context';
import { OverlayContext } from '../../contexts/overlay-context';
import * as authAPI from '../../network/auth-network';
import { AccountMergeOverlay } from '../../overlays/auth/account-merge-overlay';
import { PageWrapper } from '../base/page-wrapper';


export function LoginResponse(props) {

    const { platform } = useParams();

    const overlayContext = useContext(OverlayContext);

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
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function sendCode() {
            authAPI.loginWithPlatform(platform, code, state.action).then(json => {
                if (json.success) {
                    setMessage('Logged In!');
                    auth.login();
                    location.href = state.redir_url;
                }
                else if (json.already_linked) {
                    overlayContext.pushCurrentOverlay(<AccountMergeOverlay platform={json.platform} username={json.platform_username} redir={state.redir_url} />);
                }
                else {
                    setMessage(json.message);
                }
            });
        }
        sendCode();
    }, []);

    return (
        <PageWrapper>
            <h1>{message}</h1>
            <Link to='/'> Click here if you do not get redirected!</Link>
        </PageWrapper>
    );
} 