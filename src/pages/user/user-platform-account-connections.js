import React, { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import * as api from '../../network/auth-network';
import { getDiscordURL, getGithubURL, getPatreonURL, getTwitchURL } from '../auth/login';
import { ConnectMinecraftAccountOverlay } from '../../overlays/auth/connect-minecraft-account-overlay';
import { AuthPageWrapper } from '../../pages/base/auth-page-wrapper';
import { UserPlatformAccount } from './user-platform-account';

export function UserPlatformAccountConnections(props) {
    const [accounts, setAccounts] = useState([]);

    const overlay = useContext(OverlayContext);

    useEffect(() => {
        api.getUserConnectedAccounts().then((json) => {
            setAccounts(json);
        });
    }, []);

    const connectMinecraft = () => {
        overlay.pushCurrentOverlay(<ConnectMinecraftAccountOverlay />);
    };

    const login = (url) => {
        location.href = url('link', location.href);
    };

    return (
        <AuthPageWrapper history={props.history}>
            <div
                className="fluid-container mx-auto"
                style={{ maxWidth: '500px', minWidth: '500px' }}
            >
                <div className="row m-0 text-center">
                    <h2 className="col mt-1">Connect Accounts!</h2>
                </div>
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="Twitch"
                    icon="fab fa-twitch"
                    color="#9146FF"
                    onClick={() => login(getTwitchURL)}
                />
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="Youtube"
                    icon="fab fa-youtube"
                    color="#c00"
                    onClick={() => { }}
                    disabled={true}
                />
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="Minecraft"
                    icon="fas fa-cube"
                    color="#058205"
                    onClick={connectMinecraft}
                    disabled={true}
                />
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="GitHub"
                    icon="fab fa-github"
                    color="#ffffff"
                    onClick={() => login(getGithubURL)}
                />
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="Patreon"
                    icon="fab fa-patreon"
                    color="#f96854"
                    onClick={() => login(getPatreonURL)}
                />
                <UserPlatformAccount
                    accounts={accounts}
                    platform_name="Discord"
                    icon="fab fa-discord"
                    color="#7289DA"
                    onClick={() => login(getDiscordURL)}
                />
            </div>
        </AuthPageWrapper>
    );
}
