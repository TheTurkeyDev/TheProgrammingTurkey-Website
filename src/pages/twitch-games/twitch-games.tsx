import { ItemLinkGroup } from '../../components/item-link-group';
import { ItemLinkType } from '../../components/item-link-type';

const games: readonly ItemLinkType[] = [
    { title: 'Hangman', link: '/twitchgames/hangman', permission: '', fa_icon: true, icon: 'fas fa-male' },
    { title: 'Battleship', link: '/twitchgames/battleship', permission: 'twitchgame.battleship', fa_icon: true, icon: 'fas fa-ship' },
    { title: 'Rock, Paper, Scissors', link: '/twitchgames/rps', permission: 'twitchgame.rps', fa_icon: true, icon: 'fas fa-hand-rock' },
];

export const TwitchGames = () => {
    return (
        <ItemLinkGroup groupTitle='Available Games' items={games} />
    );
};
