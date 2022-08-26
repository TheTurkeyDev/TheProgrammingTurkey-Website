import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { CodeHighlighterBuilder } from './builder/code-highlighter-builder';
import { CodeHighlightList } from './list/code-highlight-list';

export const CodeHighlighterRouter = () => (
    <Routes>
        <Route path='/' element={authWrap(<CodeHighlightList />, 'remotionrender')} />
        <Route path='/build' element={authWrap(<CodeHighlighterBuilder />, 'remotionrender')} />
    </Routes>
);

export default CodeHighlighterRouter;