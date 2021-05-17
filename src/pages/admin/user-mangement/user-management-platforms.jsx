import styled from 'styled-components'
import { IconWithPopOver } from '../../../components/pop-over';

const PlatformsWrapper = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

const PlatformInfoWrapper = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    gap: 8px;
`

export const UserManagementPlatforms = ({ platfroms }) => {
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
    )
}