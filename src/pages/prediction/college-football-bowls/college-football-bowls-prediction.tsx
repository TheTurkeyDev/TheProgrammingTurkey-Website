import { Body1, ContainedButton, Headline2, useFetch } from 'gobble-lib-react';
import styled from 'styled-components';
import { getDevAPIBase } from '../../../network/network-helper';
import { getParams } from '../../../network/auth-network';
import { Fragment } from 'react';
import { GameData } from './college-football-bowls-prediction-game-data';
import { HeaderLine } from './college-football-bowls-prediction-header-line';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPicksGroup } from './college-football-bowls-prediction-user-picks-group';

const PageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 8px;
`;

const GamesTableScrollWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

const GamesTable = styled.div`
    display: grid;
    justify-items: center;
    column-gap: 8px;
    width: 100%;
`;

const TimeWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    height: fit-content;
    align-self: center;
    width: max-content;
`;

const GameWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 8px;
    padding-inline: 8px;
`;

const TeamLogo = styled.img`
    width: 64px;
    height: 64px;
`;

const VerticalLine = styled.div`
    width: 1px;
    background-color: white;
`;

const PickWrapper = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
`;

const PointsText = styled(Body1)`
    position: absolute;
    right: 2px;
    bottom: 1px; 
`;

export const CollegeFootballBowlsPrediction = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [games, loading] = useFetch<readonly GameData[]>(`${getDevAPIBase()}/predictions/fbs-bowl/games`, {
        requestData: getParams
    });
    const [groupPicks, loadingGP] = useFetch<UserPicksGroup>(`${getDevAPIBase()}/predictions/fbs-bowl/group/${groupId}`, {
        requestData: getParams
    });

    const userPicks = [...(groupPicks?.userPicks ?? [])].sort((a, b) => {
        if (a.points !== b.points)
            return b.points - a.points;
        if (a.correct !== b.correct)
            return b.correct - a.correct;
        return 1;
    });

    return (
        <PageContainer>
            <Headline2>FBS Bowls Predictions</Headline2>
            <ContainedButton onClick={() => navigate('my-picks')}>Edit My Picks</ContainedButton>
            <GamesTableScrollWrapper>
                <GamesTable style={{ gridTemplateColumns: `repeat(${userPicks.length + 2}, min-content) 1fr` }}>
                    {HeaderLine('', userPicks, false, k => k.userName)}
                    {HeaderLine('Points', userPicks, false, k => k.points ?? '')}
                    {HeaderLine('Max Points', userPicks, true, k => k.maxPoints ?? '')}
                    {HeaderLine('Correct', userPicks, true, k => k.correct ?? '')}
                    {
                        games?.map(g => {
                            const homeWon = !!g.winnerId && g.winnerId === g.homeId;
                            const awayWon = !!g.winnerId && g.winnerId === g.awayId;
                            const homeStyles = { filter: awayWon ? 'grayscale(0.75)' : '', opacity: awayWon ? '0.5' : '1' };
                            const awayStyles = { filter: homeWon ? 'grayscale(0.75)' : '', opacity: homeWon ? '0.5' : '1' };
                            const dateTime = new Date(g.gameTime);
                            return (
                                <Fragment key={g.id}>
                                    <TimeWrapper>
                                        <Body1>{dateTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</Body1>
                                        <Body1>{dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hourCycle: 'h12' })}</Body1>
                                    </TimeWrapper>
                                    <GameWrapper>
                                        <TeamLogo src={g.homeLogo} style={homeStyles} />
                                        <VerticalLine />
                                        <TeamLogo src={g.awayLogo} style={awayStyles} />
                                    </GameWrapper>
                                    {
                                        userPicks.map((upd, i) => {
                                            const userGamePick = upd.picks.find(up => up.gameId === g.id);
                                            const isHomePick = g.homeId === userGamePick?.pick;
                                            const logo = isHomePick ? g.homeLogo : g.awayLogo;
                                            return (
                                                <PickWrapper key={upd.userId} style={{ backgroundColor: i % 2 === 0 ? '#5d76d933' : '' }}>
                                                    {userGamePick ? <TeamLogo src={logo} style={isHomePick ? homeStyles : awayStyles} /> : <Body1>N/A</Body1>}
                                                    <PointsText style={{ color: (homeWon && isHomePick) || (awayWon && !isHomePick) ? 'green' : ((homeWon && !isHomePick) || (awayWon && isHomePick) ? 'red' : '') }}>{userGamePick?.points}</PointsText>
                                                </PickWrapper>);
                                        })
                                    }
                                    <div />
                                </Fragment>
                            );
                        })
                    }
                </GamesTable>
            </ GamesTableScrollWrapper>
        </PageContainer>
    );
};