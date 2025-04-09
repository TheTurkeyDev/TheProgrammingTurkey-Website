import styled from 'styled-components';
import { BracketCompetitor } from './bracket-competitor';
import { Body1, Icon } from 'gobble-lib-react';
import { useNavigate } from 'react-router-dom';
import { Competitor } from './competitor';
import { useBracket } from './bracket-context';
import { BracketGamePickStatus } from './bracket-game-pick-status';

const FullWrapper = styled.div`
    display: grid;
    grid-template-columns: max-content;
    grid-template-rows: 12px max-content 12px;
`;

const GameWrapper = styled.div`
    height: 54px;
    min-height: 44px;
    width: 150px;
    padding: 6px 8px;
    background-color: ${({ theme }) => theme.surface.color};
    color: ${({ theme }) => theme.surface.on};
    border: 1px solid #212121;
    row-gap: 4px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`;

const LeftWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    align-items: center;
    column-gap: 16px;
    row-gap: 2px;
`;

const EmptyTeam = styled.div`
    height: 20px;
    min-height: 20px;
`;

const Text = styled(Body1)`
    font-size: 12px;
    line-height: 12px;
`;

type BracketGameProps = {
    readonly round: number
    readonly bracketGameId: string
    readonly insetSide: number
}

export const BracketGame = ({ round, bracketGameId, insetSide }: BracketGameProps) => {
    const navigate = useNavigate();
    const { contests, picks, teamClick, isAdmin } = useBracket();

    const contest = contests.find(c => c.bracketGameId === bracketGameId);
    const pick = picks.find(c => c.bracketGameId === bracketGameId);

    if (!contest)
        return <div />;

    const styles: React.CSSProperties = {
        gridArea: contest.bracketGameId,
        marginTop: round > 0 ? '-40px' : 0,
        marginBottom: round > 0 ? '-40px' : 0,
        marginLeft: (round > 1 && insetSide === -1) ? '-40px' : '',
        marginRight: (round > 1 && insetSide === 1) ? '-40px' : ''
    };

    const hasRTT = !!contest.top.team.id;
    const hasTopTeam = hasRTT || !!pick?.top?.team?.id;
    const hasRBT = !!contest.bot.team.id;
    const hasBotTeam = hasRBT || !!pick?.bot?.team?.id;
    const hasWinner = contest.top.isWinner || contest.bot.isWinner;

    const onTeamClick = !!teamClick ? (comp: Competitor, isTop: boolean) => teamClick(pick ?? contest, comp, isTop) : undefined;

    return (
        <FullWrapper style={styles}>
            <BracketGamePickStatus top={true} realComp={contest.top} pickComp={pick?.top} />
            <GameWrapper>
                <LeftWrapper>
                    <div />
                    {!hasTopTeam
                        ? <EmptyTeam />
                        : <BracketCompetitor
                            isTop={true}
                            competitor={hasRTT || !pick ? contest.top : pick.top}
                            hasWinner={hasWinner}
                            isLoser={hasWinner && !contest.top.isWinner}
                            state={!isAdmin && hasWinner && contest.top.isWinner ? (contest.top.team.id === pick?.pick ? 0 : 1) : -1}
                            teamClick={onTeamClick} />
                    }
                    {!hasBotTeam
                        ? <EmptyTeam />
                        : <BracketCompetitor
                            isTop={false}
                            competitor={hasRBT || !pick ? contest.bot : pick.bot}
                            hasWinner={hasWinner}
                            isLoser={hasWinner && !contest.bot.isWinner}
                            state={!isAdmin && hasWinner && contest.bot.isWinner ? (contest.bot.team.id === pick?.pick ? 0 : 1) : -1}
                            teamClick={onTeamClick} />
                    }
                </LeftWrapper>
                {isAdmin && <Icon className='fas fa-info-circle' onClick={() => navigate(`contest/${contest.bracketGameId}`)} />}
            </GameWrapper>
            <BracketGamePickStatus top={false} realComp={contest.bot} pickComp={pick?.bot} />
        </FullWrapper>
    );
};