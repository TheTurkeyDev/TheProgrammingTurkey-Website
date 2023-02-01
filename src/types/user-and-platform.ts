import { UserConnection } from './user-connection';
import { UserInfo } from './user-info';

export type UserAndPlatform = {
    readonly user_info: UserInfo
    readonly platforms: readonly UserConnection[]
}