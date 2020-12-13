import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as authAPI from "../../network/auth-network";
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';

export function YouTubeSubGetSetup(props) {
    const canvasRef = useRef(null);

    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [loaded, setLoaded] = useState(false);
    const [refreshtoggle, setRefreshToggle] = useState(false);

    const [token, setToken] = useState("");
    const [subCount, setSubcount] = useState(0);
    const [showURL, setShowURL] = useState(false);

    const [fontFamily, setFontFamily] = useState("");
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState("");

    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    useEffect(() => {
        async function getToken() {
            authAPI.getToken("ytsubget").then(token => {
                setToken(token);
                authAPI.getYTSubs(token).then(subs => {
                    setSubcount(subs);
                    setLoaded(true);
                });
            });
        }
        if (auth.authState)
            getToken();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            authAPI.getYTSubsDisplaySettings(token).then(json => {
                if (json.success) {
                    setBackgroundColor(json.data.preview_bg_color);
                    setFontFamily(json.data.font_family);
                    setFontSize(json.data.font_size);
                    setFontColor(json.data.font_color)
                }
            });
        }

        if (auth.authState)
            loadDisplay();
    }, [refreshtoggle, token]);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            // ctx.textAlign = "center";
            ctx.textBaseline = "top";
            if (loaded) {
                ctx.fillText(subCount, 0, 0);
            }
            else {
                ctx.fillText("Loading...", 10, 10);
            }
        }
    });

    const saveDisplaySettings = () => {
        console.log(fontSize);
        authAPI.saveYTSubsDisplaySettings(token, {
            preview_bg_color: backgroundColor,
            font_family: fontFamily,
            font_size: fontSize,
            font_color: fontColor
        }).then(json => {
            if (json.success)
                toast.pushToast(<TextToast text="Settings Saved!" />);
            else
                toast.pushToast(<TextToast text={json.message} />);
        });
    }

    const regenToken = () => {
        authAPI.regenToken("ytsubget").then(token => {
            setToken(token);
        })
    }

    return (
        <AuthPageWrapper history={props.history} perm="proc.ytsubget">
            <div className="fluid-container pl-3">
                <div className="row m-0 mt-3 mb-2">
                    <label className="col m-0 ml-3 align-center" style={{ fontSize: "22px", maxWidth: "100px" }}>
                        URL:
                    </label>
                    <input className={`col ml-2 mr-4 ${showURL ? "" : "hidden"}`} type="text" readOnly value={`http://apps.theturkey.dev/ytsubget?token=${token}`} style={{ width: "800px" }} />
                </div>
                <div className="row m-0 mt-2">
                    <div className="col m-0 ml-3 align-center" style={{ maxWidth: "100px" }}></div>
                    <button className="col-auto ml-2" onClick={() => setShowURL(old => !old)}>{showURL ? "Hide URL" : "Show Url"}</button>
                </div>
                <div className="row m-0 mt-2">
                    <div className="col m-0 ml-3 align-center" style={{ maxWidth: "100px" }}></div>
                    <button className="col-auto ml-2" onClick={regenToken}>Regen Token</button>
                </div>
                <hr />
                <div className="row m-0">
                    <h2>Settings</h2>
                </div>
                <div className="row m-0 ml-2 mt-2">
                    <h4>Font</h4>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Color:</label>
                    <input type="color" value={fontColor} onChange={(e) => { setFontColor(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Size:</label>
                    <input className="col-auto" type="number" value={fontSize} onChange={(e) => { setFontSize(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <button onClick={saveDisplaySettings}>
                        Save
                    </button>
                </div>
                <hr />
                <div className="row m-0 mt-1">
                    <h2>Preview</h2>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Background:</label>
                    <input className="" type="color" value={backgroundColor} onChange={(e) => { setBackgroundColor(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <canvas ref={canvasRef} className="m-3 p-1" style={{ backgroundColor }} width={200} height={200}>

                    </canvas>
                </div>
            </div>
        </AuthPageWrapper >
    );
}