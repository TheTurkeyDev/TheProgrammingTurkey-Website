import { Route, Routes } from 'react-router-dom';
import { F1ConstructorPredictions } from './f1-constructors/f1-constructor-prediction';

export const PredictionRouter = () => (
    <Routes>
        <Route path='/f1constructor' element={<F1ConstructorPredictions />} />
    </Routes>
);

export default PredictionRouter;