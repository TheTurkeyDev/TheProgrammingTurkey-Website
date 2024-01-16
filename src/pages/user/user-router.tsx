import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { UserProfile } from './profile';
import { UserPlatformAccountConnections } from './user-platform-account-connections';
import { YouTubeSubGetSetup } from '../projects/stream-tools/yt-sub-count/youtube-sub-get-setup';
import { AnimatedStreamOverlaySetup } from '../projects/stream-tools/animation-overlay/stream-animation-overlay-setup';

export const UserRouter = () => (
    <Routes>
        <Route path='/profile' element={authWrap(<UserProfile />)} />
        <Route path='/connectedaccounts' element={authWrap(<UserPlatformAccountConnections />)} />
        <Route path='/youtubesubget' element={authWrap(<YouTubeSubGetSetup />, 'proc.ytsubget')} />
        <Route path='/streamanimationoverlay' element={authWrap(<AnimatedStreamOverlaySetup />, 'streamanimationoverlay')} />
    </Routes>
);

export default UserRouter;