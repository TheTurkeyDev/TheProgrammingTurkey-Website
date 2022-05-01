import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { ManageSuggestionBoxes } from './manage/manage-suggestion-boxes';
import { ViewSuggestionBox } from './view/view-suggestions-box';

export const SuggestionsRouter = () => (
    <Routes>
        <Route path='/' element={authWrap(<ManageSuggestionBoxes />, 'suggestionsbox')} />
        <Route path='/:id' element={authWrap(<ViewSuggestionBox />, 'suggestionsbox')} />
    </Routes>
);

export default SuggestionsRouter;