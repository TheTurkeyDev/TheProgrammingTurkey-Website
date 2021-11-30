import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';

import { TextToast } from '../../toasts/text-toast';
import { SecretURL } from '../../components/secret-url';

export const TwitchRPSSetup = () => {
    const gameName = 'rps';
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [token, setToken] = useState('');

    const [twitchWins, setTwitchWins] = useState(0);
    const [cpuWins, setCpuWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [gamePlayType, setGamePlayType] = useState(GamePlayStyle.VOTING);
    const [votingTimer, setVotingTimer] = useState(0);
    const [textColor, setTextColor] = useState('#000000');
    const [startDelay, setStartDelay] = useState(0);

    useEffect(() => {
        const getToken = async () => {
            api.getToken(gameName).then((token) => {
                setToken(token);
            });
        };
        if (auth.authState) getToken();
    }, [auth.authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            api.getTwitchGameSettings(gameName, token).then((json) => {
                if (json.success) {
                    const data = json.data;
                    setTwitchWins(data.twitch_wins);
                    setCpuWins(data.cpu_wins);
                    setTies(data.ties);
                    setGamePlayType(data.game_play_type);
                    setVotingTimer(data.voting_timer);
                    setTextColor(data.text_color);
                    setStartDelay(data.start_delay);
                }
            });
        }

        if (auth.authState) loadDisplay();
    }, [token]);

    const saveDisplaySettings = () => {
        api.saveTwitchGameSettings(gameName, token, {
            twitch_wins: twitchWins,
            cpu_wins: cpuWins,
            ties: ties,
            game_play_type: gamePlayType,
            voting_timer: votingTimer,
            text_color: textColor,
            start_delay: startDelay,
        }).then((json) => {
            if (json.success)
                toast.pushToast(<TextToast text='Settings Saved!' />);
            else toast.pushToast(<TextToast text={json.message} />);
        });
    };

    const regenToken = () => {
        api.regenToken(gameName).then((token) => {
            setToken(token);
        });
    };

    const rpsURL = `${getAppsSiteBase()}/twitch/rps?token=${token}`;

    return (
        <div className='fluid-container pl-3'>
            <div className='row m-0 text-center'>
                <div className='col m-0'>
                    <h2>Twitch Plays Rock, Paper, Scissors</h2>
                </div>
            </div>
            <div className='mt-2'>
                <SecretURL url={rpsURL} regen={regenToken} />
            </div>
            <hr />
            <div className='row m-0'>
                <h3>Settings</h3>
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Twitch Wins:</label>
                <input type='number' value={twitchWins} onChange={(e) => setTwitchWins(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>CPU Wins:</label>
                <input type='number' value={cpuWins} onChange={(e) => setCpuWins(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Ties:</label>
                <input type='number' value={ties} onChange={(e) => setTies(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>
                    Game Play Style:
                </label>
                <select>
                    <option value={GamePlayStyle.VOTING}>Voting</option>
                </select>
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>
                    Voting Round Time:
                </label>
                <input type='number' value={votingTimer} onChange={(e) => setVotingTimer(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Start Delay:</label>
                <input type='number' value={startDelay} onChange={(e) => setStartDelay(parseInt(e.target.value))} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Text Color:</label>
                <input type='color' value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <button onClick={saveDisplaySettings}>Save</button>
            </div>
        </div>
    );
}

const GamePlayStyle = {
    CHANNEL_POINTS: 0,
    VOTING: 1,
};
