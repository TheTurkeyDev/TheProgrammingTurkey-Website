import { Route, Routes } from 'react-router-dom';
import { CodeHighlighterBuilder } from './builder/code-highlighter-builder';
import { CodeHighlightList } from './list/code-highlight-list';

export const CodeHighlighterRouter = () => (
    <Routes>
        <Route path='/' element={<CodeHighlightList />} />
        <Route path='/build' element={<CodeHighlighterBuilder />} />
    </Routes>
);

export default CodeHighlighterRouter;