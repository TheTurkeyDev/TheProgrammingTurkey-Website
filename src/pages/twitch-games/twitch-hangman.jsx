import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { ToastContext } from '../../contexts/toast-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';

import { TextToast } from '../../toasts/text-toast';
import styled from 'styled-components';

const URLLabel = styled.label`
    font-size: 22px;
    max-width: 100px;
`;

const URLInput = styled.input`
    width: 800px;
`;

export const TwitchHangmanSetup = () => {
    const gameName = 'hangman';
    const auth = useContext(AuthContext);
    const toast = useContext(ToastContext);

    const [token, setToken] = useState('');
    const [showURL, setShowURL] = useState(false);


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
        if (auth.authState) getToken();
    }, [auth.authChecked]);

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

        if (auth.authState) loadDisplay();
    }, [token]);

    const saveDisplaySettings = () => {
        api.saveTwitchGameSettings(gameName, token, {
            bg_color: bgColor,
            word_color: wordColor,
            correct_letter_color: correctLetterColor,
            wrong_letter_color: wrongLetterColor,
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

    const hangmanURL = `${getAppsSiteBase()}/twitch/hangman?token=${token}`;

    return (
        <div className='fluid-container pl-3'>
            <div className='row m-0 text-center'>
                <div className='col m-0'>
                    <h2>Hangman</h2>
                </div>
            </div>
            <div className='row m-0 mt-3 mb-2'>
                <URLLabel className='col m-0 ml-3 align-center'>
                    URL:
                </URLLabel>
                <URLInput className='col ml-2 mr-4' type='text' readOnly value={showURL ? hangmanURL : ''} onClick={() => { navigator.clipboard.writeText(hangmanURL); toast.pushToast(<TextToast text='Copied to Clipboard!' />) }} />
            </div>
            <div className='row m-0 mt-2'>
                <URLLabel className='col m-0 ml-3 align-center' />
                <button className='col-auto ml-2' onClick={() => setShowURL((old) => !old)}>
                    {showURL ? 'Hide URL' : 'Show Url'}
                </button>
                <button className='col-auto ml-2' onClick={regenToken}>
                    Regen Token
                </button>
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