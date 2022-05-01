export type Suggestion = {
    readonly id: number
    readonly box_id: string
    readonly suggester: string
    readonly suggestion: string
    readonly verified: boolean
    readonly deleted: boolean
    readonly timestamp: string
}