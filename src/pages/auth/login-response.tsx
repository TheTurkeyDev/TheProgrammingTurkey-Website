import { Headline2, LinkButton, useQuery, useUrlParams } from 'gobble-lib-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { AccountMergeModal } from '../../modals/account-merge-modal';
import { getDevAPIBase } from '../../network/network-helper';
import { getPostAuthParams } from '../../network/auth-network';

type LoginResponseType = {
    readonly alreadyLinked: boolean
    readonly platform: string
    readonly platformUsername: string
}

type MergeInfo = {
    readonly platform: string
    readonly username: string
}

export const LoginResponse = () => {
    const { platform } = useParams();
    const { reloadUser } = useAuth();
    
    const { code, state } = useUrlParams();
    const stateParsed = JSON.parse(atob(decodeURIComponent(state)));

    //TODO: check nonce

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [loginWithPlatform] = useQuery<any>(`${getDevAPIBase()}/auth/${platform}/token`, { requestData: getPostAuthParams(), shouldThrow: true });

    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [mergeInfo, setMergeInfo] = useState<MergeInfo | null>(null);


    useEffect(() => {
        if (!platform)
            return;

        loginWithPlatform(undefined, undefined, `code=${code}&action=${stateParsed.action}`).then(json => {

            if (stateParsed.action === 'link') {
                const resp = json as LoginResponseType;
                if (resp.alreadyLinked) {
                    setMergeInfo({ platform: resp.platform, username: resp.platformUsername });
                    setShowModal(true);
                }
                else {
                    setMessage(json.message);
                }
            }
            else {
                setMessage('Logged In!');
                reloadUser();
                location.href = stateParsed.redir_url;
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