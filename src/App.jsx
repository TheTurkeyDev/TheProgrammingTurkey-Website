import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PageWrapper } from './pages/base/page-wrapper';

const CardWrapper = styled.div`
    background: ${props => props.theme.color.bg_secondary};
`;

const ListItemWrapper = styled.div`
    background: ${props => props.theme.color.bg_secondary};
`;

export const App = () => {
    return (
        <PageWrapper>
            <div className='text-center'>
                <CardWrapper className='card m-5 shadow'>
                    <div className='card-body'>
                        <h5 className='card-title'>Whats Going on Here?</h5>
                        <p className='card-text'>
                            I'm currently in the middle of revamping my website!
                            It was previously written with a very bad mix of php
                            and html with w3css for css organization. Let's just
                            say it wasn't all that great and a bit of a
                            nightnare to work with and update. Now I am redoing
                            it all with React and bootstrap! Why react? Well I'm
                            learning it to work with it on another project, so
                            I'm using it here to aid in my testing and learning.
                            The source code for my website is actually available
                            to everyone
                            <a href='https://github.com/TheTurkeyDev/TheProgrammingTurkey-Website'>
                                {' '}
                                on my Github page!
                            </a>
                        </p>

                        <p className='card-text'>
                            Not all pages and links are currently available and
                            over time I will slowly be adding everything back.
                            Please be patient with me!
                        </p>
                    </div>
                </CardWrapper>
                <CardWrapper className='card m-5 shadow'>
                    <div className='card-body'>
                        <h5 className='card-title'>Website To-Do List</h5>
                        <ul className='list-group list-group-flush'>
                            <ListItemWrapper className='list-group-item'>
                                Game/ Project Pages
                            </ListItemWrapper>
                            <ListItemWrapper className='list-group-item'>
                                Twitch View
                            </ListItemWrapper>
                            <ListItemWrapper className='list-group-item'>
                                Test Section
                            </ListItemWrapper>
                        </ul>
                    </div>
                </CardWrapper>
                <CardWrapper className='card m-5 shadow'>
                    <div className='card-body'>
                        <h5 className='card-title'>Ludum Dare 48!</h5>
                        <h6 className='card-subtitle'>That's a wrap!</h6>
                        <p className='card-text'>
                            Well another Ludum Dare has come and passed. Check
                            out the links below for the game, main Ludum Dare
                            page, and stats about past Ludum Dare game
                            placements
                        </p>
                    </div>

                    <div className='card-footer'>
                        <Link className='mr-2' to='/projects/LD48'>
                            Game
                        </Link>
                        <span>|</span>
                        <a className='ml-2 mr-2' href='https://ldjam.com'>
                            Ludum Dare
                        </a>
                        <span>|</span>
                        <Link className='ml-2' to='/ld-stats'>
                            Stats
                        </Link>
                    </div>
                </CardWrapper>
            </div>
        </PageWrapper>
    );
}
