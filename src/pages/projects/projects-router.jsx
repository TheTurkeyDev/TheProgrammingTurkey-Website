import { Route, Switch } from 'react-router-dom';

import { Projects } from './projects';

import { LD47 } from '../ludum-dare/ld-47';
import { LD46 } from '../ludum-dare/ld-46';
import { LD39 } from '../ludum-dare/ld-39';
import { LD37 } from '../ludum-dare/ld-37';
import { LD35 } from '../ludum-dare/ld-35';
import { LD34 } from '../ludum-dare/ld-34';
import { LD33 } from '../ludum-dare/ld-33';
import { LD32 } from '../ludum-dare/ld-32';
import { LD31 } from '../ludum-dare/ld-31';
import { LD30 } from '../ludum-dare/ld-30';
import { LD29 } from '../ludum-dare/ld-29';
import { LD28 } from '../ludum-dare/ld-28';
import { LD27 } from '../ludum-dare/ld-27';

import { PizzaMan } from './pizza-man';
import { GGServer } from './gg-server';
import { TurkeyBot } from './turkey-bot';

import { ChanceCubesMC } from '../chance-cubes/chance-cubes';
import { HeadCrumbs } from '../mods/head-crumbs';
import { WitherCrumbs } from '../mods/wither-crumbs';
import { RaftIntegration } from '../mods/raft-integration';
import { SlimeRancherIntegration } from '../mods/slime-rancher-integration';

import { ProjectStatusEdit } from '../admin/project-status-edit';
import { LD48 } from '../ludum-dare/ld-48';
import { AuthRoute } from '../../util/AuthRoute';

export const ProjectsRouter = () => {
    return (
        <Switch>
            <Route exact path='/projects/' component={Projects} />
            <Route exact path='/projects/ld48' component={LD48} />
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
            <AuthRoute exact path='/projects/statusedit' component={ProjectStatusEdit} perm='projects.editstatus' />
        </Switch>
    )
}