import { BracketContest } from './bracket-contest';

export type SimplifiedBracketContest = Omit<BracketContest, 'isSeries'>