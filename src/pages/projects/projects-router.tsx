import { Route, Routes } from 'react-router-dom';

import { Projects } from './projects';

import { LD49 } from '../game-jam/ld-49';
import { LD48 } from '../game-jam/ld-48';
import { LD47 } from '../game-jam/ld-47';
import { LD46 } from '../game-jam/ld-46';
import { LD39 } from '../game-jam/ld-39';
import { LD37 } from '../game-jam/ld-37';
import { LD35 } from '../game-jam/ld-35';
import { LD34 } from '../game-jam/ld-34';
import { LD33 } from '../game-jam/ld-33';
import { LD32 } from '../game-jam/ld-32';
import { LD31 } from '../game-jam/ld-31';
import { LD30 } from '../game-jam/ld-30';
import { LD29 } from '../game-jam/ld-29';
import { LD28 } from '../game-jam/ld-28';
import { LD27 } from '../game-jam/ld-27';
import { LD50 } from '../game-jam/ld-50';
import { GMTK2022 } from '../game-jam/gmtk-2022';

import { PizzaMan } from './pizza-man';
import { GGServer } from './gg-server';
import { TurkeyBot } from './turkey-bot';

import { ChanceCubesMC } from '../chance-cubes/chance-cubes';
import { HeadCrumbs } from '../mods/head-crumbs';
import { WitherCrumbs } from '../mods/wither-crumbs';
import { RaftIntegration } from '../mods/raft-integration';
import { SlimeRancherIntegration } from '../mods/slime-rancher-integration';

import { ProjectStatusEdit } from '../admin/project-status-edit';
import { FPDStats } from './fpdstats';
import { StreamAnimationsOverlay } from './stream-tools/animation-overlay/stream-animations-overlay';
import { YouTubeSubCount } from './stream-tools/yt-sub-count/youtube-sub-count';
import { TwitchGamesProject } from '../twitch-games/twitch-games-info';
import { authWrap } from '../../router';

export const ProjectsRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Projects />} />
            <Route path='/gmtk2022' element={<GMTK2022 />} />
            <Route path='/ld50' element={<LD50 />} />
            <Route path='/ld49' element={<LD49 />} />
            <Route path='/ld48' element={<LD48 />} />
            <Route path='/ld47' element={<LD47 />} />
            <Route path='/ld46' element={<LD46 />} />
            <Route path='/ld39' element={<LD39 />} />
            <Route path='/ld37' element={<LD37 />} />
            <Route path='/ld35' element={<LD35 />} />
            <Route path='/ld34' element={<LD34 />} />
            <Route path='/ld33' element={<LD33 />} />
            <Route path='/ld32' element={<LD32 />} />
            <Route path='/ld31' element={<LD31 />} />
            <Route path='/ld30' element={<LD30 />} />
            <Route path='/ld29' element={<LD29 />} />
            <Route path='/ld28' element={<LD28 />} />
            <Route path='/ld27' element={<LD27 />} />
            <Route path='/pizza-man' element={<PizzaMan />} />
            <Route path='/gg-server' element={<GGServer />} />
            <Route path='/turkey-bot' element={<TurkeyBot />} />
            <Route path='/chance-cubes-mc' element={<ChanceCubesMC />} />
            <Route path='/head-crumbs' element={<HeadCrumbs />} />
            <Route path='/wither-crumbs' element={<WitherCrumbs />} />
            <Route path='/raft-integration' element={<RaftIntegration />} />
            <Route path='/slime-rancher-integration' element={<SlimeRancherIntegration />} />
            <Route path='/statusedit' element={authWrap(<ProjectStatusEdit />, 'projects.editstatus')} />
            <Route path='/fpdstats' element={<FPDStats />} />
            <Route path='/streamanimationsoverlay' element={<StreamAnimationsOverlay />} />
            <Route path='/yt-sub-count' element={<YouTubeSubCount />} />
            <Route path='/twitch-games' element={<TwitchGamesProject />} />
        </Routes>
    );
};

export default ProjectsRouter;