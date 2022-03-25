import styled from 'styled-components';
import { IconWithPopOver } from '../../../components/pop-over';
import { UserAndPlatform } from '../../../types/user-and-platform';
import { UserConnection } from '../../../types/user-connection';

const PlatformsWrapper = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

const PlatformInfoWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    gap: 8px;
`;

type UserManagementPlatformsProps = {
    readonly platfroms: readonly UserConnection[]
}
export const UserManagementPlatforms = ({ platfroms }: UserManagementPlatformsProps) => {
    return (
        <PlatformsWrapper>
            {
                platfroms.map(userPlatform => (
                    <IconWithPopOver key={userPlatform.platform} direction='right' icon={`fab fa-${userPlatform.platform.toLowerCase()}`}>
                        <PlatformInfoWrapper>
                            <span>
                                {userPlatform.platform_id}
                            </span>
                            <span>
                                {userPlatform.platform_display_name}
                            </span>
                        </PlatformInfoWrapper>
                    </IconWithPopOver>
                ))
            }
        </PlatformsWrapper>
    );
};