import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { SteamKeyManagementList } from './list/steam-key-management-list';
import { SteamKeyManageList } from './manage-list/steam-key-manage-list';

export const SteamKeyManagementRouter = () => (
    <Routes>
        <Route path='/list' element={authWrap(<SteamKeyManagementList />, 'steamkeys.list')} />
        <Route path='/list/:id' element={authWrap(<SteamKeyManageList />, 'steamkeys.list')} />
        <Route path='/getkey' element={authWrap(<SteamKeyManageList />, 'steamkeys.list')} />
    </Routes>
);

export default SteamKeyManagementRouter;