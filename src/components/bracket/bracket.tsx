import styled from 'styled-components';
import { BracketChamp } from './bracket-champ';
import { BracketContest } from './bracket-contest';
import { Competitor } from './competitor';
import { BracketPickedContest } from './bracket-picked-contest';
import { BracketContextWrapper } from './bracket-context';
import { BracketSide } from './bracket-side';
import { SimplifiedBracketContest } from './bracket-simplified-contes';

const BracketWrapper = styled.div`
    max-width: fit-content;
    width: 100%;
    display: grid;
    gap: 16px;
    overflow-x: auto;
`;

type BracketProps = {
    readonly numTeams: number
    readonly contests: readonly BracketContest[]
    readonly picks: readonly BracketPickedContest[]
    readonly isAdmin?: boolean
    readonly isTwoSided?: boolean
    readonly teamClick?: (contest: SimplifiedBracketContest, competitor: Competitor, isTop: boolean) => void
}

export const Bracket = ({ numTeams, contests, picks, isAdmin, isTwoSided = true, teamClick }: BracketProps) => {
    return (
        <BracketContextWrapper numTeams={numTeams} contests={contests} picks={picks} isAdmin={isAdmin} teamClick={teamClick}>
            <BracketWrapper style={{ gridTemplateColumns: `auto auto ${isTwoSided ? 'auto' : ''}` }}>
                <BracketSide left={true} isTwoSided={isTwoSided}/>
                <BracketChamp />
                {isTwoSided && <BracketSide left={false} />}
            </BracketWrapper>
        </BracketContextWrapper>
    );
};