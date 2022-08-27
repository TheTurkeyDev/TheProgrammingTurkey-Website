import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { SteamKeyClaim } from './claim-key/steam-key-claim';
import { SteamKeysClaimed } from './claim-key/steam-key-claimed';
import { SteamKeyManagementList } from './list/steam-key-management-list';
import { SteamKeyManageList } from './manage-list/steam-key-manage-list';

export const SteamKeyManagementRouter = () => (
    <Routes>
        <Route path='/list' element={authWrap(<SteamKeyManagementList />, 'steamkeys.list')} />
        <Route path='/list/:id' element={authWrap(<SteamKeyManageList />, 'steamkeys.list')} />
        <Route path='/claim' element={authWrap(<SteamKeysClaimed />)} />
        <Route path='/claim/:id' element={authWrap(<SteamKeyClaim />)} />
    </Routes>
);

export default SteamKeyManagementRouter;