import { Body1, Headline4, Loading, useFetch, useQuery } from 'gobble-lib-react';
import { getDevAPIBase } from '../../../network/network-helper';
import { useParams } from 'react-router-dom';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { YahooFantasyTeamPageHeader } from './yahoo-fantasy-team-page-header';
import { styled } from 'styled-components';
import { YahooFantasyTeamRosterGrid } from './yahoo-fantasy-team-roster-grid';
import { getParams } from '../../../network/auth-network';
import { useEffect, useState } from 'react';

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    max-width: 900px;
    margin-inline: auto;
`;

export const YahooFantasyTeamPage = () => {

    const { gameId, leagueId, teamId } = useParams();
    const [getTeam, loading] = useQuery<YahooFantasyTeam>(`${getDevAPIBase()}/yahoo/game/${gameId}/league/${leagueId}/team/${teamId}`, { requestData: getParams });

    const [team, setTeam] = useState<YahooFantasyTeam>();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const dateStr = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        getTeam(undefined, undefined, `date=${dateStr}`)
            .then(resp => !!resp && setTeam(resp));
    }, [date]);

    if (loading)
        return <Loading />;

    if (!team)
        return <Body1>Team missing?</Body1>;

    return (
        <PageContent>
            <YahooFantasyTeamPageHeader team={team} date={date} setDate={setDate} />
            <YahooFantasyTeamRosterGrid roster={team.roster} />
        </PageContent>
    );
};