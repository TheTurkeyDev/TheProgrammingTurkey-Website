import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { getSiteURLBase, getYTSiteURLBase, getDevAPIBase } from '../../network/network-helper';
import { PageWrapper } from '../base/page-wrapper';

export function Login(props) {
    const auth = useContext(AuthContext);

    const twtichURL = `https://id.twitch.tv/oauth2/authorize?client_id=ulhcvhvfeiv83t1gduqnow1lispyge&redirect_uri=${getDevAPIBase()}/auth/twitch/token&response_type=code&scope=viewing_activity_read+openid&state=${btoa(getSiteURLBase())}&claims={"id_token":{"preferred_username":null, "picture":null}}`;
    const youtubeURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${getYTSiteURLBase()}/youttubelogin&response_type=code&client_id=922337282637-kujcovknl7iss3957f0rsuftufpkjkpv.apps.googleusercontent.com`;

    //TODO: Send code to the server
    return (
        <PageWrapper>
            {
                auth.authState && props.history.push("/")
            }
            {
                !auth.authState &&
                <div className="text-center">
                    <h2 className="mb-4">Login with a method below:</h2>
                    <div className="w-100 mb-3">
                        <button style={{ width: "250px", fontSize: "24px", backgroundColor: "#dcddde", border: "1px solid purple", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <a style={{ color: "purple" }} href={twtichURL} >
                                <i className="fab fa-twitch mr-1" />
                                <span>Twitch Login</span>
                            </a>
                        </button>
                    </div>
                    <div className="w-100 mb-3">
                        <button disabled style={{ width: "250px", fontSize: "24px", backgroundColor: "#c3c5c7", border: "1px solid gray", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <a style={{ color: "gray" }}>
                                <i className="fab fa-youtube mr-1" />
                                <span>Youtube Login</span>
                            </a>
                        </button>
                    </div>
                    <div className="w-100 mb-3">
                        {/* #7289DA*/}
                        <button disabled style={{ width: "250px", fontSize: "24px", backgroundColor: "#c3c5c7", border: "1px solid gray", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <a style={{ color: "gray" }}>
                                <i className="fab fa-discord mr-1" />
                                <span>Discord Login</span>
                            </a>
                        </button>
                    </div>
                    <div className="w-100 mb-3">
                        <button disabled style={{ width: "250px", fontSize: "24px", backgroundColor: "#c3c5c7", border: "1px solid gray", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <a style={{ color: "gray" }}>
                                <i className="fab fa-github mr-1" />
                                <span>Github Login</span>
                            </a>
                        </button>
                    </div>
                </div>
            }

        </PageWrapper >
    );
}