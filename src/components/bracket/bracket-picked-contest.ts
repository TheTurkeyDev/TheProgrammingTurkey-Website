import { Competitor } from './competitor';

export type BracketPickedContest = {
    readonly bracketGameId: string
    readonly top: Competitor
    readonly bot: Competitor
    readonly pick?: string
}