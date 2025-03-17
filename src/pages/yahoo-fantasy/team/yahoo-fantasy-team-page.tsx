import { Body1, Headline4, Loading, useFetch } from 'gobble-lib-react';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { YahooFantasyTeamPageHeader } from './yahoo-fantasy-team-page-header';
import { styled } from 'styled-components';
import { YahooFantasyTeamRosterGrid } from './yahoo-fantasy-team-roster-grid';
import { getParams } from '../../../network/auth-network';

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;;
`;

export const YahooFantasyTeamPage = () => {

    const { gameId, leagueId, teamId } = useParams();
    const [team, loading] = useFetch<YahooFantasyTeam>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}/team/${teamId}`, { requestData: getParams });

    if (loading)
        return <Loading />;

    if (!team)
        return <Body1>Team missing?</Body1>;

    return (
        <PageContent>
            <YahooFantasyTeamPageHeader team={team} />
            <YahooFantasyTeamRosterGrid roster={team.roster} />
        </PageContent>
    );
};