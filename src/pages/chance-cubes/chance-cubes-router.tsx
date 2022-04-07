import { Route, Routes } from 'react-router-dom';
import { ChanceCubesRewardsStatus } from './reward-status/chance-cubes-rewards-status';
import { ChanceCubesManageContentCreators } from './content-creators/chance-cubes-manage-content-creators';
import { ChanceCubesRewardBuilder } from './chance-cubes-reward-builder';
import { ChanceCubesStatsCharts } from './stats/chance-cubes-stats';
import { authWrap } from '../../router';

export const ChanceCubesRouter = () => (
    <Routes>
        <Route path='/stats' element={<ChanceCubesStatsCharts />} />
        <Route path='/rewardstatus' element={<ChanceCubesRewardsStatus />} />
        <Route path='/managecontentcreators' element={authWrap(<ChanceCubesManageContentCreators />, 'chancecubes.managecontentcreators')} />
        <Route path='/rewardbuilder' element={<ChanceCubesRewardBuilder />} />
    </Routes>
);

export default ChanceCubesRouter;