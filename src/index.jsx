import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import { Notfound } from './notfound';
import { Info } from './pages/info';
import { MCModSupport } from './pages/mods/mc-mod-support';

import { LDStats } from './pages/ludum-dare/ld-stats';

import { ChanceCubesStats } from './pages/chance-cubes/chance-cubes-stats';
import { ChanceCubesRewardsStatus } from './pages/chance-cubes/chance-cubes-rewards-status'

import { Support } from './pages/support';
import { StreamLEDControl } from './pages/projects/stream-led-control';

import { Login } from './pages/auth/login';
import { LoginResponse } from './pages/auth/login-response';
import { UserProfile } from './pages/user/profile';
import { StreamTimerSetup } from './pages/small-apps/stream-timer-setup';
import { Logout } from './pages/auth/logout';
import { ChanceCubesManageContentCreators } from './pages/chance-cubes/chance-cubes-manage-content-creators';
import { UserManagement } from './pages/admin/user-management';
import { PermissionManagement } from './pages/admin/permission-management';
import { ChanceCubesRewardBuilder } from './pages/chance-cubes/chance-cubes-reward-builder';
import { UserPlatformAccountConnections } from './pages/user/user-platform-account-connections';
import { ProcessManagement } from './pages/admin/process-management';
import { YouTubeSubGetSetup } from './pages/small-apps/youtube-sub-get-setup';
import { TwitchClipTagger } from './pages/twitch-clip-filterer/twitch-clip-tagger';
import { TwitchClipsList } from './pages/twitch-clip-filterer/twitch-clips-list';
import { AuthWrapper } from './contexts/auth-context';
import { Toast } from './contexts/toast-context';
import { Overlay } from './contexts/overlay-context';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { TwitchGamesRouter } from './pages/twitch-games/twitch-games-router';
import { ProjectsRouter } from './pages/projects/projects-router';
import { PageWrapper } from './pages/base/page-wrapper';
import { AuthRoute } from './util/AuthRoute';

const routing = (
    <ThemeProvider theme={theme}>
        <AuthWrapper>
            <Toast>
                <Overlay>
                    <Router>
                        <PageWrapper>
                            <Switch>
                                <Route exact path='/' component={App} />
                                <Route path='/projects' component={ProjectsRouter} />

                                <Route exact path='/mod-support' component={MCModSupport} />
                                <Route exact path='/ld-stats' component={LDStats} />

                                <Route exact path='/chancecubes/stats' component={ChanceCubesStats} />
                                <Route exact path='/chancecubes/rewardstatus' component={ChanceCubesRewardsStatus} />
                                <AuthRoute exact path='/chancecubes/managecontentcreators' component={ChanceCubesManageContentCreators} perm='chancecubes.managecontentcreators' />
                                <AuthRoute exact path='/chancecubes/rewardbuilder' component={ChanceCubesRewardBuilder} />

                                <Route exact path='/stream-led-control' component={StreamLEDControl} />
                                <AuthRoute exact path='/streamtimer' component={StreamTimerSetup} perm='streamtimer.dashboard' />

                                <AuthRoute exact path='/twitchclipfilterer/clips' component={TwitchClipsList} perm='twitchclipfilter' />
                                <AuthRoute exact path='/twitchclipfilterer/tagger' component={TwitchClipTagger} perm='twitchclipfilter' />

                                <Route path='/twitchgames' component={TwitchGamesRouter} />

                                <Route exact path='/info' component={Info} />
                                <Route exact path='/support' component={Support} />

                                <Route exact path='/login' component={Login} />
                                <Route exact path='/logout' component={Logout} />
                                <Route exact path='/loginresp/:platform' component={LoginResponse} />

                                <AuthRoute exact path='/user/profile' component={UserProfile} />
                                <AuthRoute exact path='/user/connectedaccounts' component={UserPlatformAccountConnections} />
                                <AuthRoute exact path='/user/youtubesubget' component={YouTubeSubGetSetup} perm='proc.ytsubget' />

                                <AuthRoute exact path='/admin/usermanage' component={UserManagement} perm='admin.usermanage' />
                                <AuthRoute exact path='/admin/permissionmanage' component={PermissionManagement} perm='admin.managepermissions' />
                                <AuthRoute exact path='/admin/processmanage' component={ProcessManagement} perm='admin.manageprocesses' />

                                <Route component={Notfound} />
                            </Switch>
                        </PageWrapper>
                    </Router>
                </Overlay>
            </Toast>
        </AuthWrapper>
    </ThemeProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();