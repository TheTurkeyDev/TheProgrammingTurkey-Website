import { Route, Routes } from 'react-router-dom';

import { authWrap } from '../../router';
import { DinkumIntegration } from './dinkum-integration/dinkum-integration';

export const GameSettingsRouter = () => {
    return (
        <Routes>
            <Route path='/dinkum' element={authWrap(<DinkumIntegration />, 'gamesettings')} />
        </Routes>
    );
};

export default GameSettingsRouter;