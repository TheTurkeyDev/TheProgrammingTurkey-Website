import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import Notfound from './notfound';

import Projects from './pages/projects';
import Info from './pages/info';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/projects/:type" component={Projects} />
            <Route exact path="/info" component={Info} />
            <Route component={Notfound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById("root"));

module.hot.accept();