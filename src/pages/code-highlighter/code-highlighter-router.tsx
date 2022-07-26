import { Route, Routes } from 'react-router-dom';
import { CodeHighlighterBuilder } from './builder.tsx/code-highlighter-builder';

export const CodeHighlighterRouter = () => (
    <Routes>
        <Route path='/' element={<CodeHighlighterBuilder />} />
    </Routes>
);

export default CodeHighlighterRouter;