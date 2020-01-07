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
                            <Link className="nav-link dropdown-toggle" to="/projects?type=all" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</Link>
                            <div className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown" style={{ marginTop: "-24px" }}>
                                <Link className="dropdown-item" to="/projects?type=all">All</Link>
                                <Link className="dropdown-item" to="/projects?type=ld">Ludum Dare</Link>
                                <Link className="dropdown-item" to="/projects?type=mods">Mods</Link>
                                <Link className="dropdown-item" to="/projects?type=other">Others</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/info">Info/Contact</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={() => window.open('http://maven.theprogrammingturkey.com/')}>Maven</a>
                        </li>
                        <li className="nav-item dropdown">
                            <p className="nav-link dropdown-toggle txt-color-primary" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other Links</p>
                            <div className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown" style={{ marginTop: "-24px" }}>
                                <a className="dropdown-item" href="" onClick={() => window.open('https://twitch.tv/turkey2349')}>Twitch</a>
                                <a className="dropdown-item" href="" onClick={() => window.open('https://www.youtube.com/user/IProgram4Fun')}>YouTube</a>
                                <a className="dropdown-item" href="" onClick={() => window.open('https://discord.gg/wkgyaxs')}>Discord</a>
                                <a className="dropdown-item" href="" onClick={() => window.open('https://github.com/Turkey2349')}>Github</a>
                                <a className="dropdown-item" href="" onClick={() => window.open('https://ldjam.com')}>Ludum Dare</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopNav;