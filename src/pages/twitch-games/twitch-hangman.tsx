import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';
import { SecretURL } from '../../components/secret-url';
import { ButtonRow, ContainedButton, Headline2, Headline4, HorizontalRule, Input, InputsWrapper, TextToast, useToast } from '@theturkeydev/gobble-lib-react';
import { ContentWrapper } from '../../components/setup-page-content';
import { ColorPicker } from '../../components/inputs/color-input';

export const TwitchHangmanSetup = () => {
    const gameName = 'hangman';
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [token, setToken] = useState('');

    const [bgColor, setBGColor] = useState('000000');
    const [wordColor, setWordColor] = useState('ffffff');
    const [correctLetterColor, setCorrectLetterColor] = useState('00ff00');
    const [wrongLetterColor, setWrongLetterColor] = useState('ff0000');

    useEffect(() => {
        if (!authChecked || !authState)
            return;

        api.getToken(gameName).then(token => {
            setToken(token);
        });
    }, [authChecked, authState]);

    useEffect(() => {
        if (!authState || !token)
            return;

        api.getTwitchGameSettings(gameName, token).then(json => {
            if (json.success) {
                const data = json.data;
                setBGColor(data.bg_color);
                setWordColor(data.word_color);
                setCorrectLetterColor(data.correct_letter_color);
                setWrongLetterColor(data.wrong_letter_color);
            }
        });
    }, [token, authState]);

    const saveDisplaySettings = () => {
        api.saveTwitchGameSettings(gameName, token, {
            bg_color: bgColor,
            word_color: wordColor,
            correct_letter_color: correctLetterColor,
            wrong_letter_color: wrongLetterColor,
        }).then(json => {
            pushToast(<TextToast text={json.success ? 'Settings Saved!' : json.message} />);
        });
    };

    const regenToken = () => {
        api.regenToken(gameName).then(token => {
            setToken(token);
        });
    };

    const hangmanURL = `${getAppsSiteBase()}/twitch/hangman?token=${token}`;

    return (
        <ContentWrapper>
            <Headline2>Hangman</Headline2>
            <SecretURL url={hangmanURL} regen={regenToken} />
            <HorizontalRule />
            <Headline4>Settings</Headline4>
            <InputsWrapper fullWidth={true}>
                <ColorPicker name='text_color' label='Background Color' color={bgColor} onClose={color => setBGColor(color)} />
                <ColorPicker name='word_color' label='Word Color' color={wordColor} onClose={color => setWordColor(color)} />
                <ColorPicker name='correct_letter_color' label='Correct Letter Color' color={correctLetterColor} onClose={color => setCorrectLetterColor(color)} />
                <ColorPicker name='wrong_letter_color' label='Wrong Letter Color' color={wrongLetterColor} onClose={color => setWrongLetterColor(color)} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={saveDisplaySettings}>Save</ContainedButton>
            </ButtonRow>
        </ContentWrapper>
    );
};