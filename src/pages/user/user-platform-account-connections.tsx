import { Headline3 } from 'gobble-lib-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ConnectMinecraftAccountModal } from '../../modals/admin/connect-minecraft-account-modal';
import * as api from '../../network/auth-network';
import * as authAPI from '../../network/auth-network';
import { getSiteURLBase } from '../../network/network-helper';
import { PlatformLoginType } from '../../types/platform-login';
import { UserConnection } from '../../types/user-connection';
import { UserPlatformAccount } from './user-platform-account';

const AccountsWrapper = styled.div`
    max-width: 500px;
    min-width: 500px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

export const UserPlatformAccountConnections = () => {
    const [showAccountConnectModal, setShowAccountConnectModal] = useState(false);
    const [accounts, setAccounts] = useState<readonly UserConnection[]>([]);
    const [links, setLinks] = useState<readonly PlatformLoginType[]>([]);

    useEffect(() => {
        api.getUserConnectedAccounts().then(json => {
            setAccounts(json);
            authAPI.getPlatformLinks(`${getSiteURLBase()}${location.pathname}`).then(setLinks);
        });
    }, []);


    const login = (url: string) => {
        //location.href = url('link', location.href);
    };

    return (
        <AccountsWrapper>
            <Headline3>Connect Accounts!</Headline3>
            {
                links.map(platformLink => (
                    <UserPlatformAccount
                        key={platformLink.platform}
                        accounts={accounts}
                        platform_name={platformLink.platform}
                        icon={platformLink.icon}
                        color={platformLink.color}
                        onClick={() => login(platformLink.url)}
                    />
                ))
            }
            <UserPlatformAccount
                accounts={accounts}
                platform_name='Minecraft'
                icon='fas fa-cube'
                color='#058205'
                onClick={() => setShowAccountConnectModal(true)}
                disabled={true}
            />
            {showAccountConnectModal && <ConnectMinecraftAccountModal show={showAccountConnectModal} requestClose={() => setShowAccountConnectModal(false)} />}
        </AccountsWrapper>
    );
};
