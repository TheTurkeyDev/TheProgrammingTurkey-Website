import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { App } from './App';
import { Notfound } from './notfound';

import { Info } from './pages/info';

import { Projects } from './pages/projects/projects';
import { MCModSupport } from './pages/mods/mc-mod-support';

import { LDStats } from './pages/ludum-dare/ld-stats';
import { LD47 } from './pages/ludum-dare/ld-47';
import { LD46 } from './pages/ludum-dare/ld-46';
import { LD39 } from './pages/ludum-dare/ld-39';
import { LD37 } from './pages/ludum-dare/ld-37';
import { LD35 } from './pages/ludum-dare/ld-35';
import { LD34 } from './pages/ludum-dare/ld-34';
import { LD33 } from './pages/ludum-dare/ld-33';
import { LD32 } from './pages/ludum-dare/ld-32';
import { LD31 } from './pages/ludum-dare/ld-31';
import { LD30 } from './pages/ludum-dare/ld-30';
import { LD29 } from './pages/ludum-dare/ld-29';
import { LD28 } from './pages/ludum-dare/ld-28';
import { LD27 } from './pages/ludum-dare/ld-27';

import { PizzaMan } from './pages/projects/pizza-man';
import { GGServer } from './pages/projects/gg-server';
import { TurkeyBot } from './pages/projects/turkey-bot';

import { ChanceCubesStats } from './pages/chance-cubes/chance-cubes-stats';
import { ChanceCubesMC } from './pages/chance-cubes/chance-cubes';
import { ChanceCubesRewardsStatus } from './pages/chance-cubes/chance-cubes-rewards-status'
import { HeadCrumbs } from './pages/mods/head-crumbs';
import { WitherCrumbs } from './pages/mods/wither-crumbs';
import { RaftIntegration } from './pages/mods/raft-integration';
import { SlimeRancherIntegration } from './pages/mods/slime-rancher-integration';
import { Support } from './pages/support';
import { StreamLEDControl } from './pages/projects/stream-led-control';

import { AuthWrapper } from './contexts/auth-context';
import { Overlay } from './contexts/overlay-context';
import { Toast } from './contexts/toast-context';

import { TwitchLogin } from './pages/auth/twitch-login';
import { Login } from './pages/auth/login';
import { UserProfile } from './pages/user/profile';
import { StreamTimerSetup } from './pages/small-apps/stream-timer-setup';
import { Logout } from './pages/auth/logout';
import { ChanceCubesManageContentCreators } from './pages/chance-cubes/chance-cubes-manage-content-creators';
import { ProjectStatusEdit } from './pages/admin/project-status-edit';
import { UserManagement } from './pages/admin/user-management';
import { PermissionManagement } from './pages/admin/permission-management';
import { ChanceCubesRewardBuilder } from './pages/chance-cubes/chance-cubes-reward-builder';
import { UserConnectedAccount } from './pages/user/user-account-connections';
import { YouTubeLogin } from './pages/auth/youtube-login';
import { ProcessManagement } from './pages/admin/process-management';
import { YouTubeSubGetSetup } from './pages/small-apps/youtube-sub-get-setup';
import { TwitchClipFilterer } from './pages/small-apps/twitch-clip-filterer';


const routing = (
    <AuthWrapper>
        <Toast>
            <Overlay>
                <Router>
                    <Switch>
                        <Route exact path='/' component={App} />
                        <Route exact path='/projects' component={Projects} />
                        <Route exact path='/projects/ld47' component={LD47} />
                        <Route exact path='/projects/ld46' component={LD46} />
                        <Route exact path='/projects/ld39' component={LD39} />
                        <Route exact path='/projects/ld37' component={LD37} />
                        <Route exact path='/projects/ld35' component={LD35} />
                        <Route exact path='/projects/ld34' component={LD34} />
                        <Route exact path='/projects/ld33' component={LD33} />
                        <Route exact path='/projects/ld32' component={LD32} />
                        <Route exact path='/projects/ld31' component={LD31} />
                        <Route exact path='/projects/ld30' component={LD30} />
                        <Route exact path='/projects/ld29' component={LD29} />
                        <Route exact path='/projects/ld28' component={LD28} />
                        <Route exact path='/projects/ld27' component={LD27} />
                        <Route exact path='/projects/pizza-man' component={PizzaMan} />
                        <Route exact path='/projects/gg-server' component={GGServer} />
                        <Route exact path='/projects/turkey-bot' component={TurkeyBot} />
                        <Route exact path='/projects/chance-cubes-mc' component={ChanceCubesMC} />
                        <Route exact path='/projects/head-crumbs' component={HeadCrumbs} />
                        <Route exact path='/projects/wither-crumbs' component={WitherCrumbs} />
                        <Route exact path='/projects/raft-integration' component={RaftIntegration} />
                        <Route exact path='/projects/slime-rancher-integration' component={SlimeRancherIntegration} />
                        <Route exact path='/projects/statusedit' component={ProjectStatusEdit} />
                        <Route exact path='/mod-support' component={MCModSupport} />
                        <Route exact path='/ld-stats' component={LDStats} />

                        <Route exact path='/chancecubes/stats' component={ChanceCubesStats} />
                        <Route exact path='/chancecubes/rewardstatus' component={ChanceCubesRewardsStatus} />
                        <Route exact path='/chancecubes/managecontentcreators' component={ChanceCubesManageContentCreators} />
                        <Route exact path='/chancecubes/rewardbuilder' component={ChanceCubesRewardBuilder} />

                        <Route exact path='/stream-led-control' component={StreamLEDControl} />
                        <Route exact path='/streamtimer' component={StreamTimerSetup} />
                        <Route exact path='/twitchclipfilterer' component={TwitchClipFilterer} />

                        <Route exact path='/info' component={Info} />
                        <Route exact path='/support' component={Support} />

                        <Route exact path='/login' component={Login} />
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/twitchlogin' component={TwitchLogin} />
                        <Route exact path='/youtubelogin' component={YouTubeLogin} />

                        <Route exact path='/user/profile' component={UserProfile} />
                        <Route exact path='/user/connectedaccounts' component={UserConnectedAccount} />
                        <Route exact path='/user/youtubesubget' component={YouTubeSubGetSetup} />

                        <Route exact path='/admin/usermanage' component={UserManagement} />
                        <Route exact path='/admin/permissionmanage' component={PermissionManagement} />
                        <Route exact path='/admin/processmanage' component={ProcessManagement} />

                        <Route component={Notfound} />
                    </Switch>
                </Router>
            </Overlay>
        </Toast>
    </AuthWrapper>
)

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();