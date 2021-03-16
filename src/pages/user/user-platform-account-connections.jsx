import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { OverlayContext } from '../../contexts/overlay-context';
import * as api from '../../network/auth-network';
import * as authAPI from '../../network/auth-network';
import { ConnectMinecraftAccountOverlay } from '../../overlays/auth/connect-minecraft-account-overlay';
import { AuthPageWrapper } from '../base/auth-page-wrapper';
import { UserPlatformAccount } from './user-platform-account';

const AccountsWrapper = styled.div`
    max-width: 500px;
    min-width: 500px;
`;

export const UserPlatformAccountConnections = (props) => {
    const [accounts, setAccounts] = useState([]);

    const overlay = useContext(OverlayContext);

    const [links, setLinks] = useState([]);

    useEffect(() => {
        api.getUserConnectedAccounts().then((json) => {
            setAccounts(json);
            authAPI.getPlatformLinks().then(links => setLinks(links));
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
            <AccountsWrapper className='fluid-container mx-auto'>
                <div className='row m-0 text-center'>
                    <h2 className='col mt-1'>Connect Accounts!</h2>
                </div>
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
                    onClick={connectMinecraft}
                    disabled={true}
                />
            </AccountsWrapper>
        </AuthPageWrapper>
    );
}
