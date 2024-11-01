import { ButtonRow, ContainedButton, Input, InputsWrapper } from 'gobble-lib-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ChatMergeMaker = () => {
    const [_, setSearchParams] = useSearchParams();

    const [twitchChannel, setTwitchChannel] = useState('');
    const [ytChannel, setYTChannel] = useState('');
    const [xChannel, setXChannel] = useState('');

    const goToView = () => {
        setSearchParams({
            twitch: twitchChannel,
            youtube: ytChannel,
            x: xChannel
        });
    };

    return (
        <>
            <InputsWrapper>
                <Input label='Twitch' value={twitchChannel} onChange={e => setTwitchChannel(e.target.value)} />
                <Input label='YouTube' value={ytChannel} onChange={e => setYTChannel(e.target.value)} />
                <Input label='X' value={xChannel} onChange={e => setXChannel(e.target.value)} />
            </InputsWrapper>
            <ButtonRow>
                <ContainedButton onClick={goToView}>Go</ContainedButton>
            </ButtonRow>
        </>
    );
};