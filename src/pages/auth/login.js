import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { getSiteURLBase, getYTSiteURLBase, getDevAPIBase } from '../../network/network-helper';
import { PageWrapper } from '../base/page-wrapper';

export function Login(props) {
    const auth = useContext(AuthContext);


    const getState = () => {
        return btoa(getSiteURLBase());
    }
    const getTwitchURL = () => {
        const clientId = 'ulhcvhvfeiv83t1gduqnow1lispyge';
        const redirurl = `${getDevAPIBase()}/auth/twitch/token`;
        return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState()}&scope=viewing_activity_read+openid&claims={"id_token":{"preferred_username":null, "picture":null}}`;
    }

    const getYouTubeURL = () => {
        const clientId = '922337282637-kujcovknl7iss3957f0rsuftufpkjkpv.apps.googleusercontent.com';
        const redirurl = `${getYTSiteURLBase()}/auth/youtube/token`;
        return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState()}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true`;
    }

    const getDiscordURL = () => {
        const clientId = '806921350655770634';
        const redirurl = `${getDevAPIBase()}/auth/discord/token`;
        return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState()}&scope=identify&prompt=consent`;
    }

    const getGithubURL = () => {
        const clientId = '039c896eaf8ebdbcf39d';
        const redirurl = `${getDevAPIBase()}/auth/github/token`;
        return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirurl}&scope=read:user&state=${getState()}`;
    }

    //TODO: Send code to the server
    return (
        <PageWrapper>
            {
                auth.authState && props.history.push("/")
            }
            {
                !auth.authState &&
                <div className="text-center fluid container">
                    <h2 className="mb-4">Login with a method below:</h2>
                    <div className="row w-100 m-0 mb-3">
                        <a className="btn p-1 mx-auto" href={getTwitchURL()} style={{ width: "250px", fontSize: "24px", color: "#ffffff", backgroundColor: "#9146FF", border: "1px solid #d1d1d1", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <i className="col p-0 fab fa-twitch" style={{ width: "25%" }} />
                            <p className="col p-0 m-0" style={{ width: "75%", display: "inline-block" }}>Twitch Login</p>
                        </a>
                    </div>
                    <div className="row w-100 m-0 mb-3">
                        <a className="btn p-1 mx-auto" href={getYouTubeURL()} style={{ width: "250px", fontSize: "24px", color: "#ffffff", backgroundColor: "red", border: "1px solid #d1d1d1", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <i className="col p-0 fab fa-youtube" style={{ width: "25%" }} />
                            <p className="col p-0 m-0" style={{ width: "75%", display: "inline-block" }}>Youtube Login</p>
                        </a>
                    </div>
                    <div className="row w-100 m-0 mb-3">
                        <a className="btn p-1 mx-auto" href={getDiscordURL()} style={{ width: "250px", fontSize: "24px", color: "#ffffff", backgroundColor: "#7289DA", border: "1px solid #d1d1d1", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <i className="col p-0 fab fa-discord" style={{ width: "25%" }} />
                            <p className="col p-0 m-0" style={{ width: "75%", display: "inline-block" }}>Discord Login</p>
                        </a>
                    </div>
                    <div className="row w-100 m-0 mb-3">
                        <a className="btn p-1 mx-auto" href={getGithubURL()} style={{ width: "250px", fontSize: "24px", color: "#ffffff", backgroundColor: "#171515", border: "1px solid #d1d1d1", borderRadius: "5px", boxShadow: "3px 5px #111314" }}>
                            <i className="col-auto fab fa-github" style={{ width: "25%" }} />
                            <p className="col p-0 m-0" style={{ width: "75%", display: "inline-block" }}>Github Login</p>
                        </a>
                    </div>
                </div>
            }

        </PageWrapper >
    );
}