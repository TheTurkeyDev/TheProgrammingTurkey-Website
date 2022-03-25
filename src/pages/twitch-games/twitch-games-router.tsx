import { Route, Routes } from 'react-router';
import { authWrap } from '../../router';
import { TwitchBattleshipSetup } from './twitch-battleship';
import { TwitchGames } from './twitch-games';
import { TwitchHangmanSetup } from './twitch-hangman';
import { TwitchRPSSetup } from './twitch-rps';

export const TwitchGamesRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<TwitchGames />} />
            <Route path='/battleship' element={authWrap(<TwitchBattleshipSetup />, 'twitchgame.battleship')} />
            <Route path='/rps' element={authWrap(<TwitchRPSSetup />, 'twitchgame.rps')} />
            <Route path='/hangman' element={authWrap(<TwitchHangmanSetup />)} />
        </Routes>
    );
};