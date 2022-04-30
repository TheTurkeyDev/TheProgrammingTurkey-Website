import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { ManageSuggestionBoxes } from './manage/manage-suggestion-boxes';
import { ViewSuggestionBox } from './view/view-suggestions-box';

export const SuggestionsRouter = () => (
    <Routes>
        {/* <Route path='/' element={authWrap(<ManageSuggestionBoxes />, 'admin.suggestions.manage')} />
        <Route path='/:id' element={<ViewSuggestionBox />} /> */}
    </Routes>
);

export default SuggestionsRouter;