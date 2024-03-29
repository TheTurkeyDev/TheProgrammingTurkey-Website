import { Route, Routes } from 'react-router-dom';
import { F1ConstructorPredictions } from './f1-constructors/f1-constructor-prediction';
import { CollegeFootballBowlsPrediction } from './college-football-bowls/college-football-bowls-prediction';
import { CFBMyPicks } from './college-football-bowls/my-picks/cfb-prediction-my-picks';
import { authWrap } from '../../router';
import { F1DriverPredictions } from './f1-driver/f1-driver-prediction';

export const PredictionRouter = () => (
    <Routes>
        <Route path='/f1/:year/constructor' element={<F1ConstructorPredictions />} />
        <Route path='/f1/:year/driver' element={<F1DriverPredictions />} />
        <Route path='/fbs-bowls-prediction/:groupId' element={authWrap(<CollegeFootballBowlsPrediction />)} />
        <Route path='/fbs-bowls-prediction/:groupId/my-picks' element={authWrap(<CFBMyPicks />)} />
    </Routes>
);

export default PredictionRouter;