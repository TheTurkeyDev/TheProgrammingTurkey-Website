import { Accordion, ButtonRow, Headline2, Headline4, Headline5, Input, InputsWrapper, OutlinedButton } from 'gobble-lib-react';
import { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../../../components/inputs/color-input';
import { getVideoGenSiteBase } from '../../../network/network-helper';
import { clamp } from '../../../util/number-helper';
import { ScoreboardBaseData, ScoreboardTeamData } from './scoreboard-data';
import { ScoreboardSegmentData, ScoreboardVideoSegment } from './scoreboard-video-segment';

type ComponentData = {
    readonly id: string,
    readonly props: unknown
}

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

const PreviewWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`;
const defaultBaseData = {
    width: 400,
    height: 256,
    split: 70,
};
const defaultData = {
    primaryFontSize: 150,
    secondaryFontSize: 56,
    textShowLength: 120,
    animationDuration: 15,
    primaryAmimOffset: 0,
    secondaryAmimOffset: 30,
    primaryColor: 'de4bb2',
    secondaryColor: '3999e3',
    primaryFontColor: 'ffffff',
    secondaryFontColor: 'ffffff',
    primaryText: [],
    secondaryText: [],
    outlineWidth: 1,
    outlineColor: '000000'
};
const HOME = 0b1;
const AWAY = 0b10;

export const ScoreboardVideoBuilder = () => {
    const iframeRef = createRef<HTMLIFrameElement>();
    const [baseData, setBaseData] = useState<ScoreboardBaseData>(defaultBaseData);
    const [homeBaseData, setHomeBaseData] = useState<ScoreboardTeamData>(defaultData);
    const [awayBaseData, setAwayBaseData] = useState<ScoreboardTeamData>(defaultData);
    const [videoSegments, setVideoSegments] = useState<readonly ScoreboardSegmentData[]>([]);

    useEffect(() => {
        const data: ComponentData = {
            id: 'HeatScoreboard',
            props: videoSegments.map(segmentData => {
                const teamBaseData = segmentData.isHome ? homeBaseData : awayBaseData;
                return {
                    width: baseData.width,
                    height: baseData.height,
                    split: baseData.split,
                    primaryColor: `#${segmentData.primaryColor ?? teamBaseData.primaryColor}`,
                    primaryFontSize: `${segmentData.primaryFontSize ?? teamBaseData.primaryFontSize}px`,
                    primaryFontColor: `#${segmentData.primaryFontColor ?? teamBaseData.primaryFontColor}`,
                    secondaryColor: `#${segmentData.secondaryColor ?? teamBaseData.secondaryColor}`,
                    secondaryFontSize: `${segmentData.secondaryFontSize ?? teamBaseData.secondaryFontSize}px`,
                    secondaryFontColor: `#${segmentData.secondaryFontColor ?? teamBaseData.secondaryFontColor}`,
                    textShowLength: segmentData.textShowLength ?? teamBaseData.textShowLength,
                    primaryText: segmentData.primaryText ?? teamBaseData.primaryText,
                    secondaryText: segmentData.secondaryText ?? teamBaseData.secondaryText,
                    outlineWidth: segmentData.outlineWidth ?? teamBaseData.outlineWidth,
                    outlineColor: `#${segmentData.outlineColor ?? teamBaseData.outlineColor}`,
                    animationDuration: segmentData.animationDuration ?? teamBaseData.animationDuration,
                    primaryAmimOffset: segmentData.primaryAmimOffset ?? teamBaseData.primaryAmimOffset,
                    secondaryAmimOffset: segmentData.secondaryAmimOffset ?? teamBaseData.secondaryAmimOffset
                };
            })
        };
        iframeRef.current?.contentWindow?.postMessage(data, '*');
    }, [iframeRef, homeBaseData, awayBaseData, videoSegments]);

    const updateBaseValue = (key: string, value: number) => {
        setBaseData(old => ({
            ...old,
            [key]: value
        }));
    };

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

    const setSegmentData = (data: ScoreboardSegmentData, index: number) => {
        setVideoSegments([
            ...videoSegments.slice(0, index),
            data,
            ...videoSegments.slice(index + 1)
        ]);
    };

    return (
        <Wrapper>
            <Headline2>Scoreboard Builder</Headline2>
            <PreviewWrapper>
                <Headline5>Preview</Headline5>
                <iframe src={getVideoGenSiteBase()} ref={iframeRef} style={{ width: baseData.width, height: baseData.height }} />
            </PreviewWrapper>
            <Accordion header='Base Info' defaultShow={true} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper fullWidth={true}>
                        <Input label='Width' type='number' value={baseData.width} onChange={e => updateBaseValue('width', clamp(0, 1920, parseInt(e.target.value)))} />
                        <Input label='Height' type='number' value={baseData.height} onChange={e => updateBaseValue('height', clamp(0, 1080, parseInt(e.target.value)))} />
                        <Input label='Split' type='number' value={baseData.split} onChange={e => updateBaseValue('split', clamp(0, 100, parseInt(e.target.value)))} />
                    </InputsWrapper>
                    <InputsWrapper fullWidth={true}>
                        <Input label='Text Show Length' type='number' value={homeBaseData.textShowLength} onChange={e => updateValue('textShowLength', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Animation Duration' type='number' value={homeBaseData.animationDuration} onChange={e => updateValue('animationDuration', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Primary Animation Offset' type='number' value={homeBaseData.primaryAmimOffset} onChange={e => updateValue('primaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Secondary Animation Offset' type='number' value={homeBaseData.secondaryAmimOffset} onChange={e => updateValue('secondaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <Accordion header='Home Team Info' defaultShow={false} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper fullWidth={true}>
                        <ColorPicker label='Primary Color' showHexInput={true} color={homeBaseData.primaryColor} onChange={e => updateValue('primaryColor', e, HOME)} />
                        <ColorPicker label='Primary Text Color' showHexInput={true} color={homeBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <Input label='Primary Text Size' type='number' value={homeBaseData.primaryFontSize} onChange={e => updateValue('primaryFontSize', clamp(0, 1000, parseInt(e.target.value)), HOME)} />

                    </InputsWrapper>
                    <InputsWrapper fullWidth={true}>
                        <ColorPicker label='Secondary Color' showHexInput={true} color={homeBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <ColorPicker label='Secondary Text Color' showHexInput={true} color={homeBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <Input label='Secondary Text Size' type='number' value={homeBaseData.secondaryFontSize} onChange={e => updateValue('secondaryFontSize', clamp(0, 1000, parseInt(e.target.value)), HOME)} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <Accordion header='Away Team Info' defaultShow={false} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper fullWidth={true}>
                        <ColorPicker label='Primary Color' showHexInput={true} color={awayBaseData.primaryColor} onChange={e => updateValue('primaryColor', e, AWAY)} />
                        <ColorPicker label='Primary Text Color' showHexInput={true} color={awayBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <Input label='Primary Text Size' type='number' value={awayBaseData.primaryFontSize} onChange={e => updateValue('primaryFontSize', clamp(0, 1000, parseInt(e.target.value)), AWAY)} />
                    </InputsWrapper>
                    <InputsWrapper fullWidth={true}>
                        <ColorPicker label='Secondary Color' showHexInput={true} color={awayBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <ColorPicker label='Secondary Text Color' showHexInput={true} color={awayBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <Input label='Secondary Text Size' type='number' value={awayBaseData.secondaryFontSize} onChange={e => updateValue('secondaryFontSize', clamp(0, 1000, parseInt(e.target.value)), AWAY)} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <ButtonRow>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, { isHome: true, primaryText: [], secondaryText: [] }])}>Add Home Segment</OutlinedButton>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, { isHome: false, primaryText: [], secondaryText: [] }])}>Add Away Segment</OutlinedButton>
            </ButtonRow>
            {
                videoSegments.map((segmentData, i) => {
                    return <ScoreboardVideoSegment key={i} segmentData={segmentData} setSegmentData={data => setSegmentData(data, i)} />;
                }, [videoSegments])
            }
            <ButtonRow>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, { isHome: true, primaryText: [], secondaryText: [] }])}>Add Home Segment</OutlinedButton>
                <OutlinedButton onClick={() => setVideoSegments(old => [...old, { isHome: false, primaryText: [], secondaryText: [] }])}>Add Away Segment</OutlinedButton>
            </ButtonRow>
        </Wrapper>
    );
};