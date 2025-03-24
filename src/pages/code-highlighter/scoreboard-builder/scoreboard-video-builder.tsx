import { Accordion, ButtonRow, ContainedButton, Headline2, Headline4, Icon, Input, InputsWrapper, TextToast, useQuery, useToast } from 'gobble-lib-react';
import { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPicker } from '../../../components/inputs/color-input';
import { postParams } from '../../../network/auth-network';
import { getDevAPIBase, getVideoGenSiteBase } from '../../../network/network-helper';
import { clamp } from '../../../util/number-helper';
import { RenderResp } from '../render-response';
import { ScoreboardData } from './scoreboard-data';
import { ScoreboardGenData } from './scoreboard-gen-data';
import { ScoreboardSegmentData, ScoreboardVideoSegment } from './scoreboard-video-segment';

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

const CenterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
`;

const SegmentsWrapper = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

const AddCard = styled.div`
    width: 200px;
    height: 200px;
    background: ${({ theme }) => theme.surface.color};
    display: grid;
    align-items: center;
    justify-items: center;
    border-radius: 8px;

    &:hover{
        background: ${({ theme }) => theme.surface.color}88;
        cursor: pointer;
    }

    & > i {
        font-size: 32px;
    }
`;

const defaultBaseData = {
    width: 400,
    height: 256,
    videoSegments: []
};
const defaultData = {
    split: 70,
    primaryText: [],
    primaryFontSize: 150,
    primaryColor: 'de4bb2',
    primaryFontColor: 'ffffff',
    primaryOutlineWidth: 1,
    primaryOutlineColor: '000000',
    primaryAmimOffset: 0,
    secondaryText: [],
    secondaryFontSize: 56,
    secondaryColor: '3999e3',
    secondaryFontColor: 'ffffff',
    secondaryOutlineWidth: 1,
    secondaryOutlineColor: '000000',
    secondaryAmimOffset: 30,
    textShowLength: 120,
    animationDuration: 15,
};
const HOME = 0b1;
const AWAY = 0b10;

export const ScoreboardVideoBuilder = () => {
    const navigate = useNavigate();
    const { pushToast } = useToast();
    const iframeRef = createRef<HTMLIFrameElement>();
    const [baseData, setBaseData] = useState<ScoreboardGenData>(defaultBaseData);
    const [homeBaseData, setHomeBaseData] = useState<ScoreboardData>(defaultData);
    const [awayBaseData, setAwayBaseData] = useState<ScoreboardData>(defaultData);
    const [videoSegments, setVideoSegments] = useState<readonly ScoreboardSegmentData[]>([]);

    const [query] = useQuery<RenderResp>(`${getDevAPIBase()}/render/generate/HeatScoreboard`, {
        requestData: postParams,
        shouldThrow: true
    });

    const getData = () => {
        return {
            width: baseData.width,
            height: baseData.height,
            videoSegments: videoSegments.map(segmentData => {
                const teamBaseData = segmentData.isHome ? homeBaseData : awayBaseData;
                return {
                    split: segmentData.split ?? teamBaseData.split,
                    primaryText: segmentData.primaryText ?? teamBaseData.primaryText,
                    primaryColor: `#${segmentData.primaryColor ?? teamBaseData.primaryColor}`,
                    primaryFontSize: `${segmentData.primaryFontSize ?? teamBaseData.primaryFontSize}px`,
                    primaryFontColor: `#${segmentData.primaryFontColor ?? teamBaseData.primaryFontColor}`,
                    primaryOutlineWidth: segmentData.primaryOutlineWidth ?? teamBaseData.primaryOutlineWidth,
                    primaryOutlineColor: `#${segmentData.primaryOutlineColor ?? teamBaseData.primaryOutlineColor}`,
                    primaryAmimOffset: segmentData.primaryAmimOffset ?? teamBaseData.primaryAmimOffset,
                    secondaryText: segmentData.secondaryText ?? teamBaseData.secondaryText,
                    secondaryColor: `#${segmentData.secondaryColor ?? teamBaseData.secondaryColor}`,
                    secondaryFontSize: `${segmentData.secondaryFontSize ?? teamBaseData.secondaryFontSize}px`,
                    secondaryFontColor: `#${segmentData.secondaryFontColor ?? teamBaseData.secondaryFontColor}`,
                    secondaryOutlineWidth: segmentData.secondaryOutlineWidth ?? teamBaseData.secondaryOutlineWidth,
                    secondaryOutlineColor: `#${segmentData.secondaryOutlineColor ?? teamBaseData.secondaryOutlineColor}`,
                    secondaryAmimOffset: segmentData.secondaryAmimOffset ?? teamBaseData.secondaryAmimOffset,
                    textShowLength: segmentData.textShowLength ?? teamBaseData.textShowLength,
                    animationDuration: segmentData.animationDuration ?? teamBaseData.animationDuration
                };
            })
        };
    };

    useEffect(() => {
        iframeRef.current?.contentWindow?.postMessage({
            id: 'HeatScoreboard',
            props: getData()
        }, '*');
    }, [iframeRef, homeBaseData, awayBaseData, videoSegments]);

    const genJson = () => {
        query(JSON.stringify(getData()))
            .then(() => navigate('/videogen'))
            .catch(e => pushToast(<TextToast text={`Error!: ${e.message}\n${e.error}`} />));
    };

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
            <ButtonRow>
                <ContainedButton disabled={videoSegments.length === 0} onClick={() => genJson()}>Render</ContainedButton>
            </ButtonRow>
            <CenterWrapper>
                <Headline4>Preview</Headline4>
                <iframe src={getVideoGenSiteBase()} ref={iframeRef} style={{ width: baseData.width, height: baseData.height }} />
            </CenterWrapper>
            <Accordion header='Base Info' defaultShow={true} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <Input label='Width' type='number' value={baseData.width} onChange={e => updateBaseValue('width', clamp(0, 1920, parseInt(e.target.value)))} />
                        <Input label='Height' type='number' value={baseData.height} onChange={e => updateBaseValue('height', clamp(0, 1080, parseInt(e.target.value)))} />
                        <Input label='Split' type='number' value={homeBaseData.split} onChange={e => updateValue('split', clamp(0, 100, parseInt(e.target.value)))} />
                    </InputsWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <Input label='Text Show Length' type='number' value={homeBaseData.textShowLength} onChange={e => updateValue('textShowLength', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Animation Duration' type='number' value={homeBaseData.animationDuration} onChange={e => updateValue('animationDuration', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Primary Animation Offset' type='number' value={homeBaseData.primaryAmimOffset} onChange={e => updateValue('primaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                        <Input label='Secondary Animation Offset' type='number' value={homeBaseData.secondaryAmimOffset} onChange={e => updateValue('secondaryAmimOffset', clamp(0, 1000, parseInt(e.target.value)))} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <Accordion header='Home Team Info' defaultShow={false} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <ColorPicker label='Primary Color' showHexInput={true} color={homeBaseData.primaryColor} onChange={e => updateValue('primaryColor', e, HOME)} />
                        <ColorPicker label='Primary Text Color' showHexInput={true} color={homeBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <Input label='Primary Text Size' type='number' value={homeBaseData.primaryFontSize} onChange={e => updateValue('primaryFontSize', clamp(0, 1000, parseInt(e.target.value)), HOME)} />
                        <Input label='Primary Outline Width' type='number' value={homeBaseData.primaryOutlineWidth} onChange={e => updateValue('primaryOutlineWidth', clamp(0, 100, parseInt(e.target.value)), HOME)} />
                        <ColorPicker label='Primary Outline Color' showHexInput={true} color={homeBaseData.primaryOutlineColor} onChange={e => updateValue('primaryOutlineColor', e, HOME)} />
                    </InputsWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <ColorPicker label='Secondary Color' showHexInput={true} color={homeBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <ColorPicker label='Secondary Text Color' showHexInput={true} color={homeBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, HOME)} />
                        <Input label='Secondary Text Size' type='number' value={homeBaseData.secondaryFontSize} onChange={e => updateValue('secondaryFontSize', clamp(0, 1000, parseInt(e.target.value)), HOME)} />
                        <Input label='Secondary Outline Width' type='number' value={homeBaseData.secondaryOutlineWidth} onChange={e => updateValue('secondaryOutlineWidth', clamp(0, 100, parseInt(e.target.value)), HOME)} />
                        <ColorPicker label='Secondary Outline Color' showHexInput={true} color={homeBaseData.secondaryOutlineColor} onChange={e => updateValue('secondaryOutlineColor', e, HOME)} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <Accordion header='Away Team Info' defaultShow={false} style={{ width: '100%' }}>
                <BaseInfoWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <ColorPicker label='Primary Color' showHexInput={true} color={awayBaseData.primaryColor} onChange={e => updateValue('primaryColor', e, AWAY)} />
                        <ColorPicker label='Primary Text Color' showHexInput={true} color={awayBaseData.primaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <Input label='Primary Text Size' type='number' value={awayBaseData.primaryFontSize} onChange={e => updateValue('primaryFontSize', clamp(0, 1000, parseInt(e.target.value)), AWAY)} />
                        <Input label='Primary Outline Width' type='number' value={awayBaseData.primaryOutlineWidth} onChange={e => updateValue('primaryOutlineWidth', clamp(0, 100, parseInt(e.target.value)), AWAY)} />
                        <ColorPicker label='Primary Outline Color' showHexInput={true} color={awayBaseData.primaryOutlineColor} onChange={e => updateValue('primaryOutlineColor', e, AWAY)} />
                    </InputsWrapper>
                    <InputsWrapper $fullWidth={true}>
                        <ColorPicker label='Secondary Color' showHexInput={true} color={awayBaseData.secondaryColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <ColorPicker label='Secondary Text Color' showHexInput={true} color={awayBaseData.secondaryFontColor} onChange={e => updateValue('secondaryColor', e, AWAY)} />
                        <Input label='Secondary Text Size' type='number' value={awayBaseData.secondaryFontSize} onChange={e => updateValue('secondaryFontSize', clamp(0, 1000, parseInt(e.target.value)), AWAY)} />
                        <Input label='Secondary Outline Width' type='number' value={awayBaseData.secondaryOutlineWidth} onChange={e => updateValue('secondaryOutlineWidth', clamp(0, 100, parseInt(e.target.value)), AWAY)} />
                        <ColorPicker label='Secondary Outline Color' showHexInput={true} color={awayBaseData.secondaryOutlineColor} onChange={e => updateValue('secondaryOutlineColor', e, AWAY)} />
                    </InputsWrapper>
                </BaseInfoWrapper>
            </Accordion>
            <CenterWrapper>
                <Headline4>Segments</Headline4>
            </CenterWrapper>
            <SegmentsWrapper>
                {
                    videoSegments.map((segmentData, i) => {
                        return <ScoreboardVideoSegment key={i} segmentData={segmentData} setSegmentData={data => setSegmentData(data, i)} />;
                    }, [videoSegments])
                }
                <AddCard>
                    <Icon className='fas fa-plus' />
                </AddCard>
            </SegmentsWrapper>
        </Wrapper>
    );
};