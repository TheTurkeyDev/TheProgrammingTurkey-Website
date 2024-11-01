import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth-context';
import * as api from '../../network/twitch-games-network';
import { getAppsSiteBase } from '../../network/network-helper';
import { SecretURL } from '../../components/secret-url';
import styled from 'styled-components';
import { ButtonRow, ContainedButton, Headline2, Headline4, HorizontalRule, Input, InputsWrapper, Option, Select, TextToast, useToast } from 'gobble-lib-react';
import { ContentWrapper } from '../../components/setup-page-content';
import { ColorPicker } from '../../components/inputs/color-input';

const SettingsContent = styled.div`
    display: grid;
    grid-template-columns: 600px;
    gap: 8px;
`;

export const TwitchBattleshipSetup = () => {
    const { authState, authChecked } = useAuth();
    const { pushToast } = useToast();

    const [token, setToken] = useState('');

    const [twitchWins, setTwitchWins] = useState(0);
    const [cpuWins, setCpuWins] = useState(0);
    const [gamePlayType, setGamePlayType] = useState(GamePlayStyle.VOTING);
    const [votingTimer, setVotingTimer] = useState(0);
    const [voteDisplayTimer, setVoteDisplayTimer] = useState(0);
    const [textColor, setTextColor] = useState('000000');
    const [startDelay, setStartDelay] = useState(0);

    useEffect(() => {
        async function getToken() {
            api.getToken('battleship').then(token => {
                setToken(token);
            });
        }
        if (authState) getToken();
    }, [authChecked]);

    useEffect(() => {
        async function loadDisplay() {
            api.getTwitchGameSettings('battleship', token).then(data => {
                if (!!data) {
                    setTwitchWins(data.twitch_wins);
                    setCpuWins(data.cpu_wins);
                    setGamePlayType(data.game_play_type);
                    setVotingTimer(data.voting_timer);
                    setVoteDisplayTimer(data.vote_display_timer);
                    setTextColor(data.text_color);
                    setStartDelay(data.start_delay);
                }
            });
        }
        if (authState) loadDisplay();
    }, [token]);

    const saveDisplaySettings = () => {
        api
            .saveTwitchGameSettings('battleship', token, {
                twitch_wins: twitchWins,
                cpu_wins: cpuWins,
                game_play_type: gamePlayType,
                voting_timer: votingTimer,
                vote_display_timer: voteDisplayTimer,
                text_color: textColor,
                start_delay: startDelay,
            })
            .then(rsp => pushToast(<TextToast text={rsp.message} />));
    };

    const regenToken = () => {
        api.regenToken('battleship').then(token => {
            setToken(token);
        });
    };

    const battleshipURL = `${getAppsSiteBase()}/twitch/battleship?token=${token}`;

    return (
        <ContentWrapper>
            <Headline2>Battleship</Headline2>
            <SecretURL url={battleshipURL} regen={regenToken} />
            <HorizontalRule />
            <Headline4>Settings</Headline4>
            <InputsWrapper fullWidth={true}>
                <Input type='number' name='twitchWins' label='Twitch Wins' value={twitchWins} onChange={e => setTwitchWins(parseInt(e.target.value))} />
                <Input type='number' name='cpuWins' label='CPU Wins' value={cpuWins} onChange={e => setCpuWins(parseInt(e.target.value))} />
                <Select label='Game Play Style'>
                    <Option value={GamePlayStyle.VOTING}>Voting</Option>
                </Select>
                <Input type='number' name='votingRoundTime' label='Voting Round Time' value={votingTimer} onChange={e => setVotingTimer(parseInt(e.target.value))} />
                <Input type='number' name='voteDisplayTime' label='Vote Display Time' value={voteDisplayTimer} onChange={e => setVoteDisplayTimer(parseInt(e.target.value))} />
                <Input type='number' name='startDelay' label='Start Delay' value={startDelay} onChange={e => setStartDelay(parseInt(e.target.value))} />
                <ColorPicker label='Text Color' color={textColor} onClose={color => setTextColor(color)} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={saveDisplaySettings}>Save</ContainedButton>
            </ButtonRow>
        </ContentWrapper >
    );
};

const GamePlayStyle = {
    CHANNEL_POINTS: 0,
    VOTING: 1,
};
