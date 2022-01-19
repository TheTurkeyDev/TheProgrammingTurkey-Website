import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { useToast } from '../../contexts/toast-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';

import { TextToast } from '../../toasts/text-toast';
import { SecretURL } from '../../components/secret-url';

export const TwitchHangmanSetup = () => {
    const gameName = 'hangman';
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [token, setToken] = useState('');

    const [bgColor, setBGColor] = useState('#000000');
    const [wordColor, setWordColor] = useState('#ffffff');
    const [correctLetterColor, setCorrectLetterColor] = useState('#00ff00');
    const [wrongLetterColor, setWrongLetterColor] = useState('#ff0000');

    useEffect(() => {
        const getToken = async () => {
            api.getToken(gameName).then((token) => {
                setToken(token);
            });
        };
        if (authState) getToken();
    }, [authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            api.getTwitchGameSettings(gameName, token).then((json) => {
                if (json.success) {
                    const data = json.data;
                    setBGColor(data.bg_color);
                    setWordColor(data.word_color);
                    setCorrectLetterColor(data.correct_letter_color);
                    setWrongLetterColor(data.wrong_letter_color);
                }
            });
        }

        if (authState) loadDisplay();
    }, [token]);

    const saveDisplaySettings = () => {
        api.saveTwitchGameSettings(gameName, token, {
            bg_color: bgColor,
            word_color: wordColor,
            correct_letter_color: correctLetterColor,
            wrong_letter_color: wrongLetterColor,
        }).then((json) => {
            pushToast(<TextToast text={json.success ? 'Settings Saved!' : json.message} />);
        });
    };

    const regenToken = () => {
        api.regenToken(gameName).then((token) => {
            setToken(token);
        });
    };

    const hangmanURL = `${getAppsSiteBase()}/twitch/hangman?token=${token}`;

    return (
        <div className='fluid-container pl-3'>
            <div className='row m-0 text-center'>
                <div className='col m-0'>
                    <h2>Hangman</h2>
                </div>
            </div>
            <div className='mt-2'>
                <SecretURL url={hangmanURL} regen={regenToken} />
            </div>
            <hr />
            <div className='row m-0'>
                <h3>Settings</h3>
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Background Color:</label>
                <input type='color' value={bgColor} onChange={(e) => setBGColor(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Word Color:</label>
                <input type='color' value={wordColor} onChange={(e) => setWordColor(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Correct Letter Color:</label>
                <input type='color' value={correctLetterColor} onChange={(e) => setCorrectLetterColor(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <label className='col mr-1 timer-label'>Wrong Letter Color:</label>
                <input type='color' value={wrongLetterColor} onChange={(e) => setWrongLetterColor(e.target.value)} />
            </div>
            <div className='row m-0 ml-4 mt-1'>
                <button onClick={saveDisplaySettings}>Save</button>
            </div>
        </div>
    );
}