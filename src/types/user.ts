import { Platform } from './platform';

export type User = {
    readonly userID: string
    readonly displayName: string
    readonly avatar: string
    readonly permissions: readonly string[]
    readonly platforms: readonly Platform[]
}