import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { App } from './App';
import { Notfound } from './notfound';

import { Info } from './pages/info';

import { Projects } from './pages/projects/projects';
import { MCModSupport } from './pages/projects/mc-mod-support';

import { LDStats } from './pages/projects/ludum-dare/ld-stats';
import { LD47 } from './pages/projects/ludum-dare/ld-47';
import { LD46 } from './pages/projects/ludum-dare/ld-46';
import { LD39 } from './pages/projects/ludum-dare/ld-39';
import { LD37 } from './pages/projects/ludum-dare/ld-37';
import { LD35 } from './pages/projects/ludum-dare/ld-35';
import { LD34 } from './pages/projects/ludum-dare/ld-34';
import { LD33 } from './pages/projects/ludum-dare/ld-33';
import { LD32 } from './pages/projects/ludum-dare/ld-32';
import { LD31 } from './pages/projects/ludum-dare/ld-31';
import { LD30 } from './pages/projects/ludum-dare/ld-30';
import { LD29 } from './pages/projects/ludum-dare/ld-29';
import { LD28 } from './pages/projects/ludum-dare/ld-28';
import { LD27 } from './pages/projects/ludum-dare/ld-27';

import { PizzaMan } from './pages/projects/other/pizza-man';
import { GGServer } from './pages/projects/other/gg-server';
import { TurkeyBot } from './pages/projects/other/turkey-bot';

import { ChanceCubesStats } from './pages/projects/mods/chance-cubes/chance-cubes-stats';
import { ChanceCubesMC } from './pages/projects/mods/chance-cubes/chance-cubes';
import { ChanceCubesRewardsStatus } from './pages/projects/mods/chance-cubes/chance-cubes-rewards-status'
import { HeadCrumbs } from './pages/projects/mods/head-crumbs';
import { WitherCrumbs } from './pages/projects/mods/wither-crumbs';
import { RaftIntegration } from './pages/projects/mods/raft-integration';
import { SlimeRancherIntegration } from './pages/projects/mods/slime-rancher-integration';
import { Support } from './pages/support';

const routing = (
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
            <Route exact path='/mod-support' component={MCModSupport} />
            <Route exact path='/ld-stats' component={LDStats} />
            <Route exact path='/chancecubes/stats' component={ChanceCubesStats} />
            <Route exact path='/chancecubes/rewardstatus' component={ChanceCubesRewardsStatus} />

            <Route exact path='/info' component={Info} />
            <Route exact path='/support' component={Support} />
            <Route component={Notfound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

module.hot.accept();