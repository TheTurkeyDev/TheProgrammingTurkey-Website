import { Route, Routes } from 'react-router-dom';
import { SoftkeyManagement } from './softkey-management';
import { SoftkeyManagementApp } from './softkey-management-app';

export const SoftkeyManagementRouter = () => (
    <Routes>
        <Route path='/apps' element={<SoftkeyManagement />} />
        <Route path='/apps/:id' element={<SoftkeyManagementApp />} />
    </Routes>
);

export default SoftkeyManagementRouter;