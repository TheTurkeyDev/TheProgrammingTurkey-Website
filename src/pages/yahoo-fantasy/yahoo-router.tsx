import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { YahooFantasyPage } from './yahoo-fantasy-page';
import { YahooFantasyTeamPage } from './team/yahoo-fantasy-team-page';
import { YahooFantasyLeaguePage } from './league/yahoo-fantasy-league-page';

export const YahooRouter = () => (
    <Routes>
        <Route path='/' element={authWrap(<YahooFantasyPage />)} />
        <Route path='/game/:gameId/league/:leagueId' element={<YahooFantasyLeaguePage />} />
        <Route path='/game/:gameId/league/:leagueId/team/:teamId' element={<YahooFantasyTeamPage />} />
    </Routes>
);

export default YahooRouter;