import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { AuthContext } from '../../contexts/auth-context';
import * as authAPI from "../../network/auth-network";
import { PageWrapper } from '../base/page-wrapper';


export function YouTubeLogin(props) {
    const [failed, setFailed] = useState(false);
    const auth = useContext(AuthContext);

    console.log(window.location.href);
    if (window.location.href === "https://localhost:8082/youtubelogin") {
        window.location.href = 'https://test.local/youtubelogin';
        return null;
    }

    let code = "";
    if (props.location && props.location.search) {
        let params = props.location.search.substring(1).split("&");
        params.forEach((element) => {
            let keyVal = element.split("=");
            if (keyVal[0] === "code")
                code = keyVal[1];
        });
    }

    useEffect(() => {
        async function sendCode() {
            authAPI.loginYoutube(code).then(json => {
                if (json.success) {
                    auth.login();
                    props.history.push("/");
                }
                else {
                    setFailed(true);
                }
            });
        }
        sendCode();
    }, []);

    //TODO: Send code to the server
    return (
        <PageWrapper>
            {
                failed && <h1>Unauthorized!</h1>
            }
            <Link to="/"> Click here if you do not get redirected!</Link>
        </PageWrapper>
    );
}