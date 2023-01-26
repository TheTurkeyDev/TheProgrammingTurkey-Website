import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { VideoGenBuilder } from './builder/video-gen-builder';
import { CodeHighlighterBuilder } from './code-highlight-builder/code-highlighter-builder';
import { VideoGenList } from './list/video-gen-list';
import { ScoreboardVideoBuilder } from './scoreboard-builder/scoreboard-video-builder';

export const VideoGenRouter = () => (
    <Routes>
        <Route path='/' element={authWrap(<VideoGenList />, 'remotionrender')} />
        <Route path='/build' element={authWrap(<VideoGenBuilder />, 'remotionrender')} />
        <Route path='/codehighlight' element={authWrap(<CodeHighlighterBuilder />, 'remotionrender')} />
        <Route path='/scoreboard' element={authWrap(<ScoreboardVideoBuilder />, 'remotionrender')} />
    </Routes>
);

export default VideoGenRouter;