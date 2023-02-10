import { Accordion, Body1, Headline4, HorizontalRule, Icon, Input, OutlinedButton, SpaceBetween, TextButton } from 'gobble-lib-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ScoreboardData } from './scoreboard-data';

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
`;

const TextsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
`;

const InputLine = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4px;
    align-items: center;
`;

const FineTuneCtrlHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

export type ScoreboardSegmentData = {
    readonly isHome: Boolean,
    readonly split?: number,
    readonly primaryText: readonly string[],
    readonly primaryColor?: string
    readonly primaryFontSize?: number
    readonly primaryFontColor?: string
    readonly primaryOutlineWidth?: number,
    readonly primaryOutlineColor?: string,
    readonly primaryAmimOffset?: number,
    readonly secondaryText: readonly string[],
    readonly secondaryColor?: string
    readonly secondaryFontSize?: number
    readonly secondaryFontColor?: string,
    readonly secondaryOutlineWidth?: number,
    readonly secondaryOutlineColor?: string,
    readonly secondaryAmimOffset?: number
    readonly textShowLength?: number,
    readonly animationDuration?: number
}
type ScoreboardVideoSegmentProps = {
    readonly segmentData: ScoreboardSegmentData
    readonly setSegmentData: (data: ScoreboardSegmentData) => void
}

export const ScoreboardVideoSegment = ({ segmentData, setSegmentData }: ScoreboardVideoSegmentProps) => {
    const [showFineTuneCtrls, setShowFineTuneCtrls] = useState(false);
    const addPrimaryText = () => {
        setSegmentData({
            ...segmentData,
            primaryText: [...segmentData.primaryText, '']
        });
    };
    const updatePrimaryText = (val: string, index: number) => {
        setSegmentData({
            ...segmentData,
            primaryText: [
                ...segmentData.primaryText.slice(0, index),
                val,
                ...segmentData.primaryText.slice(index + 1),
            ]
        });
    };
    const deletePrimaryText = (index: number) => {
        setSegmentData({
            ...segmentData,
            primaryText: [
                ...segmentData.primaryText.slice(0, index),
                ...segmentData.primaryText.slice(index + 1),
            ]
        });
    };

    const addSecondaryText = () => {
        setSegmentData({
            ...segmentData,
            secondaryText: [...segmentData.secondaryText, '']
        });
    };
    const updateSecondaryText = (val: string, index: number) => {
        setSegmentData({
            ...segmentData,
            secondaryText: [
                ...segmentData.secondaryText.slice(0, index),
                val,
                ...segmentData.secondaryText.slice(index + 1),
            ]
        });
    };
    const deleteSecondaryText = (index: number) => {
        setSegmentData({
            ...segmentData,
            secondaryText: [
                ...segmentData.secondaryText.slice(0, index),
                ...segmentData.secondaryText.slice(index + 1),
            ]
        });
    };

    const title = segmentData.primaryText[0] + ' | ' + segmentData.secondaryText[0];

    return (
        <div>
            <Accordion header={title} defaultShow={true}>
                <ContentWrapper>
                    <TextsWrapper>
                        <SpaceBetween>
                            <Headline4>Primary Text</Headline4>
                            <OutlinedButton onClick={addPrimaryText}>+</OutlinedButton>
                        </SpaceBetween>
                        {
                            segmentData.primaryText.map((pt, i) => (
                                <InputLine key={i}>
                                    <Icon className='fas fa-trash-alt' onClick={() => deletePrimaryText(i)} />
                                    <Input value={pt} onChange={e => updatePrimaryText(e.target.value, i)} />
                                </InputLine>
                            ))
                        }

                    </TextsWrapper>
                    <HorizontalRule />
                    <TextsWrapper>
                        <SpaceBetween>
                            <Headline4>Secondary Text</Headline4>
                            <OutlinedButton onClick={addSecondaryText}>+</OutlinedButton>
                        </SpaceBetween>
                        {
                            segmentData.secondaryText.map((pt, i) => (
                                <InputLine key={i}>
                                    <Icon className='fas fa-trash-alt' onClick={() => deletePrimaryText(i)} />
                                    <Input value={pt} onChange={e => updateSecondaryText(e.target.value, i)} />
                                </InputLine>
                            ))
                        }
                    </TextsWrapper>
                    <HorizontalRule />
                    <TextButton onClick={() => setShowFineTuneCtrls(!showFineTuneCtrls)}>Show Fine Tune Controls</TextButton>
                    {
                        showFineTuneCtrls &&
                        <Body1>Todo....</Body1>
                    }
                </ContentWrapper>
            </Accordion>
        </div>
    );
};