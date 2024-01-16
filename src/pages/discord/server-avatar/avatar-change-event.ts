export type AvatarChangeEvent = {
    readonly name: string
    readonly start: string
    readonly end: string
    readonly file: string
    readonly priority: number
    readonly repeatType: RepeatType
    readonly physicalEnd: string
}

export enum RepeatType {
    NONE,
    WEEKLY,
    BI_WEEKLY,
    MONTHLY,
    QUARTERLY,
    YEARLY,
}
