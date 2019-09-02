import React, { Component } from 'react';

class TopNav extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="w-100 bg-dark navbar-dark text-center">
                <h1 className="m-auto text-light">The Programming Turkey</h1>
                <nav className="navbar navbar-expand-sm">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/projects/all" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/projects/all">All</a>
                                <a className="dropdown-item" href="/projects/ld">Ludum Dare</a>
                                <a className="dropdown-item" href="/projects/games">Games</a>
                                <a className="dropdown-item" href="/projects/mods">Mods</a>
                                <a className="dropdown-item" href="/projects/other">Others</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/info">Info/Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/testpage">Test</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={() => window.open('http://maven.theprogrammingturkey.com/')}>Maven</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopNav;