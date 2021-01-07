import React, { useContext, useEffect, useState } from 'react';
import { OverlayContext } from '../../contexts/overlay-context';
import * as api from '../../network/auth-network';
import { ConnectMinecraftAccountOverlay } from '../../overlays/connect-minecraft-account-overlay';
import { AuthPageWrapper } from '../base/auth-page-wrapper';

export function UserConnectedAccount(props) {
    const [accounts, setAccounts] = useState([]);

    const overlay = useContext(OverlayContext);

    useEffect(() => {
        api.getUserConnectedAccounts().then(json => {
            setAccounts(json);
        });
    }, []);

    const connectMinecraft = () => {
        overlay.pushCurrentOverlay(<ConnectMinecraftAccountOverlay />);
    }

    const twitchConnected = accounts.filter(a => a.platform === "twitch").length > 0;
    const minecraftConnected = accounts.filter(a => a.platform === "minecraft").length > 0;

    return (
        <AuthPageWrapper history={props.history} >
            <div className="fluid-container mx-auto" style={{ maxWidth: "500px", minWidth: "500px" }}>
                <div className="row m-0 text-center">
                    <h2 className="col mt-1">Connect Accounts!</h2>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col" style={{ fontSize: "24px" }}>
                        <i className="fab fa-twitch mr-1" style={{ color: "#9146FF" }} />
                        <span className="ml-2">Twitch</span>
                    </div>
                    <button className="col" disabled={twitchConnected} style={{ width: "100px", fontSize: "24px" }} >
                        {twitchConnected ? "Connected!" : "Connect"}
                    </button>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col" style={{ fontSize: "24px" }}>
                        <i className="fab fa-youtube mr-1" style={{ color: "#c00" }} />
                        <span className="ml-2">Youtube</span>
                    </div>
                    <button className="col" disabled={true} style={{ width: "100px", fontSize: "24px" }} >
                        Coming Soon!
                    </button>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col" style={{ fontSize: "24px" }}>
                        <i className="fas fa-cube mr-1" style={{ color: "#058205" }} />
                        <span className="ml-2">Minecraft</span>
                    </div>
                    <button className="col" disabled={minecraftConnected} style={{ width: "100px", fontSize: "24px" }} onClick={() => connectMinecraft()} >
                        {minecraftConnected ? "Connected!" : "Connect"}
                    </button>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col" style={{ fontSize: "24px" }}>
                        <i className="fab fa-github mr-1" style={{ color: "white" }} />
                        <span className="ml-2">GitHub</span>
                    </div>
                    <button className="col" disabled={true} style={{ width: "100px", fontSize: "24px" }} >
                        Coming Soon!
                    </button>
                </div>
                <div className="row m-0 mb-3">
                    <div className="col" style={{ fontSize: "24px" }}>
                        <i className="fab fa-patreon mr-1" style={{ color: "#f96854" }} />
                        <span className="ml-2">Patreon</span>
                    </div>
                    <button className="col" disabled={true} style={{ width: "100px", fontSize: "24px" }} >
                        Coming Soon!
                    </button>
                </div>
            </div>
        </AuthPageWrapper >
    );
}