import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import App from './App';
import Notfound from './notfound';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route component={Notfound} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById("root"));

module.hot.accept();