import { Router, Switch, Route, useRouteMatch } from 'react-router'
import { TwitchBattleshipSetup } from './twitch-battleship';
import { TwitchGames } from './twitch-games';
import { TwitchHangmanSetup } from './twitch-hangman';
import { TwitchRPSSetup } from './twitch-rps';

export const TwitchGamesRouter = (props) => {
    const { path } = useRouteMatch();

    return (
        <Router history={props.history}>
            <Switch>
                <Route exact path={`${path}/`} component={TwitchGames} />
                <Route exact path={`${path}/battleship`} component={TwitchBattleshipSetup} />
                <Route exact path={`${path}/rps`} component={TwitchRPSSetup} />
                <Route exact path={`${path}/hangman`} component={TwitchHangmanSetup} />
            </Switch>
        </Router>
    );
}