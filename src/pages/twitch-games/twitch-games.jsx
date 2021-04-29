import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemLinkGroup } from '../../components/item-link-group';
import { AuthContext } from '../../contexts/auth-context';

const games = [
    { title: 'Hangman', link: '/twitchgames/hangman', permission: '', icon: 'fas fa-male' },
    { title: 'Battleship', link: '/twitchgames/battleship', permission: 'twitchgame.battleship', icon: 'fas fa-ship' },
    { title: 'Rock, Paper, Scissors', link: '/twitchgames/rps', permission: 'twitchgame.rps', icon: 'fas fa-hand-rock' },
];

export const TwitchGames = () => {
    const auth = useContext(AuthContext);
    return (
        <div className='fluid-container mx-auto text-center'>
            <ItemLinkGroup groupTitle='Available Games' items={games} />
            {
                games.map(game => {
                    if (game.perm === '' || auth.permissions.includes(game.perm)) {
                        return (
                            <div key={game.title} className='row m-0'>
                                <Link className='col' to={game.page}>
                                    {game.title}
                                </Link>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
}
