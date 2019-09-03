import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/projects/all" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/projects/all">All</Link>
                                <Link className="dropdown-item" to="/projects/ld">Ludum Dare</Link>
                                <Link className="dropdown-item" to="/projects/games">Games</Link>
                                <Link className="dropdown-item" to="/projects/mods">Mods</Link>
                                <Link className="dropdown-item" to="/projects/other">Others</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/info">Info/Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/testpage">Test</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={() => window.open('http://maven.theprogrammingturkey.com/')}>Maven</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={() => window.open('https://discord.gg/wkgyaxs')}>Discord</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopNav;