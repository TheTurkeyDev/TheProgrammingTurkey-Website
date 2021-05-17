import { ItemLinkGroup } from '../../components/item-link-group';

const games = [
    { title: 'Hangman', link: '/twitchgames/hangman', permission: '', icon: 'fas fa-male' },
    { title: 'Battleship', link: '/twitchgames/battleship', permission: 'twitchgame.battleship', icon: 'fas fa-ship' },
    { title: 'Rock, Paper, Scissors', link: '/twitchgames/rps', permission: 'twitchgame.rps', icon: 'fas fa-hand-rock' },
];

export const TwitchGames = () => {
    return (
        <ItemLinkGroup groupTitle='Available Games' items={games} />
    );
}
