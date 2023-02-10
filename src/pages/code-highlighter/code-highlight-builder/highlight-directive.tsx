import { Input, InputsWrapper, Label, Option, Select, OutlinedButton, TextButton, Icon } from 'gobble-lib-react';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CodeMap } from './code-highlighter-builder';
import { DirectiveBaseDisplay } from './code-highlighter-styles';
import { Directive } from './directive';
import { Lines } from './lines';

const HighlightDirectiveWrapper = styled(InputsWrapper)`
    padding: 8px;
`;

const LinesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 8px;
    width: 100%;
`;

export type HighlightDirectiveType = Directive & {
    readonly code: readonly string[]
    readonly lines: readonly Lines[]
    readonly showTime: number
    readonly animTime: number
    readonly fontSize: number
    readonly boxWidth: number
    readonly boxColor: string
    readonly indentor: string
    readonly language: string
}

type HighlightDirectiveProps = {
    readonly hd: HighlightDirectiveType
    readonly codeFiles: readonly CodeMap[]
    readonly onDelete: () => void
    readonly onMove: (up: boolean) => void
    readonly update: (hd: HighlightDirectiveType) => void
}

export const HighlightDirective = ({ hd, codeFiles, onDelete, onMove, update }: HighlightDirectiveProps) => {

    const [file, setFile] = useState('');

    useEffect(() => {
        const code = codeFiles.find(c => c.name === file)?.code.split('\n') ?? [];
        update({ ...hd, code });
    }, [file]);

    const updateShowTime = (showTime: number) => {
        update({ ...hd, showTime: showTime, duration: 60 * (hd.lines.length * (hd.animTime + showTime)) });
    };

    const updateAnimTime = (animTime: number) => {
        update({ ...hd, animTime, duration: 60 * (hd.lines.length * (animTime + hd.showTime)) });
    };

    const updateLines = (index: number, line: Lines) => {
        update({ ...hd, lines: [...hd.lines.slice(0, index), line, ...hd.lines.slice(index + 1)], duration: 60 * (hd.lines.length + (hd.animTime + hd.showTime)) });
    };

    const addLine = () => {
        update({ ...hd, lines: [...hd.lines, { start: 0, end: 0 }], duration: 60 * ((hd.lines.length + 1) * (hd.animTime + hd.showTime)) });
    };

    const removeLine = (index: number) => {
        update({ ...hd, lines: [...hd.lines.slice(0, index), ...hd.lines.slice(index + 1)], duration: 60 * ((hd.lines.length - 1) * (hd.animTime + hd.showTime)) });
    };

    return (
        <DirectiveBaseDisplay onDelete={onDelete} onMove={onMove}>
            <HighlightDirectiveWrapper fullWidth={true}>
                <Select label='Code' value={file} onChange={e => setFile(e.target.value)} >
                    <Option value='' >Select File</Option>
                    {
                        codeFiles.map(f => <Option key={f.name} value={f.name} >{f.name}</Option>)
                    }
                </Select>
                <Label>Lines</Label>
                <LinesWrapper>
                    {
                        hd.lines.map((lines, i) => (
                            <Fragment key={i}>
                                <Input label='' type='number' value={lines.start} onChange={e => updateLines(i, { start: parseInt(e.target.value), end: hd.lines[i].end })} />
                                <Input label='' type='number' value={lines.end} onChange={e => updateLines(i, { start: hd.lines[i].start, end: parseInt(e.target.value) })} />
                                <TextButton onClick={() => removeLine(i)}>
                                    <Icon className='fas fa-trash-alt' />
                                </TextButton>
                            </Fragment>
                        ))
                    }
                    <OutlinedButton onClick={() => addLine()}>Add Lines</OutlinedButton>
                </LinesWrapper>
                <Input label='Duration' type='number' readOnly={true} value={hd.duration} onChange={e => update({ ...hd, duration: parseInt(e.target.value) })} />
                <Input label='Show Time' type='number' value={hd.showTime} onChange={e => updateShowTime(parseInt(e.target.value))} />
                <Input label='Anim Time' type='number' value={hd.animTime} onChange={e => updateAnimTime(parseInt(e.target.value))} />
                <Input label='Font Size' type='number' value={hd.fontSize} onChange={e => update({ ...hd, fontSize: parseInt(e.target.value) })} />
                <Input label='Border Width' type='number' value={hd.boxWidth} onChange={e => update({ ...hd, boxWidth: parseInt(e.target.value) })} />
                <Input label='Language' type='text' value={hd.language} onChange={e => update({ ...hd, language: e.target.value })} />
            </HighlightDirectiveWrapper>
        </DirectiveBaseDisplay>
    );
};