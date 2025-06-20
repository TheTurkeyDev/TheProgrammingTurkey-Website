import { Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page';
import { Info } from './pages/info';
import { MCModSupport } from './pages/mods/mc-mod-support';
import { LDStats } from './pages/game-jam/ld-stats';
import { Support } from './pages/support/support';
import { StreamLEDControl } from './pages/projects/stream-led-control';
import { Login } from './pages/auth/login';
import { LoginResponse } from './pages/auth/login-response';
import { Logout } from './pages/auth/logout';
import { AuthRoute } from './util/auth-route';
import { MJRBotFAQ } from './pages/mjr-bot-faq';
import { Loading, NotFound } from 'gobble-lib-react';
import { JSX, lazy, Suspense } from 'react';
import { PrivacyPolicy } from './pages/legal/privacy-policy';
import { TermsOfService } from './pages/legal/tos';
import { ChatMerge } from './pages/chat-merge/chat-merge';
import { TwitchClipShoutout } from './pages/projects/stream-tools/twitch-clip-shoutout/twitch-clip-shoutout';
import { BotLogin } from './pages/auth/login-bot';

const ChanceCubesRouter = lazy(() => import(/* webpackChunkName: "Chance Cubes" */ './pages/chance-cubes/chance-cubes-router'));
const ProjectsRouter = lazy(() => import(/* webpackChunkName: "Projects" */ './pages/projects/projects-router'));
const TwitchGamesRouter = lazy(() => import(/* webpackChunkName: "Twitch Games" */ './pages/twitch-games/twitch-games-router'));
const UserRouter = lazy(() => import(/* webpackChunkName: "User" */ './pages/user/user-router'));
const AdminRouter = lazy(() => import(/* webpackChunkName: "Admin" */ './pages/admin/admin-router'));
const SuggestionsRouter = lazy(() => import(/* webpackChunkName: "Suggestions" */ './pages/suggestions/suggestions-router'));
const VideoGenRouter = lazy(() => import(/* webpackChunkName: "Video Generator" */ './pages/code-highlighter/video-gen-router'));
const DiscordRouter = lazy(() => import(/* webpackChunkName: "Discord" */ './pages/discord/discord-router'));
const SteamKeyManagementRouter = lazy(() => import(/* webpackChunkName: "Steam Keys" */ './pages/steam-key-mangement/steam-key-management-router'));
const GameSettingsRouter = lazy(() => import(/* webpackChunkName: "Game Settings" */ './pages/game-settings/game-settings-router'));
const PredictionRouter = lazy(() => import(/* webpackChunkName: "Predictions" */ './pages/prediction/prediction-router'));
const YahooRouter = lazy(() => import(/* webpackChunkName: "Yahoo Fantasy" */ './pages/yahoo-fantasy/yahoo-router'));
const SoftkeyManagementRouter = lazy(() => import(/* webpackChunkName: "Softkey" */ './pages/softkey-management/softkey-router'));

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
            <Route path='/suggestions/*' element={<SuggestionsRouter />} />
            <Route path='/videogen/*' element={<VideoGenRouter />} />
            <Route path='/discord/*' element={<DiscordRouter />} />
            <Route path='/steamkeys/*' element={<SteamKeyManagementRouter />} />
            <Route path='/gamesettings/*' element={<GameSettingsRouter />} />
            <Route path='/predictions/*' element={<PredictionRouter />} />
            <Route path='/yahoo-fantasy/*' element={authWrap(<YahooRouter />)} />
            <Route path='/softkey/*' element={authWrap(<SoftkeyManagementRouter />, 'softkey')} />

            <Route path='/mod-support' element={<MCModSupport />} />
            <Route path='/ld-stats' element={<LDStats />} />
            <Route path='/stream-led-control' element={<StreamLEDControl />} />
            <Route path='/chat-merge' element={<ChatMerge />} />
            <Route path='/twitch-clip-shoutout' element={authWrap(<TwitchClipShoutout />)} />
            <Route path='/info' element={<Info />} />
            <Route path='/support' element={<Support />} />
            <Route path='/mjrbotfaq' element={<MJRBotFAQ />} />
            <Route path='/login' element={<Login />} />
            <Route path='/botlogin' element={<BotLogin />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/loginresp/:platform' element={<LoginResponse />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/tos' element={<TermsOfService />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    </Suspense>
);