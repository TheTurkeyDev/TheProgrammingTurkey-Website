import { Body1, Card, CardContent, CardHeader, Headline5, Headline6, HorizontalRule, Opacity, Table, TD, TH } from 'gobble-lib-react';
import { YahooFantasyTeam } from '../rest/yahoo-fantasy-team';
import { styled } from 'styled-components';
import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
    max-width: 900px;
    margin-inline: auto;
`;

const TR = styled.tr`
    
    &:hover {
        cursor: pointer;
        opacity: ${Opacity.HOVER_NORMAL};
        background-color: ${({theme}) => theme.primary.color};
    }
`;


type YahooFantasyLeagueStandingsProps = {
    readonly standings: readonly YahooFantasyTeam[]
}

export const YahooFantasyLeagueStandings = ({ standings }: YahooFantasyLeagueStandingsProps) => {

    const navigate = useNavigate();

    return (
        <StyledCard>
            <CardHeader>
                <Headline5>Standings</Headline5>
                <HorizontalRule />
            </CardHeader>
            <CardContent>
                <Table>
                    <thead>
                        <tr>
                            <TH>Rank</TH>
                            <TH>Team</TH>
                            <TH>W-L-T</TH>
                            <TH>Pct.</TH>
                            <TH>Pts. For</TH>
                            <TH>Pts. Against</TH>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map(t => {
                            const outcomeTot = t.teamStandings.outcomeTotals;
                            return (
                                <TR key={t.teamId} onClick={() => navigate(`team/${t.teamId}`)}>
                                    <TD>{t.teamStandings.rank}</TD>
                                    <TD>{t.name}</TD>
                                    <TD>{outcomeTot.wins}-{outcomeTot.losses}-{outcomeTot.ties}</TD>
                                    <TD>{outcomeTot.percentage.toFixed(3)}</TD>
                                    <TD>{t.teamStandings.pointsFor.toFixed(2)}</TD>
                                    <TD>{t.teamStandings.pointsAgainst.toFixed(2)}</TD>
                                </TR>
                            );
                        })}
                    </tbody>
                </Table>
            </CardContent>
        </StyledCard>
    );
};