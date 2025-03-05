import { Route, Routes } from 'react-router-dom';
import { authWrap } from '../../router';
import { UserManagement } from './user-mangement/user-management';
import { PermissionManagement } from './permission-mangement/permission-management';
import { ProcessManagement } from './processes/process-management';
import { AdminWebSockets } from './web-sockets/Admin-web-sockets';

export const AdminRouter = () => (
    <Routes>
        <Route path='/usermanage' element={authWrap(<UserManagement />, 'admin.usermanage')} />
        <Route path='/permissionmanage' element={authWrap(<PermissionManagement />, 'admin.managepermissions')} />
        <Route path='/processmanage' element={authWrap(<ProcessManagement />, 'admin.manageprocesses')} />
        <Route path='/web-sockets' element={authWrap(<AdminWebSockets />, 'admin.usermanage')} />
    </Routes>
);

export default AdminRouter;