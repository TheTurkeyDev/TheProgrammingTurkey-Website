import { WithChildren } from 'gobble-lib-react';
import { createContext, useContext } from 'react';
import { BracketContest } from './bracket-contest';
import { BracketPickedContest } from './bracket-picked-contest';
import { Competitor } from './competitor';
import { SimplifiedBracketContest } from './bracket-simplified-contes';

type BracketContextType = {
    readonly numTeams: number
    readonly numRounds: number
    readonly contests: readonly BracketContest[]
    readonly picks: readonly BracketPickedContest[]
    readonly isAdmin?: boolean
    readonly teamClick?: (contest: BracketPickedContest, competitor: Competitor, isTop: boolean) => void
}

const BracketContext = createContext<BracketContextType | null>(null);

export const useBracket = () => {
    const info = useContext(BracketContext);
    if (!info)
        throw new Error('Bracket Context is undefined! Must be used from within a Bracket Context Provider!');
    return info;
};

type BracketContextWrapperProps = WithChildren & {
    readonly numTeams: number
    readonly contests: readonly BracketContest[]
    readonly picks: readonly BracketPickedContest[]
    readonly isAdmin?: boolean
    readonly teamClick?: (contest: SimplifiedBracketContest, competitor: Competitor, isTop: boolean) => void
}

export const getRoundAndGameNum = (index: number, totalTeams: number, round: number = 1, gamesInRound: number = totalTeams / 2): readonly [number, number] => {
    if (index < gamesInRound)
        return [round - 1, index];
    return getRoundAndGameNum(index - gamesInRound, totalTeams, round + 1, gamesInRound / 2);
};

export const BracketContextWrapper = ({ children, numTeams, contests, picks, isAdmin = false, teamClick }: BracketContextWrapperProps) => {

    const values = {
        numTeams,
        numRounds: numTeams > 0 ? Math.ceil(Math.log2(numTeams)) - 1 : 0,
        contests,
        picks,
        isAdmin,
        teamClick
    };

    return (
        <BracketContext.Provider value={values}>
            {children}
        </BracketContext.Provider>
    );
};