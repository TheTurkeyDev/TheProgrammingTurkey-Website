import { PicksData } from './college-football-bowls-prediction-picks-data';

export type UserPicksData = {
    readonly userId: string,
    readonly userName: string,
    readonly displayName: string,
    readonly picks: readonly PicksData[],
    readonly points: number,
    readonly maxPoints: number,
    readonly correct: number
}