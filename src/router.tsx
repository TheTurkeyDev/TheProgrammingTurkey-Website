import { Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page';
import { Info } from './pages/info';
import { MCModSupport } from './pages/mods/mc-mod-support';

import { LDStats } from './pages/ludum-dare/ld-stats';

import { ChanceCubesRewardsStatus } from './pages/chance-cubes/reward-status/chance-cubes-rewards-status';

import { Support } from './pages/support';
import { StreamLEDControl } from './pages/projects/stream-led-control';

import { Login } from './pages/auth/login';
import { LoginResponse } from './pages/auth/login-response';
import { Logout } from './pages/auth/logout';
import { UserProfile } from './pages/user/profile';
import { StreamTimerSetup } from './pages/projects/stream-tools/stream-timer/stream-timer-setup';
import { ChanceCubesManageContentCreators } from './pages/chance-cubes/content-creators/chance-cubes-manage-content-creators';
import { UserManagement } from './pages/admin/user-mangement/user-management';
import { PermissionManagement } from './pages/admin/permission-mangement/permission-management';
import { ChanceCubesRewardBuilder } from './pages/chance-cubes/chance-cubes-reward-builder';
import { UserPlatformAccountConnections } from './pages/user/user-platform-account-connections';
import { ProcessManagement } from './pages/admin/processes/process-management';
import { YouTubeSubGetSetup } from './pages/projects/stream-tools/yt-sub-count/youtube-sub-get-setup';
import { TwitchClipTagger } from './pages/twitch-clip-filterer/twitch-clip-tagger';
import { TwitchClipsList } from './pages/twitch-clip-filterer/twitch-clips-list';
import { TwitchGamesRouter } from './pages/twitch-games/twitch-games-router';
import { ProjectsRouter } from './pages/projects/projects-router';
import { AuthRoute } from './util/auth-route';
import { AnimatedStreamOverlaySetup } from './pages/projects/stream-tools/animation-overlay/stream-animation-overlay-setup';
import { MJRBotFAQ } from './pages/mjr-bot-faq';
import { NotFound } from '@theturkeydev/gobble-lib-react';

export const authWrap = (element: JSX.Element, perm?: string) => <AuthRoute perm={perm}>{element}</AuthRoute>;

export const Routing = () => (
    <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/projects/*' element={<ProjectsRouter />} />

        <Route path='/mod-support' element={<MCModSupport />} />
        <Route path='/ld-stats' element={<LDStats />} />

        {/* <Route path='/chancecubes/stats' element={ChanceCubesStats} /> */}
        <Route path='/chancecubes/rewardstatus' element={<ChanceCubesRewardsStatus />} />
        <Route path='/chancecubes/managecontentcreators' element={authWrap(<ChanceCubesManageContentCreators />, 'chancecubes.managecontentcreators')} />
        <Route path='/chancecubes/rewardbuilder' element={<ChanceCubesRewardBuilder />} />

        <Route path='/stream-led-control' element={<StreamLEDControl />} />

        <Route path='/twitchclipfilterer/clips' element={authWrap(<TwitchClipsList />, 'twitchclipfilter')} />
        <Route path='/twitchclipfilterer/tagger' element={authWrap(<TwitchClipTagger />, 'twitchclipfilter')} />

        <Route path='/twitchgames/*' element={<TwitchGamesRouter />} />

        <Route path='/info' element={<Info />} />
        <Route path='/support' element={<Support />} />
        <Route path='/mjrbotfaq' element={<MJRBotFAQ />} />

        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/loginresp/:platform' element={<LoginResponse />} />

        <Route path='/user/profile' element={authWrap(<UserProfile />)} />
        <Route path='/user/connectedaccounts' element={authWrap(<UserPlatformAccountConnections />)} />
        <Route path='/user/youtubesubget' element={authWrap(<YouTubeSubGetSetup />, 'proc.ytsubget')} />
        <Route path='/user/streamtimer' element={authWrap(<StreamTimerSetup />, 'streamtimer.dashboard')} />
        <Route path='/user/streamanimationoverlay' element={authWrap(<AnimatedStreamOverlaySetup />, 'streamanimationoverlay')} />

        <Route path='/admin/usermanage' element={authWrap(<UserManagement />, 'admin.usermanage')} />
        <Route path='/admin/permissionmanage' element={authWrap(<PermissionManagement />, 'admin.managepermissions')} />
        <Route path='/admin/processmanage' element={authWrap(<ProcessManagement />, 'admin.manageprocesses')} />

        <Route path='/*' element={<NotFound />} />
    </Routes>
);