export type LDEvent = {
    readonly ld_event_num: number
    readonly games: number
    readonly event_type: string
    readonly categories: readonly LDEventCatStats[]
}

export type LDEventCatStats = {
    readonly category: string
    readonly place: number
    readonly stars: number
}