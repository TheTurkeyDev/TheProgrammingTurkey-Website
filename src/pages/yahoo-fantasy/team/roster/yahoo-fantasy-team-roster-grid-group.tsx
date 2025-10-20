import { Body1, Caption, Table, TD, TH } from 'gobble-lib-react';
import { styled } from 'styled-components';
import { YahooFantasyPlayer } from '../../rest/yahoo-fantasy-player';
import { YahooFantasyLeagueStatCategories } from '../../rest/yahoo-fantasy-league-stat-categories';
import { YahooFantasyLeagueStatCategoriesStats } from '../../rest/yahoo-fantasy-league-stat-categories-stats';

type YahooFantasyTeamRosterGridHockeyProps = {
    readonly posType: string
    readonly players: readonly YahooFantasyPlayer[]
    readonly statCategories: YahooFantasyLeagueStatCategories
}

const CTD = styled(TD)`
    text-align: center;
`;

const PlayerInfo = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 3fr 2fr 2fr;
    grid-template-areas: "photo name"
    "photo team"
    "photo game";
    column-gap: 4px;
`;

const PlayerHeadshot = styled.img`
    grid-area: photo;
    align-self: center;
`;

const PlayerName = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    grid-area: name;
`;

const StatusBody = styled(Body1)`
    color: #b51d1d;
    font-weight: 600;
`;

export const YahooFantasyTeamRosterGridGroup = ({ posType, players, statCategories }: YahooFantasyTeamRosterGridHockeyProps) => {

    const statsToShow = statCategories.stats.reduce((stats, curr) => {
        if (curr.positionType === posType)
            // eslint-disable-next-line functional/immutable-data
            stats.add(curr);
        return stats;
    }, new Set<YahooFantasyLeagueStatCategoriesStats>());

    return (
        <Table>
            <thead>
                <tr>
                    <TH>Pos</TH>
                    <TH>Player</TH>
                    <TH>FAN PTS</TH>
                    {
                        [...statsToShow].map(s => <TH>{s.displayName}</TH>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    players.map(p => {
                        const stats = p.playerStats.stats;
                        return (
                            <tr key={p.playerId}>
                                <CTD>{p.selectedPosition.position}</CTD>
                                <TD style={{ padding: '4px' }}>
                                    <PlayerInfo>
                                        <PlayerHeadshot height={48} src={p.imageURL} />
                                        <PlayerName><Body1>{p.name.full}</Body1> {!!p.status && <StatusBody>{p.status}</StatusBody>}</PlayerName>
                                        <Caption style={{ gridArea: 'team' }}>{p.editorialteamAbbr} - {p.displayPosition}</Caption>
                                        <Caption style={{ gridArea: 'game' }}></Caption>
                                    </PlayerInfo>
                                </TD>
                                <CTD>{p.playerPoints.total}</CTD>
                                {
                                    [...statsToShow].map(sc => <CTD>{stats.find(s => s.statId === sc.statId)?.value}</CTD>)
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
};