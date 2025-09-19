import { Body1, Loading, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { YahooFantasyTeamPageHeader } from './yahoo-fantasy-team-page-header';
import { styled } from 'styled-components';
import { YahooFantasyTeamRosterGrid } from './roster/yahoo-fantasy-team-roster-grid';
import { getParams } from '../../../network/auth-network';
import { useEffect, useState } from 'react';
import { YahooFantasyLeague } from '../rest/yahoo-fantasy-league';

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    max-width: 1200px;
    margin-inline: auto;
`;

const getQueryParamForLeague = (league: YahooFantasyLeague, date: Date, week: number) => {
    switch (league.rosterType) {
        case 'week':
            return `week=${week}`;
        case 'date':
            return `date=${date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}`;
        default:
            return '';
    }
};

export const YahooFantasyTeamPage = () => {

    const { gameId, leagueId, teamId } = useParams();
    const [league, loadingLeague] = useFetch<YahooFantasyLeague>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}`, { requestData: getParams });
    const [getTeam, loading] = useQuery<YahooFantasyTeam>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}/team/${teamId}`, { requestData: getParams });

    const [team, setTeam] = useState<YahooFantasyTeam>();
    const [date, setDate] = useState(new Date());
    const [week, setWeek] = useState<number>();

    useEffect(() => {
        if (!league)
            return;

        getTeam(undefined, undefined, getQueryParamForLeague(league, date, week ?? league.currentWeek))
            .then(resp => !!resp && setTeam(resp));
    }, [date, week, league]);

    if (loading || loadingLeague)
        return <Loading />;

    if (!league)
        return <Body1>League missing?</Body1>;

    if (!team)
        return <Body1>Team missing?</Body1>;

    return (
        <PageContent>
            <YahooFantasyTeamPageHeader team={team} date={date} setDate={setDate} week={week ?? league.currentWeek} setWeek={setWeek} />
            <YahooFantasyTeamRosterGrid league={league} roster={team.roster} />
        </PageContent>
    );
};