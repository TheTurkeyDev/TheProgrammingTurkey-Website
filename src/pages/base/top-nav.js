import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/auth-context';

export function TopNav() {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
            <Link className="navbar-brand" to="/">TurkeyDev</Link >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/projects?type=all" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</Link>
                        <div className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown" style={{ marginTop: "-5px" }}>
                            <Link className="dropdown-item" to="/projects?type=all">All</Link>
                            <Link className="dropdown-item" to="/projects?type=ld">Ludum Dare</Link>
                            <Link className="dropdown-item" to="/projects?type=mods">Mods</Link>
                            <Link className="dropdown-item" to="/projects?type=webapps">Web Apps</Link>
                            <Link className="dropdown-item" to="/projects?type=other">Others</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/support">Support Me</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="" onClick={() => window.open('http://maven.theprogrammingturkey.com/')}>Maven</a>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle txt-color-primary" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other Links</span>
                        <div className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown" style={{ marginTop: "-5px" }}>
                            <a className="dropdown-item" href="" onClick={() => window.open('https://theturkey.dev/twitch')}>Twitch</a>
                            <a className="dropdown-item" href="" onClick={() => window.open('https://theturkey.dev/youtube')}>YouTube</a>
                            <a className="dropdown-item" href="" onClick={() => window.open('https://discord.gg/DkexpJj')}>Discord</a>
                            <a className="dropdown-item" href="" onClick={() => window.open('https://theturkey.dev/github')}>Github</a>
                            <a className="dropdown-item" href="" onClick={() => window.open('https://ldjam.com')}>Ludum Dare</a>
                        </div>
                    </li>
                </ul>
                <div className="navbar-text">
                    {auth.authState ?
                        <div><Link to="/user/profile"> {`Welcome ${auth.userName}!`} </Link> | <Link to="/logout"> Logout </Link></div>
                        :
                        <div style={{ marginLeft: "150px" }}><Link to="/login"> Login </Link></div>
                    }
                </div>
            </div>
        </nav >
    );
}