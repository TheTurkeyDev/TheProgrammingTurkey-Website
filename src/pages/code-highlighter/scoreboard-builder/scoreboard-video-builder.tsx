import { Accordion, ButtonRow, Headline2, Headline4, Input, InputsWrapper, OutlinedButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../../components/inputs/color-input';
import { clamp } from '../../../util/number-helper';
import { ScoreboardData } from './scoreboard-data';
import { ScoreboardVideoSegment } from './scoreboard-video-segment';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 8px;
`;

const BaseInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

const HOME = 0b1;
const AWAY = 0b10;

export const ScoreboardVideoBuilder = () => {
    const [homeBaseData, setHomeBaseData] = useState<ScoreboardData>({
        width: 1920,
        height: 1080,
        split: 70,
        primaryFontSize: 150,
        secondaryFontSize: 56,
        textShowLength: 120,
        animationDuration: 15,
        primaryAmimOffset: 0,
        secondaryAmimOffset: 30,
        primaryColor: 'ffffff',
        secondaryColor: 'ffffff',
        primaryFontColor: 'ffffff',
        secondaryFontColor: 'ffffff',
        primaryText: [],
        secondaryText: [],
        outlineWidth: 1,
        outlineColor: '000000'
    });
    const [awayBaseData, setAwayBaseData] = useState<ScoreboardData>({
        width: 1920,
        height: 1080,
        split: 70,
        primaryFontSize: 150,
        secondaryFontSize: 56,
        textShowLength: 120,
        animationDuration: 15,
        primaryAmimOffset: 0,
        secondaryAmimOffset: 30,
        primaryColor: 'ffffff',
        secondaryColor: 'ffffff',
        primaryFontColor: 'ffffff',
        secondaryFontColor: 'ffffff',
        primaryText: [],
        secondaryText: [],
        outlineWidth: 1,
        outlineColor: '000000'
    });

    const [videoSegments, setVideoSegments] = useState<readonly boolean[]>([]);

    const updateValue = (key: string, value: string | number, setHAN: number = 3) => {
        if (setHAN & 0b1) {
            setHomeBaseData(old => ({
                ...old,
                [key]: value
            }));
        }
        if (setHAN & 0b10) {
            setAwayBaseData(old => ({
                ...old,
                [key]: value
            }));
        }
    };

    return (
        <Wrapper>
            <Headline2>Scoreboard Builder</Headline2>
            <Accordion header='Base Info' defaultShow={true} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper fullWidth={true}>
                        <Input label='Width' type='number' value={homeBaseData.width} onChange={e => updateValue('width', clamp(0, 1920, parseInt(e.target.value)))} />
                        <Input label='Height' type='number' value={homeBaseData.height} onChange={e => updateValue('height', clamp(0, 1080, parseInt(e.target.value)))} />
                        <Input label='Split' type='number' value={homeBaseData.split} onChange={e => updateValue('split', clamp(0, 100, parseInt(e.target.value)))} />
                        <Input label='Primary Text Size' type='number' value={homeBaseData.primaryFontSize} onChange={e => updateValue('primaryFontSize', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Secondary Text Size' type='number' value={homeBaseData.secondaryFontSize} onChange={e => updateValue('secondaryFontSize', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Text Show Length' type='number' value={homeBaseData.textShowLength} onChange={e => updateValue('textShowLength', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Animation Duration' type='number' value={homeBaseData.animationDuration} onChange={e => updateValue('animationDuration', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Primary Animation Offset' type='number' value={homeBaseData.primaryAmimOffset} onChange={e => updateValue('primaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Secondary Animation Offset' type='number' value={homeBaseData.secondaryAmimOffset} onChange={e => updateValue('secondaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                    </InputsWrapper>
                    <InputsWrapper fullWidth={true}>
                        <ColorPicker label='Home Primary Color' showHexInput={true} color={homeBaseData.primaryColor} onChange={e => updateValue('primaryColor', e, HOME)} />
                        <ColorPicker label='Home Secondary Color' showHexInput={true} color={homeBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <ColorPicker label='Home Primary Text Color' showHexInput={true} color={homeBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <ColorPicker label='Home Secondary Text Color' showHexInput={true} color={homeBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <ColorPicker label='Away Primary Color' showHexInput={true} color={awayBaseData.primaryColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <ColorPicker label='Away Secondary Color' showHexInput={true} color={awayBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <ColorPicker label='Away Primary Text Color' showHexInput={true} color={awayBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <ColorPicker label='Away Secondary Text Color' showHexInput={true} color={awayBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <ButtonRow>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, true])}>Add Home</OutlinedButton>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, false])}>Add Away</OutlinedButton>
            </ButtonRow>
            {
                videoSegments.map(isHome => {
                    return <ScoreboardVideoSegment data={isHome ? homeBaseData : awayBaseData} />;
                }, [videoSegments])
            }
            <ButtonRow>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, true])}>Add Home</OutlinedButton>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, false])}>Add Away</OutlinedButton>
            </ButtonRow>
        </Wrapper>
    );
};