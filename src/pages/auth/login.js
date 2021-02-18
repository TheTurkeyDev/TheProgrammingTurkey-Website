import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { getSiteURLBase } from '../../network/network-helper';
import { PageWrapper } from '../base/page-wrapper';
import { LoginPlatform } from './login-platform';

const loginRedirBase = `${getSiteURLBase()}/loginresp`;

export function Login(props) {
    const auth = useContext(AuthContext);

    //TODO: Send code to the server
    return (
        <PageWrapper>
            {auth.authState && props.history.push('/')}
            {!auth.authState && (
                <div className="text-center fluid container">
                    <h2 className="mb-4">Login with a method below:</h2>
                    <LoginPlatform
                        url={getTwitchURL('login')}
                        platform="Twitch"
                        color="#9146FF"
                        icon="fab fa-twitch"
                    />
                    <LoginPlatform
                        url={getYouTubeURL('login')}
                        platform="Youtube"
                        color="#c00"
                        icon="fab fa-youtube"
                    />
                    <LoginPlatform
                        url={getDiscordURL('login')}
                        platform="Discord"
                        color="#7289DA"
                        icon="fab fa-discord"
                    />
                    <LoginPlatform
                        url={getGithubURL('login')}
                        platform="Github"
                        color="#171515"
                        icon="fab fa-github"
                    />
                </div>
            )}
        </PageWrapper>
    );
}

const getState = (action, redirUrl) => {
    return btoa(
        JSON.stringify({
            redir_url: redirUrl,
            action: action,
            nonce: 'test12345',
        })
    );
};

export const getTwitchURL = (action, redirUrl = getSiteURLBase()) => {
    const clientId = 'ulhcvhvfeiv83t1gduqnow1lispyge';
    const redirurl = `${loginRedirBase}/twitch`;
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState(
        action,
        redirUrl
    )}&scope=viewing_activity_read+openid&claims={"id_token":{"preferred_username":null, "picture":null}}`;
};

export const getYouTubeURL = (action, redirUrl = getSiteURLBase()) => {
    const clientId =
        '922337282637-kujcovknl7iss3957f0rsuftufpkjkpv.apps.googleusercontent.com';
    const redirurl = `${loginRedirBase}/youtube`;
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState(
        action,
        redirUrl
    )}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true`;
};

export const getDiscordURL = (action, redirUrl = getSiteURLBase()) => {
    const clientId = '806921350655770634';
    const redirurl = `${loginRedirBase}/discord`;
    return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirurl}&state=${getState(
        action,
        redirUrl
    )}&scope=identify&prompt=consent`;
};

export const getGithubURL = (action, redirUrl = getSiteURLBase()) => {
    const clientId = '039c896eaf8ebdbcf39d';
    const redirurl = `${loginRedirBase}/github`;
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirurl}&scope=read:user&state=${getState(
        action,
        redirUrl
    )}`;
};
