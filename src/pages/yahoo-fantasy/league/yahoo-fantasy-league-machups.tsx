import { Body1, Body2, Card, CardContent, CardHeader, Headline5, HorizontalRule, Opacity, SpaceBetween } from 'gobble-lib-react';
import { YahooFantasyLeagueScoreboard } from '../rest/yahoo-fantasy-league-scoreboard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)`
    max-width: 900px;
    width: 100%;
    margin-inline: auto;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MatchupWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 100px 60px 100px 1fr;
    justify-items: center;
`;

const TeamWrapper = styled.div`
    
    &:hover {
        cursor: pointer;
        opacity: ${Opacity.HOVER_NORMAL};
    }
`;

const TeamPointsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const VSWrapper = styled.div`
    display: grid;
    align-items: center;
`;

type YahooFantasyLeagueMatchupProps = {
    readonly scoreboard: YahooFantasyLeagueScoreboard
}

export const YahooFantasyLeagueMatchup = ({ scoreboard }: YahooFantasyLeagueMatchupProps) => {

    const navigate = useNavigate();

    return (
        <StyledCard>
            <CardHeader>
                <SpaceBetween>
                    <Headline5>Week {scoreboard.week}</Headline5>
                    <Headline5>{new Date(scoreboard.matchups[0].weekStart).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })} - {new Date(scoreboard.matchups[0].weekEnd).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}</Headline5>
                </SpaceBetween>
                <HorizontalRule />
            </CardHeader>
            <StyledCardContent>
                {scoreboard.matchups.map((m, i) => {
                    const tz = m.teams[0];
                    const to = m.teams[1];
                    const livePP = tz.teamLiveProjectedPoints;
                    const toLivePP = to.teamLiveProjectedPoints;
                    return (
                        <MatchupWrapper key={i}>
                            <TeamWrapper onClick={() => navigate(`team/${tz.teamId}`)}>
                                {tz.name}
                            </TeamWrapper>
                            <TeamPointsWrapper>
                                <Body1>
                                    {tz.teamPoints.total}
                                </Body1>
                                <Body2 style={{ color: tz.teamProjectedPoints.total > (livePP?.total ?? 0) ? '#ca1f1f' : 'green' }}>
                                    {livePP?.total}
                                </Body2>
                            </TeamPointsWrapper>
                            <VSWrapper>
                                vs
                            </VSWrapper>
                            <TeamPointsWrapper>
                                <Body1>
                                    {to.teamPoints.total}
                                </Body1>
                                <Body2 style={{ color: to.teamProjectedPoints.total > (toLivePP?.total ?? 0) ? '#ca1f1f' : 'green' }}>
                                    {toLivePP?.total}
                                </Body2>
                            </TeamPointsWrapper>
                            <TeamWrapper onClick={() => navigate(`team/${to.teamId}`)}>
                                {to.name}
                            </TeamWrapper>
                        </MatchupWrapper>
                    );
                })}
            </StyledCardContent>
        </StyledCard>
    );
};