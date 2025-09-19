import { Body1, Caption, HorizontalRule, TD, TH } from 'gobble-lib-react';
import { YahooFantasyTeamRoster } from '../../rest/yahoo-fantasy-team-roster';
import { styled } from 'styled-components';
import { YAHOO_FANTASY_2PT_STAT, YAHOO_FANTASY_BLK_KICK_STAT, YAHOO_FANTASY_FGS_YDS_STAT, YAHOO_FANTASY_FUM_LOST_STAT, YAHOO_FANTASY_FUM_REC_STAT, YAHOO_FANTASY_INT_STAT, YAHOO_FANTASY_PASS_INT_STAT, YAHOO_FANTASY_PASS_TD_STAT, YAHOO_FANTASY_PASS_YDS_STAT, YAHOO_FANTASY_PAT_MADE_STAT, YAHOO_FANTASY_PTS_VS_STAT, YAHOO_FANTASY_REC_REC_STAT, YAHOO_FANTASY_REC_TARGETS_STAT, YAHOO_FANTASY_REC_TD_STAT, YAHOO_FANTASY_REC_YDS_STAT, YAHOO_FANTASY_RET_TD_DEF_STAT, YAHOO_FANTASY_RET_TD_OFF_STAT, YAHOO_FANTASY_RET_YDS_DEF_STAT, YAHOO_FANTASY_RET_YDS_OFF_STAT, YAHOO_FANTASY_RUSH_ATT_STAT, YAHOO_FANTASY_RUSH_TD_STAT, YAHOO_FANTASY_RUSH_YDS_STAT, YAHOO_FANTASY_SACK_STAT, YAHOO_FANTASY_SAFETY_STAT, YAHOO_FANTASY_TD_STAT } from '../../rest/yahoo-fantasy-player-stats-stat-enum';
import { HScrollTable } from '../../../../components/scrolling-table';

type YahooFantasyTeamRosterGridFootballProps = {
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
    width: max-content;
    display: flex;
    flex-direction: row;
    gap: 8px;
    grid-area: name;
`;

const StatusBody = styled(Body1)`
    color: #b51d1d;
    font-weight: 600;
`;

type PlayerRowProps = {
    readonly $selPos: string
}

const PlayerRow = styled.tr<PlayerRowProps>`
    background-color: ${({ theme, $selPos }) => $selPos === 'BN' ? `${theme.background.on}22` : ''};
`;

export const YahooFantasyTeamRosterGridFootball = ({ roster }: YahooFantasyTeamRosterGridFootballProps) => {
    const offense = ['QB', 'WR', 'RB', 'TE'];
    return (
        <div>
            <HScrollTable >
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Offense</TH>
                        <TH>FAN PTS</TH>
                        <TH>Pass Yds</TH>
                        <TH>Pass TD</TH>
                        <TH>Pass Int</TH>
                        <TH>Rush Att</TH>
                        <TH>Rush Yds</TH>
                        <TH>Rush TD</TH>
                        <TH>Rec Rec</TH>
                        <TH>Rec Yds</TH>
                        <TH>Rec TD</TH>
                        <TH>Tgt</TH>
                        <TH>Ret Yds</TH>
                        <TH>Ret TD</TH>
                        <TH>2pt</TH>
                        <TH>Fum Lost</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.filter(p => offense.includes(p.displayPosition)).map(p => {
                            const stats = p.playerStats.stats;
                            return (
                                <PlayerRow key={p.playerId} $selPos={p.selectedPosition.position}>
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
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PASS_YDS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PASS_TD_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PASS_INT_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RUSH_ATT_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RUSH_YDS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RUSH_TD_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_REC_REC_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_REC_YDS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_REC_TD_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_REC_TARGETS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RET_YDS_OFF_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RET_TD_OFF_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_2PT_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_FUM_LOST_STAT)?.value}</CTD>
                                </PlayerRow>
                            );
                        })
                    }
                </tbody>
            </HScrollTable>
            <HorizontalRule />
            <HScrollTable>
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Kicker</TH>
                        <TH>FAN PTS</TH>
                        <TH>Made</TH>
                        <TH>Yds</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.filter(p => p.displayPosition === 'K').map(p => {
                            const stats = p.playerStats.stats;
                            return (
                                <PlayerRow key={p.playerId} $selPos={p.selectedPosition.position}>
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
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PAT_MADE_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_FGS_YDS_STAT)?.value}</CTD>
                                </PlayerRow>
                            );
                        })
                    }
                </tbody>
            </HScrollTable>
            <HorizontalRule />
            <HScrollTable>
                <thead>
                    <tr>
                        <TH>Pos</TH>
                        <TH>Defense / Special Teams</TH>
                        <TH>FAN PTS</TH>
                        <TH>Pts vs.</TH>
                        <TH>Sack</TH>
                        <TH>Safety</TH>
                        <TH>Int</TH>
                        <TH>Fum Rec</TH>
                        <TH>TD</TH>
                        <TH>Blk Kick</TH>
                        <TH>Ret Yds</TH>
                        <TH>Ret TD</TH>
                    </tr>
                </thead>
                <tbody>
                    {
                        roster.players.filter(p => p.displayPosition === 'DEF').map(p => {
                            const stats = p.playerStats.stats;
                            return (
                                <PlayerRow key={p.playerId} $selPos={p.selectedPosition.position}>
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
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_PTS_VS_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SACK_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_SAFETY_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_INT_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_FUM_REC_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_TD_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_BLK_KICK_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RET_YDS_DEF_STAT)?.value}</CTD>
                                    <CTD>{stats.find(s => s.statId === YAHOO_FANTASY_RET_TD_DEF_STAT)?.value}</CTD>
                                </PlayerRow>
                            );
                        })
                    }
                </tbody>
            </HScrollTable>
        </div>
    );
};