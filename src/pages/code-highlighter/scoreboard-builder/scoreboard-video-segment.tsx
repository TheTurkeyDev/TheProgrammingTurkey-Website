import { Accordion, Input, InputsWrapper } from 'gobble-lib-react';
import { useState } from 'react';
import { ScoreboardData } from './scoreboard-data';

type ScoreboardVideoSegmentProps = {
    readonly data: ScoreboardData
}

export const ScoreboardVideoSegment = ({ data }: ScoreboardVideoSegmentProps) => {

    const [segmentData, setSegmentData] = useState<ScoreboardData>({
        ...data,
        primaryText: [],
        secondaryText: []
    });

    const updatePrimaryText = (val: string) => {
        setSegmentData({
            ...segmentData,
            primaryText: [val]
        });
    };

    const updateSecondaryText = (val: string) => {
        setSegmentData({
            ...segmentData,
            secondaryText: [val]
        });
    };

    return (
        <div>
            <Accordion header='Video Segment' defaultShow={true}>
                <InputsWrapper>
                    <Input label='Primary Text' value={segmentData.primaryText[0] ?? ''} onChange={e => updatePrimaryText(e.target.value)} />
                    <Input label='Secondary Text' value={segmentData.secondaryText[0] ?? ''} onChange={e => updateSecondaryText(e.target.value)} />
                </InputsWrapper>
            </Accordion>
        </div>
    );
};