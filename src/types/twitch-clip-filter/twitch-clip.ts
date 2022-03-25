export type TwitchClip = {
    readonly id: string
    readonly url: string
    readonly channel_name: string
    readonly channel_id: number
    readonly clipper_id: number
    readonly clipper_name: string
    readonly title: string
    readonly views: number
    readonly date: string
    readonly tags: readonly number[]
}