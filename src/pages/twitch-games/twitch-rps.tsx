import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';
import { ButtonRow, ContainedButton, Headline2, Headline4, HorizontalRule, Input, InputsWrapper, Option, Select, TextToast, useToast } from 'gobble-lib-react';
import { SecretURL } from '../../components/secret-url';
import { ContentWrapper } from '../../components/setup-page-content';
import { ColorPicker } from '../../components/inputs/color-input';

export const TwitchRPSSetup = () => {
    const gameName = 'rps';
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [token, setToken] = useState('');

    const [twitchWins, setTwitchWins] = useState(0);
    const [cpuWins, setCpuWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [gamePlayType, setGamePlayType] = useState(GamePlayStyle.VOTING);
    const [votingTimer, setVotingTimer] = useState(0);
    const [textColor, setTextColor] = useState('000000');
    const [startDelay, setStartDelay] = useState(0);

    useEffect(() => {
        const getToken = async () => {
            api.getToken(gameName).then(token => {
                setToken(token);
            });
        };
        if (authState) getToken();
    }, [authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            api.getTwitchGameSettings(gameName, token).then(data => {
                if (data) {
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

        if (authState) loadDisplay();
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
        }).then(rsp => pushToast(<TextToast text={rsp.message} />));
    };

    const regenToken = () => {
        api.regenToken(gameName).then(token => {
            setToken(token);
        });
    };

    const rpsURL = `${getAppsSiteBase()}/twitch/rps?token=${token}`;

    return (
        <ContentWrapper>
            <Headline2>Rock, Paper, Scissors</Headline2>
            <SecretURL url={rpsURL} regen={regenToken} />
            <HorizontalRule />
            <Headline4>Settings</Headline4>
            <InputsWrapper $fullWidth={true}>
                <Input type='number' name='twitchWins' label='Twitch Wins' value={twitchWins} onChange={e => setTwitchWins(parseInt(e.target.value))} />
                <Input type='number' name='cpuWins' label='CPU Wins' value={cpuWins} onChange={e => setCpuWins(parseInt(e.target.value))} />
                <Input type='number' name='ties' label='Ties' value={ties} onChange={e => setTies(parseInt(e.target.value))} />
                <Select label=' Game Play Style'>
                    <Option value={GamePlayStyle.VOTING}>Voting</Option>
                </Select>
                <Input type='number' name='votingRoundTime' label='Voting Round Time' value={votingTimer} onChange={e => setVotingTimer(parseInt(e.target.value))} />
                <Input type='number' name='startDelay' label='Start Delay' value={startDelay} onChange={e => setStartDelay(parseInt(e.target.value))} />
                <ColorPicker label='Text Color' color={`#${textColor}`} onClose={setTextColor} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={saveDisplaySettings}>Save</ContainedButton>
            </ButtonRow>
        </ContentWrapper>
    );
};

const GamePlayStyle = {
    CHANNEL_POINTS: 0,
    VOTING: 1,
};
