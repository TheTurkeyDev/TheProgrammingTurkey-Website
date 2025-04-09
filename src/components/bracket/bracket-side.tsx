import { styled } from 'styled-components';
import { getRoundAndGameNum, useBracket } from './bracket-context';
import { BracketGame } from './bracket-game';

const Wrapper = styled.div`
    display: grid;
    column-gap: 8px;
    width: 100%;
    justify-content: center;
`;

const getStringForRound = (round: number, row: number, numTeams: number, leftSide: boolean) => {
    const spacing = Math.pow(2, round + 1);
    const lookup = Math.pow(2, round) - 1;
    const isGameCell = (row % spacing) === lookup;
    const roundGameNum = (row - lookup) / spacing;
    const halfRoundNumGames = (numTeams / spacing) / 2;
    return isGameCell ? `r${round}g${(leftSide ? 0 : halfRoundNumGames) + roundGameNum}` : '.';
};

type BracketSideProps = {
    readonly left: boolean
    readonly isTwoSided?: boolean
}

export const BracketSide = ({ left, isTwoSided = true }: BracketSideProps) => {
    const { numTeams, numRounds } = useBracket();

    const sideTeams = isTwoSided ? numTeams / 2 : numTeams;

    const areas = Array.from({ length: (sideTeams - 1) * numRounds }, (_, i) => i)
        .reduce((str, i, _, arr) => {
            const round = i % numRounds;
            const rRound = numRounds - (round + 1);
            const row = (i - round) / numRounds;
            return `${str}${getStringForRound(left ? round : rRound, row, numTeams, left)}${i % numRounds === numRounds - 1 ? `"\n${i !== arr.length - 1 ? '"' : ''}` : ' '}`;
        }, '"');

    return (
        <Wrapper style={{ gridTemplateAreas: areas, gridTemplateColumns: `repeat(${numRounds}, auto)` }}>
            {
                Array.from({ length: (sideTeams - 1) - (isTwoSided ? 0 : 1) }, (_, i) => i).map(i => {
                    const [round, gameNum] = getRoundAndGameNum(i, numTeams);
                    const roundNumGames = left ? 0 : (numTeams / Math.pow(2, round + 1)) / 2;
                    const gameId = `r${round}g${roundNumGames + gameNum}`;
                    return <BracketGame key={gameId} round={round} bracketGameId={gameId} insetSide={left ? -1 : 1} />;
                })
            }
        </Wrapper>
    );
};