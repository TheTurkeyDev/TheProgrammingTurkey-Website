import { CollapsibleCenterContent, CollapsedNavbar, Dropdown, DropdownContent, DropdownLinkItem, NavLink, NavText, SiteName, TextButton, useThemeContext, Icon, NavBar, CollapsedNavLink, CollapsedDropDown } from 'gobble-lib-react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { LoginButton } from './login-button';
import { useState } from 'react';

const UserIcon = styled(Icon)`
    font-size: 32px;
`;

const UserAvatar = styled.img`
    max-width: 32px;
    max-height: 32px;
    border-radius: 16px;
`;

const links = [
    { title: 'Twitch', link: 'https://trky.dev/twitch' },
    { title: 'YouTube', link: 'https://trky.dev/youtube' },
    { title: 'Discord', link: 'https://discord.gg/DkexpJj' },
    { title: 'Github', link: 'https://trky.dev/github' },
    { title: 'LudumDare', link: 'https://ldjam.com' },
];

export const TopNav = () => {
    const { authState, avatar } = useAuth();
    const { theme, setTheme } = useThemeContext();

    const [expanded, setExpanded] = useState(false);

    return (
        <NavBar>
            <CollapsedNavbar icon='fas fa-bars' expanded={expanded} toggleExpand={() => setExpanded(old => !old)}>
                <CollapsedNavLink text='Home' to='/' />
                <CollapsedNavLink text='Projects' to='/projects' />
                <CollapsedNavLink text='Blog' to='https://trky.dev/blog' />
                <CollapsedNavLink text='Support Me' to='/support' />
                <CollapsedDropDown
                    text='Other Links'
                    options={links.reduce((p, c) => ({ ...p, [c.title]: c.link }), {})}
                    closeNav={() => setExpanded(false)} />
            </CollapsedNavbar>
            <SiteName to='/'>
                TurkeyDev
            </SiteName>
            <CollapsibleCenterContent>
                <NavLink link='/'>Home</NavLink>
                <NavLink link='/projects'>Projects</NavLink>
                <NavLink link='https://trky.dev/blog'>Blog</NavLink>
                <NavLink link='/support'>Support Me</NavLink>
                <Dropdown>  
                    <NavText>Other Links</NavText>
                    <DropdownContent>
                        {
                            links.map(link => <NavLink key={link.title} link={link.link}>{link.title}</NavLink>)
                        }
                    </DropdownContent>
                </Dropdown>
            </CollapsibleCenterContent>
            <Dropdown>
                {authState ? <UserAvatar src={avatar} alt='Avatar Missing' /> : <UserIcon className='fas fa-user-circle' />}
                <DropdownContent sideAnchor='right'>
                    {authState ? <DropdownLinkItem to='/user/profile'>Profile</DropdownLinkItem> : <></>}
                    {authState ? <DropdownLinkItem to='/logout'>Logout</DropdownLinkItem> : <LoginButton />}
                    <TextButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</TextButton>
                </DropdownContent>
            </Dropdown>
        </NavBar>
    );
};
