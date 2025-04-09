import styled from 'styled-components';
import { BracketGame } from './bracket-game';
import { useBracket } from './bracket-context';
import { Headline5 } from 'gobble-lib-react';
import { emptyCompetitor } from './competitor';

const ChampGameWrapper = styled.div`
    align-self: center;
    width: 100%;
    padding: 4px;
    padding-bottom: 50px;
    background-color: ${({ theme }) => theme.surface.color}88;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const ChampLogo = styled.img`
    margin-bottom: 40px;
`;

export const BracketChamp = () => {
    const { numRounds, picks, contests } = useBracket();

    const realChamp = contests.find(p => p.bracketGameId === `r${numRounds}g0`);
    const champPick = picks.find(p => p.bracketGameId === `r${numRounds}g0`);
    const hasPick = !!champPick;

    const realChampComp = realChamp ? (realChamp.top.isWinner ? realChamp.top : (realChamp.bot.isWinner ? realChamp.bot : emptyCompetitor)) : emptyCompetitor;
    const pickChampComp = champPick ? (champPick.top.team.id === champPick.pick ? champPick.top : (champPick.bot.team.id === champPick.pick ? champPick.bot : emptyCompetitor)) : emptyCompetitor;
    const champComp = hasPick ? pickChampComp : realChampComp;

    const logo = champComp.team.logo;

    return (
        <ChampGameWrapper>
            <Headline5>Champion</Headline5>
            {champComp && <ChampLogo src={logo === '' ? 'https://assets.dev.sportscoresbot.com/team.svg' : logo} width={128} />}
            <BracketGame round={numRounds} bracketGameId={`r${numRounds}g${0}`} insetSide={0} />
        </ChampGameWrapper>
    );
};