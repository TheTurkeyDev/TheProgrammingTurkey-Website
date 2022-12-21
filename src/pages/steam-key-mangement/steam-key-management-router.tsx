import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { SteamKeyClaim } from './claim-key/steam-key-claim';
import { SteamKeysClaimed } from './claim-key/steam-key-claimed';
import { SteamKeyManagementList } from './list/steam-key-management-list';
import { SteamKeyManageClaimGroups } from './manage-key-claim-group/steam-key-manage-claim-groups';
import { SteamKeyListServerRoles } from './manage-list-server-roles/steam-key-list-server-roles';
import { SteamKeyManageList } from './manage-list/steam-key-manage-list';

export const SteamKeyManagementRouter = () => (
    <Routes>
        <Route path='/list' element={authWrap(<SteamKeyManagementList />, 'steamkeys.list')} />
        <Route path='/list/:id' element={authWrap(<SteamKeyManageList />, 'steamkeys.list')} />
        <Route path='/listserverroles/:id' element={authWrap(<SteamKeyListServerRoles />, 'steamkeys.list')} />
        <Route path='/listclaimgroup/:id' element={authWrap(<SteamKeyManageClaimGroups />, 'steamkeys.list')} />
        <Route path='/claim' element={authWrap(<SteamKeysClaimed />)} />
        <Route path='/claim/:id' element={authWrap(<SteamKeyClaim />)} />
    </Routes>
);

export default SteamKeyManagementRouter;