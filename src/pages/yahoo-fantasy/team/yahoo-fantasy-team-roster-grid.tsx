import { Body1, Caption, HorizontalRule, Table, TD, TH } from 'gobble-lib-react';
import { YahooFantasyTeamRoster } from '../rest/yahoo-fantasy-team-roster';
import { styled } from 'styled-components';
import { YahooFantasyPlayerStatsStatEnum } from '../rest/yahoo-fantasy-player-stats-stat-enum';
import { YahooFantasyTeamStartingIcon } from './yahoo-fantasy-team-starting-icon';

type YahooFantasyTeamRosterProps = {
    readonly roster: YahooFantasyTeamRoster
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

export const YahooFantasyTeamRosterGrid = ({ roster }: YahooFantasyTeamRosterProps) => {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Player</TH>
                        <TH>FAN PTS</TH>
                        <TH>G</TH>
                        <TH>A</TH>
                        <TH>PPP</TH>
                        <TH>SHP</TH>
                        <TH>GWG</TH>
                        <TH>SOG</TH>
                        <TH>HIT</TH>
                        <TH>BLK</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.filter(p => p.displayPosition !== 'G').map(p => {
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
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.GOALS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.ASSIST)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.POWER_PLAY_POINTS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.SHORT_HANDED_POINTS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.GAME_WINNING_GOALS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.SHOTS_ON_GOAL)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.HITS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.BLOCKS)?.value}</CTD>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <HorizontalRule />
            <Table>
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Goalie</TH>
                        <TH>FAN PTS</TH>
                        <TH>W</TH>
                        <TH>GA</TH>
                        <TH>SV</TH>
                        <TH>SO</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.filter(p => p.displayPosition === 'G').map(p => {
                            const stats = p.playerStats.stats;
                            return (
                                <tr key={p.playerId}>
                                    <CTD>{p.selectedPosition.position}</CTD>
                                    <TD style={{ padding: '4px' }}>
                                        <PlayerInfo>
                                            <PlayerHeadshot height={48} src={p.imageURL} />
                                            <PlayerName><Body1>{p.name.full}</Body1> {!!p.status && <StatusBody>{p.status}</StatusBody>}</PlayerName>
                                            <Caption style={{ gridArea: 'team' }}>{p.editorialteamAbbr} - {p.displayPosition}</Caption>
                                            <Caption style={{ gridArea: 'game' }}>{!!p.startingStatus && <YahooFantasyTeamStartingIcon startingStatus={p.startingStatus} />}</Caption>
                                        </PlayerInfo>
                                    </TD>
                                    <CTD>{p.playerPoints.total}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.WINS)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.GOALS_AGAINST)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.SAVES)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YahooFantasyPlayerStatsStatEnum.SHOUT_OUTS)?.value}</CTD>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};