import { Body1, Caption, HorizontalRule, Table, TD, TH } from 'gobble-lib-react';
import { YahooFantasyTeamRoster } from '../../rest/yahoo-fantasy-team-roster';
import { styled } from 'styled-components';
import { YahooFantasyTeamStartingIcon } from '../yahoo-fantasy-team-starting-icon';
import { YAHOO_FANTASY_ASSIST_STAT, YAHOO_FANTASY_BLOCKS_STAT, YAHOO_FANTASY_GA_STAT, YAHOO_FANTASY_GOALS_STAT, YAHOO_FANTASY_GWG_STAT, YAHOO_FANTASY_HITS_STAT, YAHOO_FANTASY_PPP_STAT, YAHOO_FANTASY_SAVES_STAT, YAHOO_FANTASY_SHP_STAT, YAHOO_FANTASY_SO_STAT, YAHOO_FANTASY_SOG_STAT, YAHOO_FANTASY_WINS_STAT } from '../../rest/yahoo-fantasy-player-stats-stat-enum';

type YahooFantasyTeamRosterGridHockeyProps = {
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

export const YahooFantasyTeamRosterGridHockey = ({ roster }: YahooFantasyTeamRosterGridHockeyProps) => {
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
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_GOALS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_ASSIST_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PPP_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SHP_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_GWG_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SOG_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_HITS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_BLOCKS_STAT)?.value}</CTD>
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
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_WINS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_GA_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SAVES_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SO_STAT)?.value}</CTD>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};