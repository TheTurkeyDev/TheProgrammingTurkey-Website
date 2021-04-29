import { Router, Switch, useRouteMatch } from 'react-router'
import { AuthWrapper } from '../../contexts/auth-context';
import { TwitchBattleshipSetup } from './twitch-battleship';
import { TwitchGames } from './twitch-games';
import { TwitchHangmanSetup } from './twitch-hangman';
import { TwitchRPSSetup } from './twitch-rps';

export const TwitchGamesRouter = (props) => {
    const { path } = useRouteMatch();

    return (
        <Router history={props.history}>
            <Switch>
                <AuthWrapper exact path={`${path}/`} component={TwitchGames} />
                <AuthWrapper exact path={`${path}/battleship`} component={TwitchBattleshipSetup} perm='twitchgame.battleship' />
                <AuthWrapper exact path={`${path}/rps`} component={TwitchRPSSetup} perm='twitchgame.rps' />
                <AuthWrapper exact path={`${path}/hangman`} component={TwitchHangmanSetup} />
            </Switch>
        </Router>
    );
}