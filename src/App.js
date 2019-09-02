import React, { Component } from 'react';

import TopNav from "./top-nav";

class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="h-100 w-100 d-flex flex-column">
                <TopNav />
            </div>
        );
    }
}

export default App;