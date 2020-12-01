import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { getSiteURLBase } from '../../network/network';
import { PageWrapper } from '../base/page-wrapper';



export function Login(props) {
    const auth = useContext(AuthContext);
    //TODO: Cache the state and verify
    const twtichURL = `https://id.twitch.tv/oauth2/authorize?client_id=ulhcvhvfeiv83t1gduqnow1lispyge&redirect_uri=${getSiteURLBase()}/twitchlogin&response_type=code&scope=viewing_activity_read+openid&state=${nonce(15)}&claims={"id_token":{"preferred_username":null, "picture":null}}`;

    const nonce = (length) => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

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
                        <button disabled style={{ width: "250px", fontSize: "24px", backgroundColor: "#c3c5c7", border: "1px solid red", borderRadius: "5px", boxShadow: "3px 5px #111314" }} >
                            <a style={{ color: "gray" }}>
                                <i className="fab fa-youtube mr-1" />
                                <span>Youtube Login</span>
                            </a>
                        </button>
                    </div>
                </div>
            }

        </PageWrapper >
    );
}