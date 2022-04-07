import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { TwitchClipTagger } from './twitch-clip-tagger';
import { TwitchClipsList } from './twitch-clips-list';

export const UserRouter = () => (
    <Routes>
        <Route path='/clips' element={authWrap(<TwitchClipsList />, 'twitchclipfilter')} />
        <Route path='/tagger' element={authWrap(<TwitchClipTagger />, 'twitchclipfilter')} />
    </Routes>
);

export default UserRouter;