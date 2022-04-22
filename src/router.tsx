import { Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page';
import { Info } from './pages/info';
import { MCModSupport } from './pages/mods/mc-mod-support';
import { LDStats } from './pages/ludum-dare/ld-stats';
import { Support } from './pages/support/support';
import { StreamLEDControl } from './pages/projects/stream-led-control';
import { Login } from './pages/auth/login';
import { LoginResponse } from './pages/auth/login-response';
import { Logout } from './pages/auth/logout';
import { AuthRoute } from './util/auth-route';
import { MJRBotFAQ } from './pages/mjr-bot-faq';
import { Loading, NotFound } from '@theturkeydev/gobble-lib-react';
import { lazy, Suspense } from 'react';

const ChanceCubesRouter = lazy(() => import(/* webpackChunkName: "Chance Cubes" */ './pages/chance-cubes/chance-cubes-router'));
const ProjectsRouter = lazy(() => import(/* webpackChunkName: "Projects" */ './pages/projects/projects-router'));
const TwitchGamesRouter = lazy(() => import(/* webpackChunkName: "Twitch Games" */ './pages/twitch-games/twitch-games-router'));
const UserRouter = lazy(() => import(/* webpackChunkName: "User" */ './pages/user/user-router'));
const AdminRouter = lazy(() => import(/* webpackChunkName: "Admin" */ './pages/admin/admin-router'));
const TwitchClipFiltererRouter = lazy(() => import(/* webpackChunkName: "Twitch Clip Filterer" */ './pages/twitch-clip-filterer/twitch-clip-router'));

export const authWrap = (element: JSX.Element, perm?: string) => <AuthRoute perm={perm}>{element}</AuthRoute>;

export const Routing = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/projects/*' element={<ProjectsRouter />} />
            <Route path='/chancecubes/*' element={<ChanceCubesRouter />} />
            <Route path='/twitchgames/*' element={<TwitchGamesRouter />} />
            <Route path='/user/*' element={<UserRouter />} />
            <Route path='/admin/*' element={<AdminRouter />} />
            <Route path='/twitchclipfilterer/*' element={<TwitchClipFiltererRouter />} />

            <Route path='/mod-support' element={<MCModSupport />} />
            <Route path='/ld-stats' element={<LDStats />} />
            <Route path='/stream-led-control' element={<StreamLEDControl />} />
            <Route path='/info' element={<Info />} />
            <Route path='/support' element={<Support />} />
            <Route path='/mjrbotfaq' element={<MJRBotFAQ />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/loginresp/:platform' element={<LoginResponse />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    </Suspense>
);