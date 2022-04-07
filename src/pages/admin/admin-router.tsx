import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { UserManagement } from './user-mangement/user-management';
import { PermissionManagement } from './permission-mangement/permission-management';
import { ProcessManagement } from './processes/process-management';

export const AdminRouter = () => (
    <Routes>
        <Route path='/usermanage' element={authWrap(<UserManagement />, 'admin.usermanage')} />
        <Route path='/permissionmanage' element={authWrap(<PermissionManagement />, 'admin.managepermissions')} />
        <Route path='/processmanage' element={authWrap(<ProcessManagement />, 'admin.manageprocesses')} />
    </Routes>
);

export default AdminRouter;