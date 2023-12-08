import { UserPicksData } from './college-football-bowls-prediction-user-picks-data';

export type UserPicksGroup = {
    readonly name: string,
    readonly id: number
    readonly userPicks: readonly UserPicksData[]
}