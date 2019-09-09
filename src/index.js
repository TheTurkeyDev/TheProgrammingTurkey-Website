import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import Notfound from './notfound';

import Info from './pages/info';
import Projects from './pages/projects/projects';
import MCModSupport from "./pages/projects/mc-mod-support";
import LDStats from "./pages/projects/ludum-dare/ld-stats";
import ChanceCubesStats from "./pages/projects/mods/chance-cubes-stats";

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/projects" component={Projects} />
            {/*<Route path="/projects/:name" component={Projects} />*/}
            <Route exact path="/mod-support" component={MCModSupport} />
            <Route exact path="/ld-stats" component={LDStats} />
            <Route exact path="/chance-cubes-stats" component={ChanceCubesStats} />

            <Route exact path="/info" component={Info} />
            <Route component={Notfound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById("root"));

module.hot.accept();