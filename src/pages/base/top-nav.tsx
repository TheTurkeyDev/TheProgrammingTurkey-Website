import { CenterContent, Dropdown, DropdownContent, DropdownLinkItem, LinkButton, NavBar, NavLink, NavText, SiteName, TextButton, useThemeContext } from '@theturkeydev/gobble-lib-react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { LoginButton } from './login-button';

const UserIcon = styled.i`
    font-size: 32px;
`;

const UserAvatar = styled.img`
    max-width: 32px;
    max-height: 32px;
    border-radius: 16px;
`;
const links = [
    { title: 'Twitch', link: 'https://theturkey.dev/twitch' },
    { title: 'YouTube', link: 'https://theturkey.dev/youtube' },
    { title: 'Discord', link: 'https://discord.gg/DkexpJj' },
    { title: 'Github', link: 'https://theturkey.dev/github' },
    { title: 'LudumDare', link: 'https://ldjam.com' },
];

export const TopNav = () => {
    const { authState, avatar } = useAuth();
    const { theme, setTheme } = useThemeContext();

    return (
        <NavBar>
            <SiteName to='/'>
                TurkeyDev
            </SiteName>
            <CenterContent>
                <NavLink link='/'>Home</NavLink>
                <NavLink link='/projects'>Projects</NavLink>
                <NavLink link='/support'>Support Me</NavLink>
                <Dropdown>
                    <NavText> Other Links</NavText>
                    <DropdownContent>
                        {
                            links.map(link => <NavLink key={link.title} link={link.link}>{link.title}</NavLink>)
                        }
                    </DropdownContent>
                </Dropdown>
            </CenterContent>
            <Dropdown>
                {authState ? <UserAvatar src={avatar} /> : <UserIcon className='fas fa-user-circle' />}
                <DropdownContent sideAnchor='right'>
                    {authState ? <DropdownLinkItem to='/user/profile'>Profile</DropdownLinkItem> : <></>}
                    {authState ? <DropdownLinkItem to='/logout'>Logout</DropdownLinkItem> : <LoginButton />}
                    <TextButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</TextButton>
                </DropdownContent>
            </Dropdown>
        </NavBar>
    );
};
