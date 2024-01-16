import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { DiscordServerAvatar } from './server-avatar/discord-server-avatar';

export const DiscordRouter = () => (
    <Routes>
        <Route path='/serveravatar' element={authWrap(<DiscordServerAvatar />, 'discordserveravatar')} />
    </Routes>
);

export default DiscordRouter;