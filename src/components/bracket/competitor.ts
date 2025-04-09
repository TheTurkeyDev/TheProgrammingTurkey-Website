export type Competitor = {
    readonly score: number,
    readonly position: number,
    readonly isHome: boolean,
    readonly isWinner: boolean,
    readonly rank: string,
    readonly type: 'TEAM' | 'INDIVIDUAL',
    readonly team: Team
}

export type Team = {
    readonly id: string
    readonly logo: string,
    readonly name: string,
    readonly nameShort: string,
    readonly abbr: string,
    readonly primaryColor: string,
    readonly secondaryColor: string
}

export const emptyCompetitor: Competitor = {
    score: 0,
    position: 0,
    isHome: false,
    isWinner: false,
    rank: '',
    type: 'TEAM',
    team: {
        id: '',
        logo: '',
        name: '',
        nameShort: '',
        abbr: '',
        primaryColor: '',
        secondaryColor: ''
    }
};