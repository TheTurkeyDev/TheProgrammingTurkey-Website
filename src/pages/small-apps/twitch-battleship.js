import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as api from "../../network/twitch-battleship-network";
import { AuthPageWrapper } from '../base/auth-page-wrapper';

import { TextToast } from '../../toasts/text-toast';

export function TwitchBattleshipSetup(props) {
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [loaded, setLoaded] = useState(false);
    const [refreshtoggle, setRefreshToggle] = useState(false);

    const [token, setToken] = useState("");
    const [showURL, setShowURL] = useState(false);

    const [twitchWins, setTwitchWins] = useState(0);
    const [cpuWins, setCpuWins] = useState(0);
    const [gamePlayType, setGamePlayType] = useState(GamePlayStyle.VOTING);
    const [votingTimer, setVotingTimer] = useState(0);
    const [voteDisplayTimer, setVoteDisplayTimer] = useState(0);

    useEffect(() => {
        async function getToken() {
            api.getToken().then(token => {
                setToken(token);
                setLoaded(true);
            });
        }
        if (auth.authState)
            getToken();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            api.getTwitchBattleshipSettings(token).then(json => {
                if (json.success) {
                    const data = json.data;
                    setTwitchWins(data.twitch_wins);
                    setCpuWins(data.cpu_wins);
                    setGamePlayType(data.game_play_type);
                    setVotingTimer(data.voting_timer);
                    setVoteDisplayTimer(data.vote_display_timer);
                }
            });
        }

        if (auth.authState)
            loadDisplay();
    }, [refreshtoggle, token]);

    const saveDisplaySettings = () => {
        api.saveTwitchBattleshipSettings(token, {
            twitch_wins: twitchWins,
            cpu_wins: cpuWins,
            game_play_type: gamePlayType,
            voting_timer: votingTimer,
            vote_display_timer: voteDisplayTimer
        }).then(json => {
            if (json.success)
                toast.pushToast(<TextToast text="Settings Saved!" />);
            else
                toast.pushToast(<TextToast text={json.message} />);
        });
    }

    const regenToken = () => {
        api.regenToken().then(token => {
            setToken(token);
        })
    }

    return (
        <AuthPageWrapper history={props.history} perm="twitchbattleship">
            <div className="fluid-container pl-3">
                <div className="row m-0 mt-3 mb-2">
                    <label className="col m-0 ml-3 align-center" style={{ fontSize: "22px", maxWidth: "100px" }}>
                        URL:
                    </label>
                    <input className={`col ml-2 mr-4 ${showURL ? "" : "hidden"}`} type="text" readOnly value={`https://app.test.local/twitch/battleship?token=${token}`} style={{ width: "800px" }} />
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
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Twitch Wins:</label>
                    <input type="number" value={twitchWins} onChange={(e) => { setTwitchWins(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">CPU Wins:</label>
                    <input type="number" value={cpuWins} onChange={(e) => { setCpuWins(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Game Play Style:</label>
                    <select>
                        <option value={GamePlayStyle.VOTING}>Voting</option>
                    </select>
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Voting Round Time:</label>
                    <input type="number" value={votingTimer} onChange={(e) => { setVotingTimer(e.target.value) }} />
                </div>
                <div className="row m-0 ml-4 mt-1">
                    <label className="col mr-1 timer-label">Vote Display Time:</label>
                    <input type="number" value={voteDisplayTimer} onChange={(e) => { setVoteDisplayTimer(e.target.value) }} />
                </div>

                <div className="row m-0 ml-4 mt-1">
                    <button onClick={saveDisplaySettings}>
                        Save
                    </button>
                </div>
            </div>
        </AuthPageWrapper >
    );
}

const GamePlayStyle =
{
    CHANNEL_POINTS: 0,
    VOTING: 1
}