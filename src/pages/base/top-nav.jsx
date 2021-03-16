import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/auth-context';

const NavWrapper = styled.nav`
    background: ${props => props.theme.color.bg_secondary};
`;

const DropdownMenu = styled.div`
    background: ${props => props.theme.color.bg_secondary};
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
    const auth = useContext(AuthContext);

    return (
        <NavWrapper className='navbar navbar-expand-sm navbar-dark'>
            <Link className='navbar-brand' to='/'>
                TurkeyDev
            </Link>
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
                        <Link className='nav-link' to='/'>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <Link
                            className='nav-link dropdown-toggle'
                            to='/projects?type=all'
                            id='navbarDropdown'
                            role='button'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                        >
                            Projects
                        </Link>
                        <DropdownMenu className='dropdown-menu' aria-labelledby='navbarDropdown'>
                            <Link className='dropdown-item' to='/projects?type=all'>
                                All
                            </Link>
                            <Link className='dropdown-item' to='/projects?type=ld'>
                                Ludum Dare
                            </Link>
                            <Link className='dropdown-item' to='/projects?type=mods'>
                                Mods
                            </Link>
                            <Link className='dropdown-item' to='/projects?type=webapps'>
                                Web Apps
                            </Link>
                            <Link className='dropdown-item' to='/projects?type=other'>
                                Others
                            </Link>
                        </DropdownMenu>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/support'>
                            Support Me
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <a
                            className='nav-link'
                            href=''
                            onClick={() =>
                                window.open(
                                    'http://maven.theprogrammingturkey.com/'
                                )
                            }
                        >
                            Maven
                        </a>
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
                                        <a key={link.title} className='nav-link' href='' onClick={() => window.open(link.link)}>
                                            {link.title}
                                        </a>
                                    );
                                })
                            }
                        </DropdownMenu>
                    </li>
                </ul>
                <div className='navbar-text'>
                    {auth.authState ? (
                        <div>
                            <Link to='/user/profile'>
                                {' '}
                                {`Welcome ${auth.userName}!`}{' '}
                            </Link>{' '}
                            | <Link to='/logout'> Logout </Link>
                        </div>
                    ) : (
                        <div style={{ marginLeft: '150px' }}>
                            <Link to='/login'> Login </Link>
                        </div>
                    )}
                </div>
            </div>
        </NavWrapper>
    );
}
