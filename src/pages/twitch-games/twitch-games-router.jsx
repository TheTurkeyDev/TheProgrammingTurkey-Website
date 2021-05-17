import { Route, Switch } from 'react-router'
import { AuthRoute } from '../../util/AuthRoute';
import { TwitchBattleshipSetup } from './twitch-battleship';
import { TwitchGames } from './twitch-games';
import { TwitchHangmanSetup } from './twitch-hangman';
import { TwitchRPSSetup } from './twitch-rps';

export const TwitchGamesRouter = () => {
    return (
        <Switch>
            <Route exact path='/twitchgames/' component={TwitchGames} />
            <AuthRoute exact path='/twitchgames/battleship' component={TwitchBattleshipSetup} perm='twitchgame.battleship' />
            <AuthRoute exact path='/twitchgames/rps' component={TwitchRPSSetup} perm='twitchgame.rps' />
            <AuthRoute exact path='/twitchgames/hangman' component={TwitchHangmanSetup} />
        </Switch>
    );
}