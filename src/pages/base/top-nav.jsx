import styled from 'styled-components';
import { useAuth } from '../../contexts/auth-context';
import { ExtLink, IntLink } from '../../styles/common-styles';
import { LoginButton } from './login-button';

const NavWrapper = styled.nav`
    background: ${props => props.theme.color.bgSecondary};
`;

const DropdownMenu = styled.div`
    background: ${props => props.theme.color.bgSecondary};
    margin-top: -5px;
`;

const links = [
    { title: 'Twitch', link: 'https://theturkey.dev/twitch' },
    { title: 'YouTube', link: 'https://theturkey.dev/youtube' },
    { title: 'Discord', link: 'https://discord.gg/DkexpJj' },
    { title: 'Github', link: 'https://theturkey.dev/github' },
    { title: 'LudumDare', link: 'https://ldjam.com' },
];

export const TopNav = () => {
    const { authState, userName } = useAuth();

    return (
        <NavWrapper className='navbar navbar-expand-sm navbar-dark'>
            <IntLink className='navbar-brand' to='/'>
                TurkeyDev
            </IntLink>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarText'
                aria-controls='navbarText'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarText'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <IntLink className='nav-link' to='/'>
                            Home
                        </IntLink>
                    </li>
                    <li className='nav-item dropdown'>
                        <IntLink className='nav-link' to='/projects'>
                            Projects
                        </IntLink>
                    </li>
                    <li className='nav-item'>
                        <IntLink className='nav-link' to='/support'>
                            Support Me
                        </IntLink>
                    </li>
                    <li className='nav-item dropdown'>
                        <span
                            className='nav-link dropdown-toggle txt-color-primary'
                            id='navbarDropdown'
                            role='button'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                        >
                            Other Links
                        </span>
                        <DropdownMenu className='dropdown-menu' aria-labelledby='navbarDropdown'>
                            {
                                links.map(link => {
                                    return (
                                        <ExtLink key={link.title} className='nav-link' href='' onClick={() => window.open(link.link)}>
                                            {link.title}
                                        </ExtLink>
                                    );
                                })
                            }
                        </DropdownMenu>
                    </li>
                </ul>
                <div className='navbar-text'>
                    {authState ? (
                        <div>
                            <IntLink to='/user/profile'>
                                {' '}
                                {`Welcome ${userName}!`}{' '}
                            </IntLink>{' '}
                            | <IntLink to='/logout'> Logout </IntLink>
                        </div>
                    ) : (
                        <div style={{ marginLeft: '150px' }}>
                            <LoginButton />
                        </div>
                    )}
                </div>
            </div>
        </NavWrapper>
    );
}
