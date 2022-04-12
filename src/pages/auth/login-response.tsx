import { Headline2, LinkButton, useUrlParams } from '@theturkeydev/gobble-lib-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import * as authAPI from '../../network/auth-network';
import { AccountMergeModal } from '../../modals/account-merge-modal';

type MergeInfo = {
    readonly platform: string
    readonly username: string
}
export const LoginResponse = () => {
    const { platform } = useParams();

    const { code, state } = useUrlParams();
    const stateParsed = JSON.parse(atob(decodeURIComponent(state)));

    //TODO: check nonce

    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mergeInfo, setMergeInfo] = useState<MergeInfo | null>(null);
    const { login } = useAuth();

    useEffect(() => {
        if (!platform)
            return;

        authAPI.loginWithPlatform(platform, code, stateParsed.action).then(json => {
            if (json.success) {
                setMessage('Logged In!');
                login();
                location.href = stateParsed.redir_url;
            }
            else if (json.already_linked) {
                setMergeInfo({ platform: json.platform, username: json.platform_username });
                setShowModal(true);
            }
            else {
                setMessage(json.message);
            }
        });
    }, []);

    return (
        <>
            <Headline2>{message}</Headline2>
            <LinkButton to='/'> Click here if you do not get redirected!</LinkButton>
            <AccountMergeModal platform={mergeInfo?.platform ?? ''} username={mergeInfo?.username ?? ''} redir={stateParsed.redir_url} show={showModal} requestClose={() => setShowModal(false)} />
        </>
    );
};