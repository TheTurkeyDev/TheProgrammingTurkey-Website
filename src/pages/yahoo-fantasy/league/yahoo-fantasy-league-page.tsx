import { Headline2, Loading, useFetch } from 'gobble-lib-react';
import { YahooFantasyLeague } from '../rest/yahoo-fantasy-league';
import { useParams } from 'react-router-dom';
import { getDevAPIBase } from '../../../network/network-helper';
import { getParams } from '../../../network/auth-network';
import styled from 'styled-components';
import { YahooFantasyLeagueMatchup } from './yahoo-fantasy-league-machups';
import { YahooFantasyLeagueStandings } from './yahoo-fantasy-league-standings';

const Content = styled.div`
    margin: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const YahooFantasyLeaguePage = () => {
    const { gameId, leagueId } = useParams();
    const [league, loading] = useFetch<YahooFantasyLeague>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}`, { requestData: getParams });

    if (loading || !league)
        return <Loading />;

    return (
        <Content>
            <Header>
                <img src={league.logoURL} width={64} />
                <Headline2>{league.name}</Headline2>
            </Header>
            <YahooFantasyLeagueMatchup scoreboard={league.scoreboard} />
            <YahooFantasyLeagueStandings standings={league.standings.standings} />
        </Content>
    );
};