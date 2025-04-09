import { Competitor } from './competitor';

export type BracketContest = {
    readonly bracketGameId: string
    readonly isSeries: boolean
    readonly top: Competitor
    readonly bot: Competitor
}