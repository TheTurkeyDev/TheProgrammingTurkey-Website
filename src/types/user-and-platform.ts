import { UserConnection } from './user-connection';

export type UserAndPlatform = {
    readonly user_id: string
    readonly display_name: string
    readonly platforms: readonly UserConnection[]
}