import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { DiscordRolesManagement } from './roles-management/discord-roles-mangement';

export const DiscordRouter = () => (
    <Routes>
        <Route path='/' element={authWrap(<DiscordRolesManagement />, 'discordrolemanagement')} />
    </Routes>
);

export default DiscordRouter;